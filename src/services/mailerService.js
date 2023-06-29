import { createTransport } from 'nodemailer'
import { logDebug, winstonLogger } from '../utils/winstonLogger.js'
import { CustomError } from '../models/errors/customError.js'

class EmailService {
    #clienteNodemailer
    constructor(credencialesMail) {
        this.#clienteNodemailer = createTransport({
        service: 'gmail',
        port: 587,
        auth: credencialesMail
        })
    }
    async send(destinatario, mensaje) {
        logDebug(winstonLogger,[{destinatario},{mensaje}],"emailService,sendMethod")
        const mailOptions = {
            from: 'Enviador de mails molesto',
            to: destinatario,
            subject: 'Mail molesto!',
            text: mensaje,
        }
        try {
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            logDebug(winstonLogger, info) 
            return info
        } catch (error) {
            throw new CustomError(error, 500)
        }
    }
}
const passMailApp = 'gltlwwcfywjflsqd'
export const emailService = new EmailService(passMailApp)

        


