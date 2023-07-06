import { logDebug, winstonLogger } from "../utils/winstonLogger.js"
import { emailService } from "../services/mailerService.js"
import { CustomError } from "../models/errors/customError.js"
import { usersModel } from "../models/usersModel.js"
import { usersRepository } from "../repository/usersRepository.js"

export async function handleNewPassRestoreRequest(req, res, next) {
    const { email } = req.body
    let foundUser = await usersRepository.getUser({email})
    if(!foundUser) throw new CustomError ("User not found", 404, "handleNewPassRestoreRequest")
    try {
        const info = await emailService.sendRestorePasswordLink(email)
        res.json(info)
        next()
    } catch (error) {
        next(error)
    }
}

