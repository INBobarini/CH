import { logDebug, winstonLogger } from "../utils/winstonLogger.js"
import { emailService } from "../services/mailerService.js"
import { CustomError } from "../models/errors/customError.js"

export async function handleGetPassRestore(req, res, next) {
    let link = req.params.uuid
    try {
        //let confirmedLink = await linksRepository.get({uuid:link})
        //if (!confirmedLink) = throw new CustomError("Link wrong or expired")
        logDebug(winstonLogger,[req.params.uiid],)
        next()
    } catch (error) {
        next( new CustomError(error, 500) )
    }
}

export async function handlePostPassRestore(req, res, next) {
    const { email } = req.body
    //TODO verify if the mail exists in the userdb
    try {
        const info = await emailService.sendRestorePasswordLink(email)
        res.json(info)
        next()
    } catch (error) {
        next( new CustomError(error, 500) )
    }
}

export async function handlePutPassRestore(req, res, next) {
    const { email } = req.body
    try {
        const info = await users
        res.json(info)
        next()
    } catch (error) {
        next( new CustomError(error, 500) )
    }
}