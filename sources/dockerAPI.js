/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */
const { exec } = require( 'child_process' )

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

function _isFalse ( value ) {
    return ( ( typeof value === 'boolean' ) && ( value === false ) )
}
function _isTrue ( value ) {
    return ( ( typeof value === 'boolean' ) && ( value === true ) )
}

function _formatOptions ( options = {} ) {
    let result = ''

    if ( _isFalse( options.disableContentTrust ) ) { result += ' --disable-content-trust false' }
    if ( _isFalse( options.pause ) ) { result += ' --pause false' }
    if ( _isFalse( options.rm ) ) { result += ' --rm false' }
    if ( _isTrue( options.rm ) ) { result += ' --rm' }
    if ( _isFalse( options.sigProxy ) ) { result += ' --sig-proxy false' }
    if ( options.addHost ) { result += ` --add-host "${ options.addHost }"` }
    if ( options.advertiseAddr ) { result += ` --advertise-addr "${ options.advertiseAddr }"` }
    if ( options.all ) { result += ' --all' }
    if ( options.allTags ) { result += ' --all-tags' }
    if ( options.amend ) { result += ' --amend' }
    if ( options.append ) { result += ' --append' }
    if ( options.appName ) { result += ` --app-name "${ options.appName }"` }
    if ( options.arch ) { result += ` --arch "${ options.arch }"` }
    if ( options.archive ) { result += ' --archive' }
    if ( options.args ) { result += ` --args "${ options.args }"` }
    if ( options.attach ) { result += ' --attach' }
    if ( options.attachable ) { result += ' --attachable' }
    if ( options.author ) { result += ` --author "${ options.author }"` }
    if ( options.autolock ) { result += ' --autolock' }
    if ( options.auxAddress ) { result += ` --aux-address "${ options.auxAddress }"` }
    if ( options.availability ) { result += ` --availability "${ options.availability }"` }
    if ( options.blkioWeight ) { result += ` --blkio-weight "${ options.blkioWeight }"` }
    if ( options.blkioWeightDevice ) { result += ` --blkio-weight-device "${ options.blkioWeightDevice }"` }
    if ( options.bootstrap ) { result += ' --bootstrap' }
    if ( options.buildArg ) { result += ` --build-arg "${ options.buildArg }"` }
    if ( options.bundleFile ) { result += ` --bundle-file "${ options.bundleFile }"` }
    if ( options.caCert ) { result += ` --ca-cert "${ options.caCert }"` }
    if ( options.cacheFrom ) { result += ` --cache-from "${ options.cacheFrom }"` }
    if ( options.cacheTo ) { result += ` --cache-to "${ options.cacheTo }"` }
    if ( options.caExpiry ) { result += ` --ca-expiry "${ options.caExpiry }"` }
    if ( options.caKey ) { result += ` --ca-key "${ options.caKey }"` }
    if ( options.capAdd ) { result += ` --cap-add "${ options.capAdd }"` }
    if ( options.capDrop ) { result += ` --cap-drop "${ options.capDrop }"` }
    if ( options.certExpiry ) { result += ` --cert-expiry "${ options.certExpiry }"` }
    if ( options.cgroupParent ) { result += ` --cgroup-parent "${ options.cgroupParent }"` }
    if ( options.change ) { result += ` --change "${ options.change }"` }
    if ( options.checkpoint ) { result += ` --checkpoint "${ options.checkpoint }"` }
    if ( options.checkpointDir ) { result += ` --checkpoint-dir "${ options.checkpointDir }"` }
    if ( options.cidfile ) { result += ` --cidfile "${ options.cidfile }"` }
    if ( options.composeFile ) { result += ` --compose-file "${ options.composeFile }"` }
    if ( options.compress ) { result += ' --compress' }
    if ( options.configAdd ) { result += ` --config-add "${ options.configAdd }"` }
    if ( options.configFrom ) { result += ` --config-from "${ options.configFrom }"` }
    if ( options.configRm ) { result += ` --config-rm "${ options.configRm }"` }
    if ( options.constraint ) { result += ' --constraint' }
    if ( options.constraintAdd ) { result += ` --constraint-add "${ options.constraintAdd }"` }
    if ( options.constraintRm ) { result += ` --constraint-rm "${ options.constraintRm }"` }
    if ( options.containerLabel ) { result += ` --container-label "${ options.configFrom }"` }
    if ( options.containerLabelAdd ) { result += ` --container-label-add "${ options.containerLabelAdd }"` }
    if ( options.containerLabelRm ) { result += ` --container-label-rm "${ options.containerLabelRm }"` }
    if ( options.cpuCount ) { result += ` --cpu-count "${ options.cpuCount }"` }
    if ( options.cpuPercent ) { result += ` --cpu-percent "${ options.cpuPercent }"` }
    if ( options.cpuPeriod ) { result += ` --cpu-period "${ options.cpuPeriod }"` }
    if ( options.cpuQuota ) { result += ` --cpu-quota "${ options.cpuQuota }"` }
    if ( options.cpuRtPeriod ) { result += ` --cpu-rt-period "${ options.cpuRtPeriod }"` }
    if ( options.cpuRtRuntime ) { result += ` --cpu-rt-runtime "${ options.cpuRtRuntime }"` }
    if ( options.cpus ) { result += ` --cpus "${ options.cpus }"` }
    if ( options.cpusetCpus ) { result += ` --cpuset-cpus "${ options.cpusetCpus }"` }
    if ( options.cpusetMems ) { result += ` --cpuset-mems "${ options.cpusetMems }"` }
    if ( options.cpuShares ) { result += ` --cpu-shares "${ options.cpuShares }"` }
    if ( options.credentialSet ) { result += ` --credential-set "${ options.credentialSet }"` }
    if ( options.credentialSpec ) { result += ` --credential-spec "${ options.credentialSpec }"` }
    if ( options.dataPathAddr ) { result += ` --data-path-addr "${ options.dataPathAddr }"` }
    if ( options.dataPathPort ) { result += ` --data-path-port "${ options.dataPathPort }"` }
    if ( options.default ) { result += ' --default' }
    if ( options.defaultAddrPool ) { result += ` --default-addr-pool "${ options.defaultAddrPool }"` }
    if ( options.defaultAddrPoolMaskLength ) { result += ` --default-addr-pool-mask-length "${ options.defaultAddrPoolMaskLength }"` }
    if ( options.defaultStackOrchestrator ) { result += ` --default-stack-orchestrator "${ options.defaultStackOrchestrator }"` }
    if ( options.description ) { result += ` --description "${ options.description }"` }
    if ( options.detach ) { result += ' --detach' }
    if ( options.detachKeys ) { result += ` --detach-keys "${ options.detachKeys }"` }
    if ( options.details ) { result += ' --details' }
    if ( options.device ) { result += ` --device "${ options.device }"` }
    if ( options.deviceCgroupRule ) { result += ` --device-cgroup-rule "${ options.deviceCgroupRule }"` }
    if ( options.deviceReadBps ) { result += ` --device-read-bps "${ options.deviceReadBps }"` }
    if ( options.deviceReadIops ) { result += ` --device-read-iops "${ options.deviceReadIops }"` }
    if ( options.deviceWriteBps ) { result += ` --device-write-bps "${ options.deviceWriteBps }"` }
    if ( options.deviceWriteIops ) { result += ` --device-write-iops "${ options.deviceWriteIops }"` }
    if ( options.digests ) { result += ' --digests' }
    if ( options.dir ) { result += ` --dir "${ options.dir }"` }
    if ( options.disable ) { result += ' --disable' }
    if ( options.dispatcherHeartbeat ) { result += ` --dispatcher-heartbeat "${ options.dispatcherHeartbeat }"` }
    if ( options.dns ) { result += ` --dns "${ options.dns }"` }
    if ( options.dnsAdd ) { result += ` --dns-add "${ options.dnsAdd }"` }
    if ( options.dnsOption ) { result += ` --dns-option "${ options.dnsOption }"` }
    if ( options.dnsOptionAdd ) { result += ` --dns-option-add "${ options.dnsOptionAdd }"` }
    if ( options.dnsOptionRm ) { result += ` --dns-option-rm "${ options.dnsOptionRm }"` }
    if ( options.dnsRm ) { result += ` --dns-rm "${ options.dnsRm }"` }
    if ( options.dnsSearch ) { result += ` --dns-search "${ options.dnsSearch }"` }
    if ( options.dnsSearchAdd ) { result += ` --dns-search-add "${ options.dnsSearchAdd }"` }
    if ( options.dnsSearchRm ) { result += ` --dns-search-rm "${ options.dnsSearchRm }"` }
    if ( options.docker ) { result += ` --docker "${ options.docker }"` }
    if ( options.domainname ) { result += ` --domainname "${ options.domainname }"` }
    if ( options.driver ) { result += ` --driver "${ options.driver }"` }
    if ( options.dryRun ) { result += ` --dry-run` }
    if ( options.endpointMode ) { result += ` --endpoint-mode "${ options.endpointMode }"` }
    if ( options.entrypoint ) { result += ` --entrypoint "${ options.entrypoint }"` }
    if ( options.env ) { result += ` --env "${ options.env }"` }
    if ( options.envAdd ) { result += ` --env-add "${ options.envAdd }"` }
    if ( options.envFile ) { result += ` --env-file "${ options.envFile }"` }
    if ( options.envRm ) { result += ` --env-rm "${ options.envRm }"` }
    if ( options.example ) { result += ` --example "${ options.example }"` }
    if ( options.expose ) { result += ` --expose "${ options.expose }"` }
    if ( options.externalCa ) { result += ` --external-ca "${ options.externalCa }"` }
    if ( options.file ) { result += ` --file "${ options.file }"` }
    if ( options.filter ) { result += ` --filter "${ options.filter }"` }
    if ( options.follow ) { result += ' --follow' }
    if ( options.followLink ) { result += ' --follow-link' }
    if ( options.force ) { result += ' --force' }
    if ( options.forceNewCluster ) { result += ' --force-new-cluster' }
    if ( options.forceRm ) { result += ' --force-rm' }
    if ( options.format ) { result += ` --format "${ options.format }"` }
    if ( options.formatter ) { result += ` --formatter "${ options.formatter }"` }
    if ( options.from ) { result += ` --from "${ options.from }"` }
    if ( options.gateway ) { result += ` --gateway "${ options.gateway }"` }
    if ( options.genericResource ) { result += ` --generic-resource "${ options.genericResource }"` }
    if ( options.genericResourceAdd ) { result += ` --generic-resource-add "${ options.genericResourceAdd }"` }
    if ( options.genericResourceRm ) { result += ` --generic-resource-rm "${ options.genericResourceRm }"` }
    if ( options.global ) { result += ' --global' }
    if ( options.gpu ) { result += ` --gpu "${ options.gpu }"` }
    if ( options.grantAllPermissions ) { result += ' --grant-all-permissions' }
    if ( options.group ) { result += ` --group "${ options.group }"` }
    if ( options.groupAdd ) { result += ` --group-add "${ options.groupAdd }"` }
    if ( options.groupRm ) { result += ` --group-rm "${ options.groupRm }"` }
    if ( options.healthCmd ) { result += ` --health-cmd "${ options.healthCmd }"` }
    if ( options.healthInterval ) { result += ` --health-interval "${ options.healthInterval }"` }
    if ( options.healthRetries ) { result += ` --health-retries "${ options.healthRetries }"` }
    if ( options.healthStartPeriod ) { result += ` --health-start-period "${ options.healthStartPeriod }"` }
    if ( options.healthTimeout ) { result += ` --health-timeout "${ options.healthTimeout }"` }
    if ( options.help ) { result += ' --help' }
    if ( options.host ) { result += ` --host "${ options.host }"` }
    if ( options.hostAdd ) { result += ` --host-add "${ options.hostAdd }"` }
    if ( options.hostname ) { result += ` --hostname "${ options.hostname }"` }
    if ( options.hostRm ) { result += ` --host-rm "${ options.hostRm }"` }
    if ( options.human ) { result += ' --human' }
    if ( options.iidfile ) { result += ` --iidfile "${ options.iidfile }"` }
    if ( options.image ) { result += ` --image "${ options.image }"` }
    if ( options.ingress ) { result += ' --ingress' }
    if ( options.init ) { result += ' --init' }
    if ( options.input ) { result += ` --input "${ options.input }"` }
    if ( options.insecure ) { result += ' --insecure' }
    if ( options.insecureRegistries ) { result += ` --insecure-registries "${ options.insecureRegistries }"` }
    if ( options.interactive ) { result += ' --interactive' }
    if ( options.internal ) { result += ' --internal' }
    if ( options.ioMaxbandwidth ) { result += ` --io-maxbandwidth "${ options.ioMaxbandwidth }"` }
    if ( options.ioMaxiops ) { result += ` --io-maxiops "${ options.ioMaxiops }"` }
    if ( options.ip ) { result += ` --ip "${ options.ip }"` }
    if ( options.ip6 ) { result += ` --ip6 "${ options.ip6 }"` }
    if ( options.ipamDriver ) { result += ` --ipam-driver "${ options.ipamDriver }"` }
    if ( options.ipamOpt ) { result += ` --ipam-opt "${ options.ipamOpt }"` }
    if ( options.ipc ) { result += ` --ipc "${ options.ipc }"` }
    if ( options.ipRange ) { result += ` --ip-range "${ options.ipRange }"` }
    if ( options.isolation ) { result += ' --isolation' }
    if ( options.json ) { result += ' --json' }
    if ( options.keepStorage ) { result += ` --keep-storage "${ options.keepStorage }"` }
    if ( options.kernelMemory ) { result += ` --kernel-memory "${ options.kernelMemory }"` }
    if ( options.key ) { result += ` --key "${ options.key }"` }
    if ( options.kubeconfig ) { result += ` --kubeconfig "${ options.kubeconfig }"` }
    if ( options.kubernetes ) { result += ` --kubernetes "${ options.kubernetes }"` }
    if ( options.kubernetesNamespace ) { result += ` --kubernetes-namespace "${ options.kubernetesNamespace }"` }
    if ( options.label ) { result += ` --label "${ options.label }"` }
    if ( options.labelAdd ) { result += ` --label-add "${ options.labelAdd }"` }
    if ( options.labelFile ) { result += ` --label-file "${ options.labelFile }"` }
    if ( options.labelRm ) { result += ` --label-rm "${ options.labelRm }"` }
    if ( options.labelRm ) { result += ` --label-rm "${ options.labelRm }"` }
    if ( options.last ) { result += ` --last "${ options.last }"` }
    if ( options.latest ) { result += ' --latest' }
    if ( options.leave ) { result += ' --leave' }
    if ( options.leaveRunning ) { result += ' --leave-running' }
    if ( options.limit ) { result += ` --limit "${ options.limit }"` }
    if ( options.limitCpu ) { result += ` --limit-cpu "${ options.limitCpu }"` }
    if ( options.limitMemory ) { result += ` --limit-memory "${ options.limitMemory }"` }
    if ( options.link ) { result += ` --link "${ options.link }"` }
    if ( options.linkLocalIp ) { result += ` --link-local-ip "${ options.linkLocalIp }"` }
    if ( options.listenAddr ) { result += ` --listen-addr "${ options.listenAddr }"` }
    if ( options.load ) { result += ` --load` }
    if ( options.local ) { result += ' --local' }
    if ( options.logDriver ) { result += ` --log-driver "${ options.logDriver }"` }
    if ( options.logLevel ) { result += ` --log-level "${ options.logLevel }"` }
    if ( options.logOpt ) { result += ` --log-opt "${ options.logOpt }"` }
    if ( options.macAddress ) { result += ` --mac-address "${ options.macAddress }"` }
    if ( options.maintainer ) { result += ` --maintainer "${ options.maintainer }"` }
    if ( options.maxSnapshots ) { result += ` --max-snapshots "${ options.maxSnapshots }"` }
    if ( options.memory ) { result += ` --memory "${ options.memory }"` }
    if ( options.memoryReservation ) { result += ` --memory-reservation "${ options.memoryReservation }"` }
    if ( options.memorySwap ) { result += ` --memory-swap "${ options.memorySwap }"` }
    if ( options.memorySwappiness ) { result += ` --memory-swappiness "${ options.memorySwappiness }"` }
    if ( options.message ) { result += ` --message "${ options.message }"` }
    if ( options.mode ) { result += ` --mode "${ options.mode }"` }
    if ( options.mount ) { result += ` --mount "${ options.mount }"` }
    if ( options.mountAdd ) { result += ` --mount-add "${ options.mountAdd }"` }
    if ( options.mountRm ) { result += ` --mount-rm "${ options.mountRm }"` }
    if ( options.name ) { result += ` --name "${ options.name }"` }
    if ( options.namespace ) { result += ` --namespace "${ options.namespace }"` }
    if ( options.network ) { result += ` --network "${ options.network }"` }
    if ( options.networkAdd ) { result += ` --network-add "${ options.networkAdd }"` }
    if ( options.networkAlias ) { result += ` --network-alias "${ options.networkAlias }"` }
    if ( options.networkRm ) { result += ` --network-rm "${ options.networkRm }"` }
    if ( options.noCache ) { result += ' --no-cache' }
    if ( options.node ) { result += ` --node "${ options.node }"` }
    if ( options.noHealthcheck ) { result += ' --no-healthcheck' }
    if ( options.noPrune ) { result += ' --no-prune' }
    if ( options.noResolve ) { result += ' --no-resolve' }
    if ( options.noResolveImage ) { result += ' --no-resolve-image' }
    if ( options.noStdin ) { result += ' --no-stdin' }
    if ( options.noStream ) { result += ' --no-stream' }
    if ( options.noTaskIds ) { result += ' --no-task-ids' }
    if ( options.noTrunc ) { result += ' --no-trunc' }
    if ( options.objectType ) { result += ` --object-type "${ options.objectType }"` }
    if ( options.oomKillDisable ) { result += ` --oom-kill-disable` }
    if ( options.oomScoreAdj ) { result += ` --oom-score-adj "${ options.oomScoreAdj }"` }
    if ( options.opt ) { result += ` --opt "${ options.opt }"` }
    if ( options.orchestrator ) { result += ` --orchestrator "${ options.orchestrator }"` }
    if ( options.os ) { result += ` --os "${ options.os }"` }
    if ( options.osFeatures ) { result += ` --os-features "${ options.osFeatures }"` }
    if ( options.output ) { result += ` --output "${ options.output }"` }
    if ( options.parametersFile ) { result += ` --parameters-file "${ options.parametersFile }"` }
    if ( options.passphrase ) { result += ` --passphrase "${ options.passphrase }"` }
    if ( options.password ) { result += ` --password "${ options.password }"` }
    if ( options.passwordStdin ) { result += ` --password-stdin "${ options.passwordStdin }"` }
    if ( options.pause ) { result += ' --pause' }
    if ( options.pid ) { result += ` --pid "${ options.pid }"` }
    if ( options.pidsLimit ) { result += ` --pids-limit "${ options.pidsLimit }"` }
    if ( options.placementPref ) { result += ` --placement-pref "${ options.placementPref }"` }
    if ( options.placementPrefAdd ) { result += ` --placement-pref-add "${ options.placementPrefAdd }"` }
    if ( options.placementPrefRm ) { result += ` --placement-pref-rm "${ options.placementPrefRm }"` }
    if ( options.platform ) { result += ` --platform "${ options.platform }"` }
    if ( options.pretty ) { result += ' --pretty' }
    if ( options.print ) { result += ' --print' }
    if ( options.privileged ) { result += ' --privileged' }
    if ( options.progress ) { result += ` --progress "${ options.progress }"` }
    if ( options.prune ) { result += ' --prune' }
    if ( options.publish ) { result += ` --publish "${ options.publish }"` }
    if ( options.publishAdd ) { result += ` --publish-add "${ options.publishAdd }"` }
    if ( options.publishAll ) { result += ` --publish-all "${ options.publishAll }"` }
    if ( options.publishRm ) { result += ` --publish-rm "${ options.publishRm }"` }
    if ( options.pull ) { result += ' --pull' }
    if ( options.purge ) { result += ' --purge' }
    if ( options.quiet ) { result += ' --quiet' }
    if ( options.raw ) { result += ' --raw' }
    if ( options.readOnly ) { result += ' --read-only' }
    if ( options.replicas ) { result += ` --replicas "${ options.replicas }"` }
    if ( options.replicasMaxPerNode ) { result += ` --replicas-max-per-node "${ options.replicasMaxPerNode }"` }
    if ( options.reserveCpu ) { result += ` --reserve-cpu "${ options.reserveCpu }"` }
    if ( options.reserveMemory ) { result += ` --reserve-memory "${ options.reserveMemory }"` }
    if ( options.resolveImage ) { result += ` --resolve-image "${ options.resolveImage }"` }
    if ( options.restart ) { result += ` --restart "${ options.restart }"` }
    if ( options.restartCondition ) { result += ` --restart-condition "${ options.restartCondition }"` }
    if ( options.restartDelay ) { result += ` --restart-delay "${ options.restartDelay }"` }
    if ( options.restartMaxAttempts ) { result += ` --restart-max-attempts "${ options.restartMaxAttempts }"` }
    if ( options.restartWindow ) { result += ` --restart-window "${ options.restartWindow }"` }
    if ( options.role ) { result += ` --role "${ options.role }"` }
    if ( options.rollbackDelay ) { result += ` --rollback-delay "${ options.rollbackDelay }"` }
    if ( options.rollbackFailureAction ) { result += ` --rollback-failure-action "${ options.rollbackFailureAction }"` }
    if ( options.rollbackMaxFailureRatio ) { result += ` --rollback-max-failure-ratio "${ options.rollbackMaxFailureRatio }"` }
    if ( options.rollbackMonitor ) { result += ` --rollback-monitor "${ options.rollbackMonitor }"` }
    if ( options.rollbackOrder ) { result += ` --rollback-order "${ options.rollbackOrder }"` }
    if ( options.rollbackParallelism ) { result += ` --rollback-parallelism "${ options.rollbackParallelism }"` }
    if ( options.rotate ) { result += ' --rotate' }
    if ( options.row ) { result += ' --row' }
    if ( options.runtime ) { result += ` --runtime "${ options.runtime }"` }
    if ( options.scope ) { result += ` --scope "${ options.scope }"` }
    if ( options.secret ) { result += ` --secret "${ options.secret }"` }
    if ( options.secretAdd ) { result += ` --secret-add "${ options.secretAdd }"` }
    if ( options.secretRm ) { result += ` --secret-rm "${ options.secretRm }"` }
    if ( options.securityOpt ) { result += ` --security-opt "${ options.securityOpt }"` }
    if ( options.set ) { result += ` --set "${ options.set }"` }
    if ( options.shmSize ) { result += ` --shm-size "${ options.shmSize }"` }
    if ( options.signal ) { result += ` --signal "${ options.signal }"` }
    if ( options.since ) { result += ' --since' }
    if ( options.singleFile ) { result += ` --single-file` }
    if ( options.size ) { result += ' --size' }
    if ( options.skipRemoteCheck ) { result += ' --skip-remote-check' }
    if ( options.snapshotInterval ) { result += ` --snapshot-interval "${ options.snapshotInterval }"` }
    if ( options.squash ) { result += ' --squash' }
    if ( options.ssh ) { result += ` --ssh "${ options.ssh }"` }
    if ( options.stopGracePeriod ) { result += ` --stop-grace-period "${ options.stopGracePeriod }"` }
    if ( options.stopSignal ) { result += ` --stop-signal "${ options.stopSignal }"` }
    if ( options.stopTimeout ) { result += ` --stop-timeout "${ options.stopTimeout }"` }
    if ( options.storageOpt ) { result += ` --storage-opt "${ options.storageOpt }"` }
    if ( options.stream ) { result += ` --stream "${ options.stream }"` }
    if ( options.subnet ) { result += ` --subnet "${ options.subnet }"` }
    if ( options.switchContext ) { result += ' --switch-context' }
    if ( options.sysctl ) { result += ` --sysctl "${ options.sysctl }"` }
    if ( options.sysctlAdd ) { result += ` --sysctl-add "${ options.sysctlAdd }"` }
    if ( options.sysctlRm ) { result += ` --sysctl-rm "${ options.sysctlRm }"` }
    if ( options.tag ) { result += ` --tag "${ options.tag }"` }
    if ( options.tail ) { result += ' --tail' }
    if ( options.target ) { result += ` --target "${ options.target }"` }
    if ( options.targetContext ) { result += ` --target-context "${ options.targetContext }"` }
    if ( options.taskHistoryLimit ) { result += ` --task-history-limit "${ options.taskHistoryLimit }"` }
    if ( options.templateDriver ) { result += ` --template-driver "${ options.templateDriver }"` }
    if ( options.time ) { result += ` --time "${ options.time }"` }
    if ( options.timeout ) { result += ` --timeout "${ options.timeout }"` }
    if ( options.timestamps ) { result += ' --timestamps' }
    if ( options.tmpfs ) { result += ` --tmpfs "${ options.tmpfs }"` }
    if ( options.token ) { result += ` --token "${ options.token }"` }
    if ( options.tty ) { result += ' --tty' }
    if ( options.type ) { result += ` --type "${ options.type }"` }
    if ( options.ulimit ) { result += ` --ulimit "${ options.ulimit }"` }
    if ( options.until ) { result += ' --until' }
    if ( options.updateDelay ) { result += ` --update-delay "${ options.updateDelay }"` }
    if ( options.updateFailureAction ) { result += ` --update-failure-action "${ options.updateFailureAction }"` }
    if ( options.updateMaxFailureRatio ) { result += ` --update-max-failure-ratio "${ options.updateMaxFailureRatio }"` }
    if ( options.updateMonitor ) { result += ` --update-monitor "${ options.updateMonitor }"` }
    if ( options.updateOrder ) { result += ` --update-order "${ options.updateOrder }"` }
    if ( options.updateParallelism ) { result += ` --update-parallelism "${ options.updateParallelism }"` }
    if ( options.use ) { result += ' --use' }
    if ( options.user ) { result += ` --user "${ options.user }"` }
    if ( options.username ) { result += ` --username "${ options.username }"` }
    if ( options.userns ) { result += ` --userns "${ options.userns }"` }
    if ( options.uts ) { result += ` --uts "${ options.uts }"` }
    if ( options.variant ) { result += ` --variant "${ options.variant }"` }
    if ( options.verbose ) { result += ` --verbose` }
    if ( options.volume ) { result += ` --volume "${ options.volume }"` }
    if ( options.volumeDriver ) { result += ` --volume-driver "${ options.volumeDriver }"` }
    if ( options.volumes ) { result += ` --volumes` }
    if ( options.volumesFrom ) { result += ` --volumes-from "${ options.volumesFrom }"` }
    if ( options.withRegistryAuth ) { result += ` --with-registry-auth "${ options.withRegistryAuth }"` }
    if ( options.workdir ) { result += ` --workdir "${ options.workdir }"` }
    if ( options.yes ) { result += ' --yes' }

    return result
}

