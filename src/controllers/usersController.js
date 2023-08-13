import { CustomError } from "../models/errors/customError.js"
import { resetPwRequestsRepository } from "../repository/resetPWrequestsRepository.js"
import { usersRepository } from "../repository/usersRepository.js"
import * as usersService from "../services/sessionsService.js"
import { winstonLogger as logger} from "../utils/winstonLogger.js"
import {current} from "../middlewares/auth.js"

export async function handleGetEmail(req,res,next){//gets a code, returns an email
    try{
        let code = req.params.code 
        let result = await resetPwRequestsRepository.verifyResetPasswordRequest(code)
        if(result instanceof Error){
            req.error = result
            return next()
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
        logger.debug(`Code:${code}`)
        if(!req.body.password) throw new CustomError("Undefined pass", 400)
        let password = req.body.password
        let email = await resetPwRequestsRepository.getEmailFromCode(code)
        if(!email) throw new CustomError("Email not found", 404)
        req.email = email
        req.updatedUser = await usersRepository.updateUserPassword({email},password)
        if(req.updatedUser instanceof Error ){
            logger.warning("password update unsuccesful")
            req.error = req.updatedUser
            return next()
        }
        if(req.updatedUser){
            resetPwRequestsRepository.markLinkasUsed(code)
            req.message = req.updatedUser
            return next()
        }
        else{
            throw new CustomError("User's pass was not updated", 500)
        }
        
    }
    catch(err){
        next(err)
    }
}

export async function handlePremium(req,res,next){
    try{
        if(!req.params.uid){
            logger.warning("No req.params.uid in handlePremiumUpgrade")
        }
        else{
            let uid = req.params.uid
            let user = await usersRepository.getUser({_id:uid})
            if (user.role==='user'){//upgrade case
                let missingDocs = await usersService.checkDocuments(uid)
                req.result = await usersService.upgradeToPremium(uid, missingDocs) 
            }
            else if (user.role==='premium'){//downgrade case
                req.result = await usersRepository.updateUser({_id:uid},{role:'user'})
            }
        } 
        res.status(200).json(req.result)
    }
    catch(error){
        next(error)
    }
}

export async function handleDeleteInactiveUsers(req, res, next){
    let timeLimit
    try {
        req.result = await usersService.deleteInactiveUsers(timeLimit)
        next()
    } catch (error) {
        next(error)
    }
    
}

export async function handleNewUserDocuments(req, res, next){
    try {
        let user = await current(req.session)
        if (req.files) {
            let newDocs = []
            Object.keys(req.files).forEach(key => {
                req.files[key].forEach(e => {
                    newDocs.push({
                        name: e.fieldname,
                        reference: e.path
                    })
                })
            })
            req.result = await usersService.updateUserDocuments(user, newDocs)
            next()
        }
    } catch (error) {
        logger.fatal(error)
        next(error)
    }
    
}


export async function handleGetUsersData(req, res, next){
    try {
        req.result = await usersService.getAllUsers()
        next()
        //error case
    } catch (error) {
        next(error) 
    }
}

export async function handleDeleteUser(req, res, next){
    try {
        let uid = req.params.uid
        if(!uid) return new CustomError("!uid", 400)
        logger.debug(`Received req.params.uid: ${req.params.uid}`)
        req.result = await usersRepository.deleteUser({_id:uid})
        if(!req.result) return new CustomError("!req.result", 500)
        //error case
        next()
    } catch (error) {
        next(error) 
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