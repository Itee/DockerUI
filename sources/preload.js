//!\ Be advertise of this bad practice: https://github.com/electron/electron/issues/1095

const { exec }        = require( 'child_process' )
const { ipcRenderer } = require( 'electron' )
const { Docker }      = require( './dockerAPI' )

let _store = {
    images:     [],
    containers: {},
    networks:   {},
    volumes:    {},
    ui:         {
        mainContainer: null,
        spinner:       null
    }
}

// Utils
function isNullOrUndefined ( value ) {
    return ( value === null || value === undefined )
}

function isDisabledLink ( event ) {

    if ( isNullOrUndefined( event ) ) {
        throw new ReferenceError( `Unable to process click with null or undefined event !` )
    }

    const target = event.target
    if ( isNullOrUndefined( target ) ) {
        throw new ReferenceError( 'Unable to process click with null or undefined target !' )
    }

    const targetId = target.id
    if ( isNullOrUndefined( targetId ) ) {
        throw new ReferenceError( 'Unable to process click with null or undefined target id !' )
    }

    const linkElement = getElementById( targetId )
    if ( isNullOrUndefined( linkElement ) ) {
        throw new ReferenceError( `Unable to find element with id: ${ targetId }` )
    }

    return linkElement.classList.contains( 'disabled' )

}

function addEventListenerTo ( id, eventName, handler ) {

    const element = getElementById( id )
    if ( isNullOrUndefined( element ) ) { throw new ReferenceError( `Element with id [${ id }] cannot be null or undefined !` ) }

    element.addEventListener( eventName, handler )

}

function getElementById ( id ) {
    if ( isNullOrUndefined( id ) ) { throw new ReferenceError( 'Element id cannot be null or undefined !' ) }

    return document.getElementById( id )

}

function removeAllChildNodes ( parent ) {
    while ( parent.firstChild ) {
        parent.removeChild( parent.firstChild )
    }
}

function setPropertyValueByKey ( object, properties ) {

    for ( let [ key, val ] of Object.entries( properties ) ) {

        if ( Object.is( val.constructor, Object ) ) {
            setPropertyValueByKey( object[ key ], val )
        } else {
            object[ key ] = val
        }

    }

}

/////////////////////////////// Components //////////////////////////////////

function createElement ( tagName, classList = [], attributes = {}, children = [] ) {

    const element = document.createElement( tagName )
    if ( classList ) { element.classList.add( ...classList ) }
    if ( attributes ) { setPropertyValueByKey( element, attributes ) }
    if ( children ) { element.append( ...children ) }

    return element

}

/////////////////////////////////////////////////////////////////

function _runDockerCommand ( command, options = {} ) {

    return new Promise( ( resolve, reject ) => {

        exec( command, options, ( error, stdout, stderr ) => {
            if ( error ) {
                reject( error )
            } else {
                resolve( stdout )
            }
        } )

    } )

}

function _sanitizeDockerJson ( dockerJson ) {

    return dockerJson.split( '\n' ).filter( jsonLine => jsonLine ).map( jsonLine => JSON.parse( jsonLine ) )

}

// Modals
function setModalTitle ( title ) {
    getElementById( 'imageModalTitle' ).innerText = title
}

function setModalContent ( htmlElement ) {
    const modalBody = getElementById( 'imageModalBody' )

    removeAllChildNodes( modalBody )
    modalBody.append( htmlElement )
}

// Spinner

function _createSpinnerElement () {

    _store.ui.spinner =
        createElement( 'div', [ 'h-100', 'd-flex', 'flex-grow', 'justify-content-center', 'align-items-center' ], { id: 'spinner' }, [
            createElement( 'div', [ 'spinner-grow', 'text-dark' ], { role: 'status' }, [
                createElement( 'span', [ 'sr-only' ], { innerText: 'Loading...' } )
            ] )
        ] )

}

function _displaySpinner () {

    removeAllChildNodes( _store.ui.mainContainer )
    _store.ui.mainContainer.appendChild( _store.ui.spinner )

}

// Images management
function _createImagesContainer () {


}

