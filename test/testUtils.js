import { CustomError } from "../src/models/errors/customError";

function errorString (key, receivedValue){
    return `${key}, received ${receivedValue}`
} 

export function requiredTest(testInput, requiredFromEntity){
    for (let key in requiredFromEntity){
        if (requiredFromEntity[key] && !testInput[key]) {
            throw new CustomError("Missing field " + errorString(key, testInput[key], 400));
        }
    }
    return testInput
}
export function typesTest(testInput, requiredFromEntity, typesFromEntity){
    for (let key in typesFromEntity){
        if (typesFromEntity[key] !== typeof testInput[key] && requiredFromEntity[key]) {
            throw new CustomError("Wrong type of  " + errorString(key, testInput[key], 400));
        }
    }
    return testInput
}