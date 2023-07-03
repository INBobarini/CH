import { CustomError } from "../models/errors/customError.js"
import { usersRepository } from "../repository/usersRepository.js"


export async function handleGetEmail(req,res,next){//gets a code, returns an email
    try{
        let code = req.params.code 
        let resetRequest = await usersRepository.getResetPassRequestFromCode(code)
        if(!resetRequest){
            throw new CustomError(
                "Reset request not found",404,"handleGetEmail"
                )
        } 
        if(resetRequest.expireDate < new Date(Date.now())){
            throw new CustomError(
                "Reset request expired",498,"handleGetEmail"
                )
        } 
        req.email = resetRequest.email
        next()
    }
    catch(err){
        next(err)
    }
}