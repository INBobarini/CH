import {CustomError} from '../errors/customError.js'

export function positiveInteger(value, fieldName){
    if(typeof value!=="number"){
        throw new CustomError(`${fieldName} is not a number`,400)
    }
    if(!Number.isInteger(value)){
        throw new CustomError(`${fieldName} is not a whole number`),400
    }
    if(value<=0){
        throw new CustomError(`${fieldName} is negative or zero`,400)
    }
    return value
}

function isBoolean(value,fieldName){
    if(typeof value!=="boolean"){
        throw new CustomError(`${fieldName} is not a boolean`)
    }
    return value
}