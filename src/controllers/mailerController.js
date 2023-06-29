import { logDebug, winstonLogger } from "../utils/winstonLogger.js"
import { emailService } from "../services/mailerService.js"
import { CustomError } from "../models/errors/customError.js"

export async function handlePostPassRecovery(req, res, next) {
    const { destinatario, mensaje } = req.body
    logDebug(winstonLogger, [{destinatario}, {mensaje}], "handleMailRecovery")
    try {
        const info = await emailService.send(destinatario, mensaje)
        
        res.json(info)
    } catch (error) {
        throw new CustomError(error, 500)
    }
}