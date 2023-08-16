import { CustomError } from "../models/errors/customError.js"
import { winstonLogger as logger } from "../utils/winstonLogger.js"

export const successfulResponse = function (req,res,next){//errorHandler must go after this MW
    try {
        if(checkResult(req.result)){
            res.status(req.statusCode||200)
            return res.json(req.result)
        }
        else {
            throw req.result
        }
    } catch (error) {
        next(error)
    }
    
    
}
export const productsResponse = function (req,res, next){
    try {
        if(checkResult(req.result)){
            let response = new responseObj(req.result)
            res.status(req.statusCode||200)
            return res.json(response)
        }
        else {
            throw req.result
        }
    } catch (error) {
        next(error)
    }
}

export const cartsResponse = function (req,res,next){
    try {
        if(!(checkResult(req.result) instanceof Error)){
            res.status(req.statusCode||200)
            return res.send(req.result)
        }
        else {
            throw req.result
        }
    } catch (error) {
        next(error)
    }
}

function checkResult(result){
    if(!result){
        let error = new CustomError("Got an empty result", 500)
        return error
    }
    if(result instanceof Error){//if it is an instance of CustomError has a [code] property
        if (!result.code) result.code = 500
        return result
    }
    logger.debug(`Result is: ${JSON.stringify(req.result)}`)
    return true
}

class responseObj {
    constructor(result){
        this.status = result.statusCode || 200
        this.payload = result.docs||[result]; //even if single product, must return an array
        this.totalPages = result.totalPages||0;
        this.prevPage = result.prevPage||null;
        this.nextPage = result.nextPage||null;
        this.page = result.page||null; 
        this.hasPrevPage = result.hasPrevPage||null;
        this.hasNextPage = result.hasNextPage||null;
        this.prevLink = result.prevLink||null;
        this.nextLink = result.nextLink||null;
        this.limit = result.limit;
    }
}