async function displayImageList () {
    //async function updateImagesUI () {

    const mainContainer = _store.ui.mainContainer
    const jsonResults   = await Docker.image.list( {
        all:     true,
        digests: true,
        noTrunc: true,
        format:  '{{json .}}'
    } )
    const images        = _sanitizeDockerJson( jsonResults )

    removeAllChildNodes( mainContainer )

    const imagesNavbar =
              createElement( 'nav', [ 'navbar', 'navbar-expand-lg', 'sticky-top', 'navbar-dark', 'bg-secondary', 'justify-content-center' ], { style: { zIndex: 1000 } }, [
                  createElement( 'form', [ 'form-inline' ], null, [
                      createElement( 'div', [ 'form-check', 'form-check-inline' ], null, [
                          createElement( 'input', [ 'form-check-input' ], { type: 'checkbox' } ),
                          createElement( 'label', [ 'form-check-label' ], { innerText: 'All' } )
                      ] )
                  ] )
              ] )

    const imagesContainer = createElement( 'div', [ 'images-container', 'container-fluid', 'p-3' ] )
    const imagesRow       = createElement( 'div', [ 'row', 'row-cols-1', 'row-cols-md-4', 'row-cols-lg-4', 'row-cols-xl-3' ] )

    for ( let imageIndex = 0, numberOfImages = images.length ; imageIndex < numberOfImages ; imageIndex++ ) {
        const image     = images[ imageIndex ]
        const imageId   = image.ID
        const imagesCol = createElement( 'div', [ 'col', 'mb-4' ], null, [
            createElement( 'div', [ 'card', 'h-100', 'w-100', 'border-dark' ], { id: imageId }, [
                createElement( 'div', [ 'card-header' ], null, [
                    createElement( 'h5', null, null, [ image.Repository + ':' + image.Tag ] ),
                    createElement( 'div', null, null, [ imageId ] )
                ] ),
                createElement( 'div', [ 'card-body' ], null,
                    [
                        createElement( 'button', [ 'btn', 'btn-outline-secondary', 'mr-1' ],
                            {
                                type:    'button',
                                dataset: {
                                    toggle:    'tooltip',
                                    placement: 'top'
                                },
                                title:   'History',
                                onclick: displayImageHistory.bind( this, imageId )
                            },
                            [
                                createElement( 'i', [ 'fas', 'fa-history' ] )
                            ]
                        ),
                        createElement( 'button', [ 'btn', 'btn-outline-secondary', 'mr-1' ],
                            {
                                type:    'button',
                                dataset: {
                                    toggle:    'tooltip',
                                    placement: 'top'
                                },
                                title:   'Infos',
                                onclick: displayImageInspect.bind( this, imageId )
                            },
                            [
                                createElement( 'i', [ 'fas', 'fa-eye' ] )
                            ]
                        ),
                        createElement( 'button', [ 'btn', 'btn-outline-danger', 'mr-1' ],
                            {
                                type:    'button',
                                dataset: {
                                    toggle:    'tooltip',
                                    placement: 'top'
                                },
                                title:   'Remove',
                                onclick: removeImage.bind( this, imageId )
                            },
                            [
                                createElement( 'i', [ 'fas', 'fa-times' ] )
                            ]
                        )
                    ]
                )
            ] )
        ] )

        imagesRow.append( imagesCol )
    }

    mainContainer.append( imagesNavbar )
    mainContainer.append( imagesContainer )
    imagesContainer.append( imagesRow )

}

async function displayImageHistory ( imageId ) {

    try {

        const jsonResults = await Docker.image.history( {
            format:  '{{json .}}',
            human:   true,
            noTrunc: true,
            quiet:   false
        }, imageId )
        const histories   = _sanitizeDockerJson( jsonResults )
        //        const histories = await _getImageHistory( imageId )


        setModalTitle( 'Image History' )

        const historyContainer = document.createElement( 'table' )
        historyContainer.classList.add( 'table', 'table-striped', 'table-bordered' )

        const thead = document.createElement( 'thead' )
        thead.classList.add( 'thead-dark' )

        const tr                 = document.createElement( 'tr' )
        const thId               = document.createElement( 'th' )
        thId.innerText           = 'Id'
        const thComment          = document.createElement( 'th' )
        thComment.innerText      = 'Comment'
        const thSize             = document.createElement( 'th' )
        thSize.innerText         = 'Size'
        const thCreatedSince     = document.createElement( 'th' )
        thCreatedSince.innerText = 'Created Since'
        const thCreatedAt        = document.createElement( 'th' )
        thCreatedAt.innerText    = 'Created At'
        const thCreatedBy        = document.createElement( 'th' )
        thCreatedBy.innerText    = 'Created By'

        historyContainer.append( thead )
        thead.append( tr )
        tr.append( thId )
        tr.append( thComment )
        tr.append( thSize )
        tr.append( thCreatedSince )
        tr.append( thCreatedAt )
        tr.append( thCreatedBy )

        const tbody = document.createElement( 'tbody' )
        historyContainer.append( tbody )

        for ( let historyIndex = 0, numberOfHistories = histories.length ; historyIndex < numberOfHistories ; historyIndex++ ) {
            const history = histories[ historyIndex ]

            const trHistory = document.createElement( 'tr' )

            const tdId               = document.createElement( 'td' )
            tdId.innerText           = history.ID
            const tdComment          = document.createElement( 'td' )
            tdComment.innerText      = history.Comment
            const tdSize             = document.createElement( 'td' )
            tdSize.innerText         = history.Size
            const tdCreatedSince     = document.createElement( 'td' )
            tdCreatedSince.innerText = history.CreatedSince
            const tdCreatedAt        = document.createElement( 'td' )
            tdCreatedAt.innerText    = history.CreatedAt
            const tdCreatedBy        = document.createElement( 'td' )
            tdCreatedBy.innerText    = history.CreatedBy

            tbody.append( trHistory )
            trHistory.append( tdId )
            trHistory.append( tdComment )
            trHistory.append( tdSize )
            trHistory.append( tdCreatedSince )
            trHistory.append( tdCreatedAt )
            trHistory.append( tdCreatedBy )
        }

        historyContainer.append( thead )

        setModalContent( historyContainer )
        $( '#imageModal' ).modal( 'show' )

    } catch ( error ) {
        onError( error )
    }

}

