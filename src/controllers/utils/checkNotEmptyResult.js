import { CustomError } from '../../models/errors/customError.js'

export function checkReqResult(result, code){
    if(!result) {
        throw new CustomError("Empty result", 500) 
    }
    else return code? code : 200
}