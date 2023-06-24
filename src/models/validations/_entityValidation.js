import { CustomError } from "../errors/customError.js";

function errorString (key, receivedValue){
    return `${key}, received ${receivedValue}`
} 

export function required(elementInput, requiredFromEntity){
    for (let key in requiredFromEntity){
        if (requiredFromEntity[key] && !elementInput[key]) {
            //throw new customError.ArgumentError("Missing field " + errorString(key, elementInput[key]));
        }
    }
    return elementInput
}
export function types(elementInput, requiredFromEntity, typesFromEntity){
    for (let key in typesFromEntity){
        if (typesFromEntity[key] !== typeof elementInput[key] && requiredFromEntity[key]) {
            //throw new customError.ArgumentError("Wrong type of  " + errorString(key, elementInput[key]));
        }
    }
    return elementInput
}







