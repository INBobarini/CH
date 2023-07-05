import { createTransport } from 'nodemailer'
import { logDebug, winstonLogger } from '../utils/winstonLogger.js'
import { Uuid } from '../utils/uuid.js'
import { config } from '../config/config.js'
import { usersRepository } from '../repository/usersRepository.js'
import { CustomError } from '../models/errors/customError.js'

class EmailService {
    #clienteNodemailer
    constructor(senderEmail, emailCredentials) {
        this.#clienteNodemailer = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: senderEmail,
            pass: emailCredentials}
        })
    }
    async sendRestorePasswordLink(email) {//TODO check if there is an active request
        try {
            const restoreLink = await usersRepository.createResetPasswordLink(email) //prolly better use the routerdictionary
            //localhost:8080/api/sessions/restore/53803b9a-cd3b-4ba5-a5e6-0113751085a1
            let htmlString = `<html><body><a href="${restoreLink}">${restoreLink}</a></body></html>`
            const mailOptions = {
                from: 'ecommerce CH',
                to: email,
                subject: 'Password restore',
                html: htmlString,
                attachments:[]
            }
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            return info
        } catch (error) {
            return error
        }
    }
}
export const emailService = new EmailService(config.SMTP_EMAIL,config.SMTP_CREDENTIALS)

        


