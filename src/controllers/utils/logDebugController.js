export function controllerLogDebug(functionName){
    req.logger.debug(`${functionName} received ${JSON.stringify()}`)
    req.logger.debug(`${functionName} returned ${JSON.stringify(req.result)}`)
}   
