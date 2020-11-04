/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */


const { app, BrowserWindow, ipcMain } = require( 'electron' )
const ejs                             = require( 'ejs' )
const path                            = require( 'path' )
const fs                              = require( 'fs' )

const appPath  = app.getAppPath()
const _config  = {
    paths:         {
        app:        appPath,
        dir:        __dirname,
        exe:        ( process.env.PORTABLE_EXECUTABLE_DIR ) ? process.env.PORTABLE_EXECUTABLE_DIR : app.getAppPath(),
        logs:       {
            directory: 'logs',
            file:      path.join( 'logs', 'log.txt' )
        },
        configs:    path.join( appPath, 'configs' ),
        data:       path.join( appPath, 'data' ),
        images:     path.join( appPath, 'images' ),
        langs:      path.join( appPath, 'langs' ),
        sources:    path.join( appPath, 'sources' ),
        styles:     path.join( appPath, 'styles' ),
        thirdParty: path.join( appPath, 'third_party' ),
        views:      path.join( appPath, 'views' ),
        webfonts:   path.join( appPath, 'webfonts' )
    },
    browserWindow: {
        minWidth:       600,
        width:          1280 + 16,
        minHeight:      260,
        height:         720 + 39,
        icon:           path.join( appPath, 'images', 'favicon.ico' ),
        frame:          false,
        show:           false,
        webPreferences: {
            preload: path.join( appPath, 'preload.js' )
        }
    },
    language:      {}
}
let mainWindow = null

function createDirectoryIfNotExist ( directoryPath ) {

    if ( !fs.existsSync( directoryPath ) ) {
        fs.mkdirSync( directoryPath, { recursive: true } )
    }

}

function loadLanguage ( basePath ) {

    const locale         = app.getLocale().slice( 0, 2 )
    const languagePath   = path.join( basePath, `${ locale }.json` )
    let jsonLanguageFile = ''
    if ( fs.existsSync( languagePath ) ) {

        jsonLanguageFile = fs.readFileSync( languagePath ).toString()

    } else {

        try {
            const fallbackLanguagePath = path.join( basePath, 'en.json' )
            console.error( `Unable to found language file: ${ languagePath }. Fallback to ${ fallbackLanguagePath }.` )
            jsonLanguageFile = fs.readFileSync( fallbackLanguagePath ).toString()
        } catch ( error ) {
            console.error( error )
            return {}
        }

    }

    // Assign language to global config
    return JSON.parse( jsonLanguageFile )

}

async function createWindow ( options ) {

    try {

        // Assign options to app
        if ( !app.config ) {
            app.config = {}
        }
        app.language = options.language
        app.paths    = options.paths

        // Create the browser window.
        mainWindow = new BrowserWindow( options.browserWindow )

        // Display window after all content loaded
        mainWindow.on( 'ready-to-show', () => {
            mainWindow.show()
        } )

        // Clean on close
        mainWindow.on( 'closed', () => {
            mainWindow = null
        } )

        mainWindow.removeMenu()

        // and render template and load the index.html of the app.
        const indexContent = await renderIndex( options )
        const tmpIndexPath = path.join( _config.paths.views, 'index.html' )
        //        createDirectoryIfNotExist( tmpDirectoryIndexPath )
        fs.writeFileSync( tmpIndexPath, indexContent )
        await mainWindow.loadFile( tmpIndexPath )

        // Open the DevTools.
        //        if ( options.debug ) {
        mainWindow.webContents.openDevTools( { mode: 'detach' } )
        //        }


    } catch ( error ) {

        console.error( error )

    }

}

function renderIndex ( options ) {

    return new Promise( ( resolve, reject ) => {

        const indexTemplatePath = path.join( _config.paths.views, 'index.ejs' )

        ejs.renderFile(
            indexTemplatePath,
            {
                basePath: `${ _config.paths.app }\\`,
                language: options.language
            },
            {
                client: true,
                debug:  options.debug
            },
            ( error, content ) => {
                if ( error ) {
                    reject( error )
                } else {
                    resolve( content )
                }
            }
        )

    } )

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', async () => {

       console.log( 'App on ready' )

       _config.language = loadLanguage( _config.paths.langs )

       await createWindow( _config )


   } )
   .on( 'activate', () => {

       // On macOS it's common to re-create a window in the app when the
       // dock icon is clicked and there are no other windows open.
       if ( BrowserWindow.getAllWindows().length === 0 ) { createWindow() }

   } )
   .on( 'error', ( error ) => {

       console.error( error )

   } )
   .on( 'window-all-closed', ( closeEvent ) => {

       // Quit when all windows are closed.
       // On macOS it is common for applications and their menu bar
       // to stay active until the user quits explicitly with Cmd + Q
       if ( process.platform !== 'darwin' ) {
           app.quit()
       }

   } )
   .on( 'quit', ( quitEvent, exitCode ) => {

       console.log( `Exit with status code: ${ exitCode }` )

   } )

ipcMain.handle( 'window-minimize', () => {
    mainWindow.minimize()
} )

ipcMain.handle( 'window-maximize', () => {
    if ( !mainWindow.isMaximized() ) {
        mainWindow.maximize()
    } else {
        mainWindow.unmaximize()
    }
} )

ipcMain.handle( 'window-close', () => {
    mainWindow.close()
} )