function _formatElements ( elements ) {
    let result = ''

    if ( Array.isArray( elements ) ) {
        result = elements.join( ' ' )
    } else {
        result = elements
    }

    return result
}

function _formatPrivatePort ( privatePort, proto ) {
    let result = ''

    if ( privatePort ) {
        result += privatePort
        if ( proto ) { result += `/${ proto }` }
    }

    return result
}

function _formatTaggedName ( name, tag, digest ) {
    let result = ''

    if ( name ) {
        result += name
        if ( tag ) {
            result += `:${ tag }`
        } else if ( digest ) {
            result += `@${ digest }`
        }
    }

    return result
}

const Docker = {
    attach:            ( options, container ) => {
        return _runDockerCommand( `docker attach ${ _formatOptions( options ) } ${ _formatElements( container ) }` )
    },
    build:             ( options, path ) => {
        return _runDockerCommand( `docker build ${ _formatOptions( options ) } ${ path }` )
    },
    commit:            ( options, container, repository = null, tag = null ) => {
        return _runDockerCommand( `docker commit ${ _formatOptions( options ) } ${ container } ${ _formatTaggedName( repository, tag, null ) }` )
    },
    copyFromContainer: ( options, container, sourcePath, destPath ) => {
        return _runDockerCommand( `docker cp ${ _formatOptions( options ) } ${ container }:${ sourcePath } ${ destPath }` )
    },
    copyToContainer:   ( options, container, sourcePath, destPath ) => {
        return _runDockerCommand( `docker cp ${ _formatOptions( options ) } ${ sourcePath } ${ container }:${ destPath }` )
    },
    create:            ( options, image, command, args ) => {
        return _runDockerCommand( `docker create ${ _formatOptions( options ) } ${ image } ${ command } ${ args }` )
    },
    diff:              ( container ) => {
        return _runDockerCommand( `docker diff ${ container }` )
    },
    events:            ( options ) => {
        return _runDockerCommand( `docker events ${ _formatOptions( options ) }` )
    },
    exec:              ( options, container, command, args ) => {
        return _runDockerCommand( `docker exec ${ _formatOptions( options ) } ${ _formatElements( container ) } ${ command } ${ args }` )
    },
    export:            ( options, container ) => {
        return _runDockerCommand( `docker export ${ _formatOptions( options ) } ${ container }` )
    },
    history:           ( options, image ) => {
        return _runDockerCommand( `docker history ${ _formatOptions( options ) } ${ image }` )
    },
    images:            ( options, repository = null, tag = null ) => {
        return _runDockerCommand( `docker images ${ _formatOptions( options ) } ${ _formatTaggedName( repository, tag, null ) }` )
    },
    import:            ( options, file, repository = null, tag = null ) => {
        return _runDockerCommand( `docker import ${ _formatOptions( options ) } ${ file } ${ _formatTaggedName( repository, tag, null ) }` )
    },
    info:              ( options ) => {
        return _runDockerCommand( `docker info ${ _formatOptions( options ) }` )
    },
    inspect:           ( options, ids ) => {
        return _runDockerCommand( `docker inspect ${ _formatOptions( options ) } ${ _formatElements( ids ) }` )
    },
    kill:              ( options, containers ) => {
        return _runDockerCommand( `docker kill ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    load:              ( options ) => {
        return _runDockerCommand( `docker load ${ _formatOptions( options ) }` )
    },
    login:             ( options, server ) => {
        return _runDockerCommand( `docker login ${ _formatOptions( options ) } ${ server }` )
    },
    logout:            ( server ) => {
        return _runDockerCommand( `docker logout ${ server }` )
    },
    logs:              ( options, container ) => {
        return _runDockerCommand( `docker logs ${ _formatOptions( options ) } ${ container }` )
    },
    pause:             ( containers ) => {
        return _runDockerCommand( `docker pause ${ _formatElements( containers ) }` )
    },
    port:              ( container, privatePort, proto ) => {
        return _runDockerCommand( `docker port ${ container } ${ privatePort }${ ( proto ) ? `/${ proto }` : '' }` )
    },
    ps:                ( options ) => {
        return _runDockerCommand( `docker ps ${ _formatOptions( options ) } ` )
    },
    pull:              ( options, name, tag, digest ) => {
        return _runDockerCommand( `docker pull ${ _formatOptions( options ) } ${ _formatTaggedName( name, tag, digest ) }` )
    },
    push:              ( options, name, tag ) => {
        return _runDockerCommand( `docker push ${ _formatOptions( options ) } ${ _formatTaggedName( name, tag, null ) }` )
    },
    rename:            ( container, newName ) => {
        return _runDockerCommand( `docker rename ${ container } ${ newName }` )
    },
    restart:           ( options, containers ) => {
        return _runDockerCommand( `docker restart ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    remove:            ( options, containers ) => {
        return _runDockerCommand( `docker remove ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    removeImage:       ( options, images ) => {
        return _runDockerCommand( `docker rmi ${ _formatOptions( options ) } ${ _formatElements( images ) }` )
    },
    run:               ( options, image, command, args ) => {
        return _runDockerCommand( `docker run ${ _formatOptions( options ) } ${ image } ${ command } ${ args }` )
    },
    save:              ( options, images ) => {
        return _runDockerCommand( `docker save ${ _formatOptions( options ) } ${ _formatElements( images ) }` )
    },
    search:            ( options, term ) => {
        return _runDockerCommand( `docker search ${ _formatOptions( options ) } ${ term }` )
    },
    start:             ( options, containers ) => {
        return _runDockerCommand( `docker start ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    stats:             ( options, containers ) => {
        return _runDockerCommand( `docker stats ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    stop:              ( options, containers ) => {
        return _runDockerCommand( `docker stop ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    tag:               ( sourceImage, sourceTag, targetImage, targetTag ) => {
        return _runDockerCommand( `docker tag ${ _formatTaggedName( sourceImage, sourceTag, null ) } ${ _formatTaggedName( targetImage, targetTag, null ) }` )
    },
    top:               ( container, psOptions ) => {
        return _runDockerCommand( `docker top ${ container } ${ psOptions }` )
    },
    unpause:           ( containers ) => {
        return _runDockerCommand( `docker unpause ${ _formatElements( containers ) }` )
    },
    update:            ( options, containers ) => {
        return _runDockerCommand( `docker update ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
    },
    version:           ( options ) => {
        return _runDockerCommand( `docker version ${ _formatOptions( options ) }` )
    },
    wait:              ( containers ) => {
        return _runDockerCommand( `docker wait ${ _formatElements( containers ) }` )
    },

    app:        {
        bundle:     ( appName, options ) => {
            return _runDockerCommand( `docker app bundle ${ appName } ${ _formatOptions( options ) }` )
        },
        completion: ( shell ) => {
            return _runDockerCommand( `docker app completion ${ shell }` )
        },
        init:       ( appName, options ) => {
            return _runDockerCommand( `docker app init ${ appName } ${ _formatOptions( options ) }` )
        },
        inspect:    ( appName, options ) => {
            return _runDockerCommand( `docker app inspect ${ appName } ${ _formatOptions( options ) }` )
        },
        install:    ( appName, options ) => {
            return _runDockerCommand( `docker app install ${ appName } ${ _formatOptions( options ) }` )
        },
        list:       ( options ) => {
            return _runDockerCommand( `docker app list ${ _formatOptions( options ) }` )
        },
        merge:      ( appName, options ) => {
            return _runDockerCommand( `docker app merge ${ appName } ${ _formatOptions( options ) }` )
        },
        pull:       ( name, tag, options ) => {
            return _runDockerCommand( `docker app pull ${ name }:${ tag } ${ _formatOptions( options ) }` )
        },
        push:       ( appName, options ) => {
            return _runDockerCommand( `docker app push ${ appName } ${ _formatOptions( options ) }` )
        },
        render:     ( appName, options ) => {
            return _runDockerCommand( `docker app render ${ appName } ${ _formatOptions( options ) }` )
        },
        split:      ( appName, options ) => {
            return _runDockerCommand( `docker app split ${ appName } ${ _formatOptions( options ) }` )
        },
        status:     ( installationName, options ) => {
            return _runDockerCommand( `docker app status ${ installationName } ${ _formatOptions( options ) }` )
        },
        uninstall:  ( installationName, options ) => {
            return _runDockerCommand( `docker app uninstall ${ installationName } ${ _formatOptions( options ) }` )
        },
        upgrade:    ( installationName, options ) => {
            return _runDockerCommand( `docker app upgrade ${ installationName } ${ _formatOptions( options ) }` )
        },
        validate:   ( appName, options ) => {
            return _runDockerCommand( `docker app validate ${ appName } ${ _formatOptions( options ) }` )
        },
        version:    () => {
            return _runDockerCommand( `docker app version` )
        }
    },
    builder:    {
        build: ( options, path ) => {
            return _runDockerCommand( `docker builder build ${ _formatOptions( options ) } ${ path }` )
        },
        prune: () => {
            return _runDockerCommand( `docker builder prune ${ _formatOptions( options ) }` )
        }
    },
    buildx:     {
        bake:       ( options, targets ) => {
            return _runDockerCommand( `docker buildx bake ${ _formatOptions( options ) } ${ _formatElements( targets ) }` )
        },
        build:      ( options, path ) => {
            return _runDockerCommand( `docker buildx build ${ _formatOptions( options ) } ${ path }` )
        },
        create:     ( options, context ) => {
            return _runDockerCommand( `docker buildx create ${ _formatOptions( options ) } ${ context }` )
        },
        imagetools: {
            create:  ( options, sources ) => {
                return _runDockerCommand( `docker buildx imagetools create ${ _formatOptions( options ) } ${ _formatElements( sources ) }` )
            },
            inspect: ( options, name ) => {
                return _runDockerCommand( `docker buildx imagetools inspect ${ _formatOptions( options ) } ${ name }` )
            }
        },
        inspect:    ( name ) => {
            return _runDockerCommand( `docker buildx inspect ${ _formatOptions( options ) } ${ name }` )
        },
        list:       () => {
            return _runDockerCommand( `docker buildx list` )
        },
        remove:     ( name ) => {
            return _runDockerCommand( `docker buildx remove ${ name }` )
        },
        stop:       ( name ) => {
            return _runDockerCommand( `docker buildx stop ${ name }` )
        },
        use:        ( options, name ) => {
            return _runDockerCommand( `docker buildx use ${ _formatOptions( options ) } ${ name }` )
        },
        version:    () => {
            return _runDockerCommand( `docker buildx version` )
        }
    },
    checkpoint: {
        create: ( options, container, checkpoint ) => {
            return _runDockerCommand( `docker checkpoint create ${ _formatOptions( options ) } ${ container } ${ checkpoint }` )
        },
        list:   ( options, container ) => {
            return _runDockerCommand( `docker checkpoint list ${ _formatOptions( options ) } ${ container }` )
        },
        remove: ( options, container, checkpoint ) => {
            return _runDockerCommand( `docker checkpoint remove ${ _formatOptions( options ) } ${ container } ${ checkpoint }` )
        }
    },
    cluster:    {
        backup:  ( options, cluster ) => {
            return _runDockerCommand( `docker cluster backup ${ _formatOptions( options ) } ${ cluster }` )
        },
        create:  ( options ) => {
            return _runDockerCommand( `docker cluster create ${ _formatOptions( options ) }` )
        },
        inspect: ( options, cluster ) => {
            return _runDockerCommand( `docker cluster inspect ${ _formatOptions( options ) } ${ cluster }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker cluster list ${ _formatOptions( options ) }` )
        },
        restore: ( options, cluster ) => {
            return _runDockerCommand( `docker cluster restore ${ _formatOptions( options ) } ${ cluster }` )
        },
        remove:  ( options, cluster ) => {
            return _runDockerCommand( `docker cluster remove ${ _formatOptions( options ) } ${ cluster }` )
        },
        update:  ( options, cluster ) => {
            return _runDockerCommand( `docker cluster update ${ _formatOptions( options ) } ${ cluster }` )
        },
        version: () => {
            return _runDockerCommand( `docker cluster version ${ _formatOptions( options ) }` )
        }
    },
    config:     {
        create:  ( options, config, file ) => {
            return _runDockerCommand( `docker config create ${ _formatOptions( options ) } ${ config } ${ file }` )
        },
        inspect: ( options, configs ) => {
            return _runDockerCommand( `docker config inspect ${ _formatOptions( options ) } ${ _formatElements( configs ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker config list ${ _formatOptions( options ) }` )
        },
        remove:  ( configs ) => {
            return _runDockerCommand( `docker config remove ${ _formatElements( configs ) }` )
        }
    },
    container:  {
        attach:  ( options, container ) => {
            return _runDockerCommand( `docker container attach ${ _formatOptions( options ) } ${ _formatElements( container ) }` )
        },
        commit:  ( options, container, repository = null, tag = null ) => {
            return _runDockerCommand( `docker container commit ${ _formatOptions( options ) } ${ _formatElements( container ) } ${ _formatTaggedName( repository, tag, null ) }` )
        },
        copy:    ( options, container, sourcePath, destPath ) => {
            return _runDockerCommand( `docker container cp ${ _formatOptions( options ) } ${ _formatElements( container ) }:${ sourcePath } ${ destPath }` )
        },
        create:  ( options, image, command, args ) => {
            return _runDockerCommand( `docker container create ${ _formatOptions( options ) } ${ image } ${ command } ${ args }` )
        },
        diff:    ( container ) => {
            return _runDockerCommand( `docker container diff ${ container }` )
        },
        exec:    ( options, container, command, args ) => {
            return _runDockerCommand( `docker container exec ${ _formatOptions( options ) } ${ _formatElements( container ) } ${ command } ${ args }` )
        },
        export:  ( options, container ) => {
            return _runDockerCommand( `docker container export ${ _formatOptions( options ) } ${ _formatElements( container ) }` )
        },
        inspect: ( options, containers ) => {
            return _runDockerCommand( `docker container inspect ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        kill:    ( options, containers ) => {
            return _runDockerCommand( `docker container kill ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        logs:    ( options, container ) => {
            return _runDockerCommand( `docker container logs ${ _formatOptions( options ) } ${ _formatElements( container ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker container list ${ _formatOptions( options ) }` )
        },
        pause:   ( containers ) => {
            return _runDockerCommand( `docker container pause ${ _formatElements( containers ) }` )
        },
        port:    ( container, privatePort, proto ) => {
            return _runDockerCommand( `docker container port ${ _formatElements( container ) } ${ _formatPrivatePort( privatePort, proto ) }` )
        },
        prune:   ( options ) => {
            return _runDockerCommand( `docker container prune ${ _formatOptions( options ) }` )
        },
        rename:  ( container, newName ) => {
            return _runDockerCommand( `docker container rename ${ _formatElements( container ) } ${ newName }` )
        },
        restart: ( options, containers ) => {
            return _runDockerCommand( `docker container restart ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        remove:  ( options, containers ) => {
            return _runDockerCommand( `docker container rm ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        run:     ( options, image, command, args ) => {
            return _runDockerCommand( `docker container run ${ _formatOptions( options ) } ${ _formatElements( image ) } ${ command } ${ args }` )
        },
        start:   ( options, containers ) => {
            return _runDockerCommand( `docker container start ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        stats:   ( options, containers ) => {
            return _runDockerCommand( `docker container stats ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        stop:    ( options, containers ) => {
            return _runDockerCommand( `docker container stop ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        top:     ( container, psOptions ) => {
            return _runDockerCommand( `docker container top ${ _formatElements( container ) } ${ psOptions }` )
        },
        unpause: ( containers ) => {
            return _runDockerCommand( `docker container unpause ${ _formatElements( containers ) }` )
        },
        update:  ( options, containers ) => {
            return _runDockerCommand( `docker container update ${ _formatOptions( options ) } ${ _formatElements( containers ) }` )
        },
        wait:    ( containers ) => {
            return _runDockerCommand( `docker container wait ${ _formatElements( containers ) }` )
        }
    },
    context:    {
        create:  ( options, context ) => {
            return _runDockerCommand( `docker context create ${ _formatOptions( options ) } ${ context }` )
        },
        export:  ( options, context, file ) => {
            return _runDockerCommand( `docker context export ${ _formatOptions( options ) } ${ context } ${ file }` )
        },
        import:  ( context, file ) => {
            return _runDockerCommand( `docker context import ${ context } ${ file }` )
        },
        inspect: ( options, contexts ) => {
            return _runDockerCommand( `docker context inspect ${ _formatOptions( options ) } ${ _formatElements( contexts ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker context list ${ _formatOptions( options ) }` )
        },
        remove:  ( contexts ) => {
            return _runDockerCommand( `docker context remove ${ _formatElements( contexts ) }` )
        },
        update:  ( options, context ) => {
            return _runDockerCommand( `docker context update ${ _formatOptions( options ) } ${ context }` )
        },
        use:     ( context ) => {
            return _runDockerCommand( `docker context use ${ context }` )
        }
    },
    image:      {
        build:   ( options, path ) => {
            return _runDockerCommand( `docker image build ${ _formatOptions( options ) } ${ path }` )
        },
        history: ( options, image ) => {
            return _runDockerCommand( `docker image history ${ _formatOptions( options ) } ${ image }` )
        },
        import:  ( options, file, repository = null, tag = null ) => {
            return _runDockerCommand( `docker image import ${ _formatOptions( options ) } ${ file } ${ _formatTaggedName( repository, tag, null ) }` )
        },
        inspect: ( options, images ) => {
            return _runDockerCommand( `docker image inspect ${ _formatOptions( options ) } ${ _formatElements( images ) }` )
        },
        load:    ( options ) => {
            return _runDockerCommand( `docker image load ${ _formatOptions( options ) }` )
        },
        list:    ( options, repository = null, tag = null ) => {
            return _runDockerCommand( `docker image list ${ _formatOptions( options ) } ${ _formatTaggedName( repository, tag, null ) }` )
        },
        prune:   ( options ) => {
            return _runDockerCommand( `docker image prune ${ _formatOptions( options ) }` )
        },
        pull:    ( options, name, tag, digest ) => {
            return _runDockerCommand( `docker image pull ${ _formatOptions( options ) } ${ _formatTaggedName( name, tag, digest ) }` )
        },
        push:    ( options, name, tag ) => {
            return _runDockerCommand( `docker image push ${ _formatOptions( options ) } ${ _formatTaggedName( name, tag ) }` )
        },
        remove:  ( options, images ) => {
            return _runDockerCommand( `docker image remove ${ _formatOptions( options ) } ${ _formatElements( images ) }` )
        },
        save:    ( options, images ) => {
            return _runDockerCommand( `docker image save ${ _formatOptions( options ) } ${ _formatElements( images ) }` )
        },
        tag:     ( sourceImage, sourceTag, targetImage, targetTag ) => {
            return _runDockerCommand( `docker image tag ${ _formatTaggedName( sourceImage, sourceTag ) } ${ _formatTaggedName( targetImage, targetTag ) }` )
        }
    },
    manifest:   {
        annotate: ( options, manifestList, manifest ) => {
            return _runDockerCommand( `docker manifest annotate ${ _formatOptions( options ) } ${ manifestList } ${ manifest }` )
        },
        create:   ( manifestList, manifests ) => {
            return _runDockerCommand( `docker manifest create ${ _formatOptions( options ) } ${ manifestList } ${ _formatElements( manifests ) }` )
        },
        inspect:  ( options, manifestList, manifest ) => {
            return _runDockerCommand( `docker manifest inspect ${ _formatOptions( options ) } ${ manifestList } ${ manifest }` )
        },
        push:     ( options, manifestList ) => {
            return _runDockerCommand( `docker manifest push ${ _formatOptions( options ) } ${ manifestList }` )
        }
    },
    network:    {
        connect:    ( options, network, container ) => {
            return _runDockerCommand( `docker network connect ${ _formatOptions( options ) } ${ network } ${ container }` )
        },
        create:     ( options, network ) => {
            return _runDockerCommand( `docker network create ${ _formatOptions( options ) } ${ network }` )
        },
        disconnect: ( options, network, container ) => {
            return _runDockerCommand( `docker network disconnect ${ _formatOptions( options ) } ${ network } ${ container }` )
        },
        inspect:    ( options, networks ) => {
            return _runDockerCommand( `docker network inspect ${ _formatOptions( options ) } ${ _formatElements( networks ) }` )
        },
        list:       ( options ) => {
            return _runDockerCommand( `docker network list ${ _formatOptions( options ) }` )
        },
        prune:      ( options ) => {
            return _runDockerCommand( `docker network prune ${ _formatOptions( options ) }` )
        },
        remove:     ( options, networks ) => {
            return _runDockerCommand( `docker network remove ${ _formatOptions( options ) } ${ _formatElements( networks ) }` )
        }
    },
    node:       {
        demote:  ( nodes ) => {
            return _runDockerCommand( `docker node demote ${ _formatElements( nodes ) }` )
        },
        inspect: ( options, nodes ) => {
            return _runDockerCommand( `docker node inspect ${ _formatOptions( options ) } ${ _formatElements( nodes ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker node list ${ _formatOptions( options ) }` )
        },
        promote: ( nodes ) => {
            return _runDockerCommand( `docker node promote ${ _formatElements( nodes ) }` )
        },
        ps:      ( options, nodes ) => {
            return _runDockerCommand( `docker node ps ${ _formatOptions( options ) } ${ _formatElements( nodes ) }` )
        },
        remove:  ( options, nodes ) => {
            return _runDockerCommand( `docker node remove ${ _formatOptions( options ) } ${ _formatElements( nodes ) }` )
        },
        update:  ( options, node ) => {
            return _runDockerCommand( `docker node update ${ _formatOptions( options ) } ${ node }` )
        }
    },
    plugin:     {
        create:  ( options, plugin, pluginDataDir ) => {
            return _runDockerCommand( `docker plugin create ${ _formatOptions( options ) } ${ plugin } ${ pluginDataDir }` )
        },
        disable: ( options, plugin ) => {
            return _runDockerCommand( `docker plugin disable ${ _formatOptions( options ) } ${ plugin }` )
        },
        enable:  ( options, plugin ) => {
            return _runDockerCommand( `docker plugin enable ${ _formatOptions( options ) } ${ plugin }` )
        },
        inspect: ( options, plugins ) => {
            return _runDockerCommand( `docker plugin inspect ${ _formatOptions( options ) } ${ _formatElements( plugins ) }` )
        },
        install: ( options, plugin, keyValues ) => {
            return _runDockerCommand( `docker plugin install ${ _formatOptions( options ) } ${ plugin } ${ keyValues }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker plugin list ${ _formatOptions( options ) } ` )
        },
        remove:  ( options, plugins ) => {
            return _runDockerCommand( `docker plugin remove ${ _formatOptions( options ) } ${ _formatElements( plugins ) }` )
        },
        set:     ( plugin, keyValues ) => {
            return _runDockerCommand( `docker plugin set ${ plugin } ${ keyValues }` )
        },
        upgrade: ( options, plugin, remote ) => {
            return _runDockerCommand( `docker plugin upgrade ${ _formatOptions( options ) } ${ plugin } ${ remote }` )
        }
    },
    registry:   {
        events:      ( repository, options ) => {
            return _runDockerCommand( `docker registry events ${ repository } ${ _formatOptions( options ) }` )
        },
        history:     ( image, options ) => {
            return _runDockerCommand( `docker registry history ${ image } ${ _formatOptions( options ) }` )
        },
        info:        ( host, options ) => {
            return _runDockerCommand( `docker registry info ${ host } ${ _formatOptions( options ) }` )
        },
        inspect:     ( image, options ) => {
            return _runDockerCommand( `docker registry inspect ${ image } ${ _formatOptions( options ) }` )
        },
        joblogs:     ( host, jobId, options ) => {
            return _runDockerCommand( `docker registry joblogs ${ host } ${ jobId } ${ _formatOptions( options ) }` )
        },
        list:        ( repository, tag, options ) => {
            return _runDockerCommand( `docker registry ls ${ _formatTaggedName( repository, tag, null ) } ${ _formatOptions( options ) }` )
        },
        removeImage: ( repository, tag, options ) => {
            return _runDockerCommand( `docker registry rmi ${ _formatTaggedName( repository, tag, null ) } ${ _formatOptions( options ) }` )
        }
    },
    secret:     {
        create:  ( options, secret, file ) => {
            return _runDockerCommand( `docker secret create ${ _formatOptions( options ) } ${ secret } ${ file }` )
        },
        inspect: ( options, secrets ) => {
            return _runDockerCommand( `docker secret inspect ${ _formatOptions( options ) } ${ _formatElements( secrets ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker secret list ${ _formatOptions( options ) }` )
        },
        remove:  ( secrets ) => {
            return _runDockerCommand( `docker secret remove ${ _formatElements( secrets ) }` )
        }
    },
    service:    {
        create:   ( options, image, command, args ) => {
            return _runDockerCommand( `docker service create ${ _formatOptions( options ) } ${ image } ${ command } ${ args }` )
        },
        inspect:  ( options, services ) => {
            return _runDockerCommand( `docker service inspect ${ _formatOptions( options ) } ${ _formatElements( services ) }` )
        },
        logs:     ( options, service ) => {
            return _runDockerCommand( `docker service logs ${ _formatOptions( options ) } ${ service }` )
        },
        list:     ( options ) => {
            return _runDockerCommand( `docker service list ${ _formatOptions( options ) }` )
        },
        ps:       ( options, services ) => {
            return _runDockerCommand( `docker service ps ${ _formatOptions( options ) } ${ _formatElements( services ) }` )
        },
        rollback: ( options, service ) => {
            return _runDockerCommand( `docker service rollback ${ _formatOptions( options ) } ${ service }` )
        },
        remove:   ( options, services ) => {
            return _runDockerCommand( `docker service remove ${ _formatOptions( options ) } ${ _formatElements( services ) }` )
        },
        scale:    ( options, serviceReplicas ) => {
            return _runDockerCommand( `docker service scale ${ _formatOptions( options ) } ${ _formatElements( serviceReplicas ) }` )
        },
        update:   ( options, service ) => {
            return _runDockerCommand( `docker service update ${ _formatOptions( options ) } ${ service }` )
        }
    },
    stack:      {
        deploy:   ( options, stack ) => {
            return _runDockerCommand( `docker stack deploy ${ _formatOptions( options ) } ${ stack }` )
        },
        ps:       ( options, stack ) => {
            return _runDockerCommand( `docker stack ps ${ _formatOptions( options ) } ${ stack }` )
        },
        remove:   ( options, stacks ) => {
            return _runDockerCommand( `docker stack remove ${ _formatOptions( options ) } ${ _formatElements( stacks ) }` )
        },
        services: ( options, stack ) => {
            return _runDockerCommand( `docker stack services ${ _formatOptions( options ) } ${ stack }` )
        }
    },
    swarm:      {
        ca:        ( options ) => {
            return _runDockerCommand( `docker swarm ca ${ _formatOptions( options ) }` )
        },
        init:      ( options ) => {
            return _runDockerCommand( `docker swarm init ${ _formatOptions( options ) }` )
        },
        joinToken: ( options, manager ) => {
            return _runDockerCommand( `docker swarm joinToken ${ _formatOptions( options ) } ${ manager }` )
        },
        join:      ( options, host, port ) => {
            return _runDockerCommand( `docker swarm join ${ _formatOptions( options ) } ${ host }:${ port }` )
        },
        leave:     ( options ) => {
            return _runDockerCommand( `docker swarm leave ${ _formatOptions( options ) }` )
        },
        unlockKey: ( options ) => {
            return _runDockerCommand( `docker swarm unlockKey ${ _formatOptions( options ) }` )
        },
        unlock:    () => {
            return _runDockerCommand( `docker swarm unlock` )
        },
        update:    ( options ) => {
            return _runDockerCommand( `docker swarm update ${ _formatOptions( options ) }` )
        }
    },
    system:     {
        disk:   ( options ) => {
            return _runDockerCommand( `docker system disk ${ _formatOptions( options ) }` )
        },
        events: ( options ) => {
            return _runDockerCommand( `docker system events ${ _formatOptions( options ) }` )
        },
        info:   ( options ) => {
            return _runDockerCommand( `docker system info ${ _formatOptions( options ) }` )
        },
        prune:  ( options ) => {
            return _runDockerCommand( `docker system prune ${ _formatOptions( options ) }` )
        }
    },
    trust:      {
        inspect: ( images, tags ) => {
            let _signatures = ''
            for ( let imgIndex = 0, numberOfImages = images.length ; imgIndex < numberOfImages ; imgIndex++ ) {
                _signatures += ` ${ _formatTaggedName( images[ imgIndex ], tags[ imgIndex ], null ) }`
            }
            return _runDockerCommand( `docker trust inspect ${ _signatures }` )
        },
        key:     {
            generate: ( name ) => {
                return _runDockerCommand( `docker trust key generate ${ name }` )
            },
            load:     ( options, keyfile ) => {
                return _runDockerCommand( `docker trust key load ${ _formatOptions( options ) } ${ keyfile }` )
            }
        },
        revoke:  ( options, image, tag ) => {
            return _runDockerCommand( `docker trust revoke ${ _formatOptions( options ) } ${ _formatTaggedName( image, tag, null ) }` )
        },
        sign:    ( image, tag ) => {
            return _runDockerCommand( `docker trust sign ${ _formatTaggedName( image, tag, null ) }` )
        },
        signer:  {
            add:    ( options, name, repositories ) => {
                return _runDockerCommand( `docker trust signer add ${ _formatOptions( options ) } ${ name } ${ _formatElements( repositories ) }` )
            },
            remove: ( options, name, repositories ) => {
                return _runDockerCommand( `docker trust signer remove ${ _formatOptions( options ) } ${ name } ${ _formatElements( repositories ) }` )
            }
        }
    },
    volume:     {
        create:  ( options, volume ) => {
            return _runDockerCommand( `docker volume create ${ _formatOptions( options ) } ${ _formatElements( volume ) }` )
        },
        inspect: ( options, volumes ) => {
            return _runDockerCommand( `docker volume inspect ${ _formatOptions( options ) } ${ _formatElements( volumes ) }` )
        },
        list:    ( options ) => {
            return _runDockerCommand( `docker volume list ${ _formatOptions( options ) }` )
        },
        prune:   ( options ) => {
            return _runDockerCommand( `docker volume prune ${ _formatOptions( options ) }` )
        },
        remove:  ( options, volumes ) => {
            return _runDockerCommand( `docker volume rm ${ _formatOptions( options ) } ${ _formatElements( volumes ) }` )
        }
    }
}

exports.Docker = Docker
