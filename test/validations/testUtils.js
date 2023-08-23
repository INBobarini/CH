import { CustomError } from "../../src/models/errors/customError.js";

function errorString (key, receivedValue, expectedValue){
    return `${key}, received ${receivedValue}, expecting ${expectedValue}`
} 

export function required(response, requiredFromEntity){
    for (let key in requiredFromEntity){
        if (requiredFromEntity[key] && !response[key]) {
            throw new CustomError("Missing field " + errorString(key, response[key], requiredFromEntity[key]), 500)
        }
    }
    return true
}
export function types(testInput, requiredFromEntity, typesFromEntity){
    for (let key in typesFromEntity){
        if (typesFromEntity[key] !== typeof testInput[key] && requiredFromEntity[key]) {
            throw new CustomError("Wrong type of  " + errorString(key, testInput[key], typesFromEntity[key]), 500);
        }
    }
    return true
}

