let okStatusMessage = "success"
let badStatusMessage = "error"

import { winstonLogger } from "../utils/winstonLogger.js";
class responseObj {
    constructor(result){
        this.status = result.statusCode
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

export const productsResponseFormatter = 
function (req,res){
    !req.statusCode??200
    let statusMessage = badStatusMessage
    if(req.statusCode===200||req.statusCode===201){
        statusMessage = okStatusMessage
    }
    if(statusMessage===badStatusMessage){
        return res.status(req.statusCode).json({status:statusMessage, payload:"{}"})
    }
    req.result.statusCode = req.statusCode
    !req.statusCode??500
    let response = new responseObj(req.result)
    res.status(req.statusCode).json(response)
}

export const cartsResponseFormatter = 
function (req,res){
    
    let statusMessage = badStatusMessage
    if(req.statusCode===200||req.statusCode===201){
        statusMessage = okStatusMessage
    }
    if(statusMessage===badStatusMessage){
        return res.status(req.statusCode).json({status:statusMessage, payload:"{}"})
    }
    !req.statusCode??500
    res.status(req.statusCode).json({status:statusMessage, payload:req.result})
}
