import { logDebug, winstonLogger } from "../utils/winstonLogger.js"
import { emailService } from "../services/mailerService.js"
import { CustomError } from "../models/errors/customError.js"
import { usersModel } from "../models/usersModel.js"
import { usersRepository } from "../repository/usersRepository.js"

export async function handleGetPassRestore(req, res, next) { //unused
    let link = req.params.code
    try {
        //let confirmedLink = await linksRepository.get({uuid:link})
        //if (!confirmedLink) = throw new CustomError("Link wrong or expired")
        logDebug(winstonLogger,[req.params.code],"not implemented handleGetPassRestore")
        next()
    } catch (error) {
        next( new CustomError(error, 500) )
    }
}

export async function handlePostPassRestore(req, res, next) {
    const { email } = req.body
    let foundUser = await usersRepository.getUser({email})
    if(!foundUser) throw new CustomError ("User not found", 404, "handlePostPassRestore")
    try {
        const info = await emailService.sendRestorePasswordLink(email)
        res.json(info)
        next()
    } catch (error) {
        next(error)
    }
}

export async function handleUpdatePassword(req, res, next) {//better for userController
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
}