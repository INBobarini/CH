import {winstonLogger as logger} from "../../utils/winstonLogger.js"

export class CustomError extends Error {
    constructor(error, code, scope){
        super(error)
        this.name = this.resolveError(code)
        this.code = code || 500
        this.message = error.message? error.message : error
        this.stack = error.stack || error
        this.scope = scope || undefined
        this.logError()
    }
    resolveError(code){
        const errorTypes = {
            400: "Invalid argument",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not found",
            409: "Conflict",
            498: "Expired or invalid token",
            500: "Internal error"
        }
        if(!code){return errorTypes[500]}
        return errorTypes[code]? errorTypes[code] : errorTypes[500]
    }
    logError(){
        logger.error(
            `${this.code}. ${this.name}. ${this.message}. Scope: ${this.scope}`
            )
    }
}
/*
function test(){
    let testerino = {}
    console.log(testerino.patch.id)
}
try{
    test()
}
catch(err){
   let errorResult = new CustomError(err)
   console.log(errorResult.code)
}
*/

