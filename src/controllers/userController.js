import { CustomError } from "../models/errors/customError.js"
import { usersRepository } from "../repository/usersRepository.js"
import { winstonLogger as logger, winstonLogger} from "../utils/winstonLogger.js"


export async function handleGetEmail(req,res,next){//gets a code, returns an email
    try{
        let code = req.params.code 
        let result = usersRepository.verifyResetPasswordRequest(code)
        if(result instanceof Error){
            throw result
        }
        req.email = result
        next()
    }
    catch(err){
        next(err)
    }
}

export async function changeUserPassword(req,res,next){//gets a code, returns an email
    try{
        if(!req.body.code) throw new CustomError("Undefined code", 400)
        let code = req.body.code 
        if(!req.body.password) throw new CustomError("Undefined pass", 400)
        let password = req.body.password
        let email = await usersRepository.getEmailFromCode(code)
        if(!email) throw new CustomError("Email not found", 404)
        req.email = email
        req.updatedUser = await usersRepository.updateUserPassword({email},password)
        if(req.updatedUser instanceof Error ){
            logger.warning("password update unsuccesful")
            req.error = req.updatedUser
            next()
        }
        if(req.updatedUser){
            usersRepository.markLinkasUsed(code)
            req.message = req.updatedUser
            next()
        }
        else{
            throw new CustomError("User's pass was not updated", 500)
        }
        next()
    }
    catch(err){
        next(err)
    }
}

/*export async function handleUpdatePassword(req, res, next) {//better for userController
    const { code, password } = req.body
    try {
        //---link verification---
        let email = await usersRepository.verifyResetPasswordRequest(code)
        //---password update---
        const updatedUser = await usersRepository.updateUserPassword({email},password)
        req.updatedUser = updatedUser
        return updatedUser
    } catch (error) {
        next( new CustomError(error,500,"handleUpdatePassword"))
    }
}*/