async function displayImageInspect ( imageId ) {

    try {
        const jsonResults  = await Docker.image.inspect( {
            format: '{{json .}}'
        }, imageId )
        const informations = _sanitizeDockerJson( jsonResults )

        //        const informations = await _getImageInformation( imageId )

        setModalTitle( 'Image Informations' )

        const inputGroup = document.createElement( 'div' )
        inputGroup.classList.add( 'input-group', 'h-100' )

        const textarea = document.createElement( 'textarea' )
        textarea.classList.add( 'form-control', 'h-100' )

        textarea.append( JSON.stringify( informations, undefined, 4 ) )
        inputGroup.append( textarea )

        setModalContent( inputGroup )
        $( '#imageModal' ).modal( 'show' )

    } catch ( error ) {
        onError( error )
    }

}

async function removeImages ( imageIds ) {

}

async function removeImage ( imageId ) {
    try {
        const result = await _runDockerCommand( 'docker image rm ' + imageId )
        alert( result )
        return null
    } catch ( error ) {
        onError( error )
    }
}

async function onImagesEvent ( event ) {

    if ( isDisabledLink( event ) ) { return }

    _displaySpinner()

    const id = event.target.id

    switch ( id ) {

        case 'images_list_link':
            await displayImageList()
            break

        case 'images_build_link':
            await displayImageList()
            break

        case 'images_import_link':
            await displayImageList()
            break

        case 'images_load_link':
            await displayImageList()
            break

        case 'images_pull_link':
            await displayImageList()
            break

        case 'images_push_link':
            await displayImageList()
            break

        case 'images_save_link':
            await displayImageList()
            break

        case 'images_prune_link':
            await displayImageList()
            break

        case 'images_remove_link':
            await removeImages()
            break

        default:
            throw new RangeError( `Invalid switch parameter: ${ action }` )

    }

}

// Containers management
async function displayContainers () {}

// Networks management
async function displayNetworks () {}

// Volumes management
async function displayVolumes () {}

/////////////////////////////// LIFE CYCLE & Events //////////////////////////////////

function onDOMContentLoaded () {

    _store.ui.mainContainer = document.getElementById( 'main-container' )

    _createSpinnerElement()

    try {

        console.log( 'DOM entièrement chargé et analysé' )

        //// Navbars events
        /// Actions
        // Images
        addEventListenerTo( 'images_list_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_build_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_import_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_load_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_pull_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_push_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_save_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_prune_link', 'click', onImagesEvent )
        addEventListenerTo( 'images_remove_link', 'click', onImagesEvent )

        //        // Containers
        addEventListenerTo( 'docker_version_link', 'click', async ( event ) => {

            if ( isDisabledLink( event ) ) { return }

            const version = await Docker.version()
            alert( version )

        } )
        //
        //        // Networks
        //        addEventListenerTo( 'networks_link', 'click', async ( event ) => {
        //
        //            if ( isDisabledLink( event ) ) { return }
        //
        //            await displayNetworks()
        //
        //        } )
        //
        //        // Volumes
        //        addEventListenerTo( 'volumes_link', 'click', async ( event ) => {
        //
        //            if ( isDisabledLink( event ) ) { return }
        //
        //            await displayVolumes()
        //
        //        } )

        // Windows
        addEventListenerTo( 'window_minimize_link', 'click', minimizeWindow )
        addEventListenerTo( 'window_maximize_link', 'click', maximizeWindow )
        addEventListenerTo( 'window_close_link', 'click', closeWindow )


    } catch ( error ) {

        onError( error )

    }

}

async function minimizeWindow () {
    await ipcRenderer.invoke( 'window-minimize' )
}

async function maximizeWindow () {
    await ipcRenderer.invoke( 'window-maximize' )
}

async function closeWindow () {
    await ipcRenderer.invoke( 'window-close' )
}

function onError ( error ) {
    alert( error )
    console.error( error )
}

window.addEventListener( 'DOMContentLoaded', onDOMContentLoaded )
