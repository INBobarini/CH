export function positiveInteger(value, fieldName){
    if(typeof value!=="number"){
        throw new customError.ArgumentError(`${fieldName} is not a number`)
    }
    if(!Number.isInteger(value)){
        throw new customError.ArgumentError(`${fieldName} is not a whole number`)
    }
    if(value<=0){
        throw new customError.ArgumentError(`${fieldName} is negative or zero`)
    }
    return value
}

export function isBoolean(value,fieldName){
    if(typeof value!=="boolean"){
        throw new customError.ArgumentError(`${fieldName} is not a boolean`)
    }
    return value
}