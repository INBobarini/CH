import { createTransport } from 'nodemailer'
import { config } from '../config/config.js'
import { usersRepository } from '../repository/usersRepository.js'
import { resetPwRequestsRepository } from '../repository/resetPWrequestsRepository.js'
import { winstonLogger as logger} from '../utils/winstonLogger.js'
import { CustomError } from '../models/errors/customError.js'

class EmailService {
    #clienteNodemailer
    #cbErrorInfo
    constructor(senderEmail, emailCredentials) {
        this.#clienteNodemailer = createTransport({
        service: 'gmail',//TODO ENV THIS
        port: 587, //TODO ENV THIS
        auth: {
            user: senderEmail,
            pass: emailCredentials}
        })
        this.#cbErrorInfo = (error, info) =>{
            if (error) new CustomError(error, 500, "NodemailerCB")
            else {
                logger.warning(`Rejected recipients: ${info.rejected}`)
                logger.info(`Pending recipients: ${info.pending}`)
            } 
        }
    }
    async sendRestorePasswordLink(email) {//TODO check if there is an active request
        try {
            logger.debug(`In mailerService, sendRestorePasswordLink, email was: ${email}`)
            const htmlString = await resetPwRequestsRepository.createResetPasswordLink(email) //prolly better use the routerdictionary
            //localhost:8080/api/sessions/restore/53803b9a-cd3b-4ba5-a5e6-0113751085a1
            const mailOptions = {
                from: 'ecommerce CH',
                to: email,
                subject: 'Password restore',
                html: htmlString,
                attachments:[]
            }
            const result = await this.#clienteNodemailer.sendMail(mailOptions)
            return result
        } catch (error) {
            return error
        }
    }
    async sendAccountDeletionNotice(email){
        try {
            const message = `Your account was deleted due to inactivity. Greetings`
            const mailOptions = {
                from: 'ecommerce CH',
                to: email,
                subject: 'Account deletion notice',
                text: message,
                attachments:[]
            }
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            return info
        } catch (error) {
            return new CustomError(`Nodemailer ${error}`, 500)
        }
    }
    async sendProductRemotionNotice(email, productName){
        //call this when deleting a premium user's product
        try {
            const message = `${email}, your ${productName} was deleted.`
            const mailOptions = {
                from: 'ecommerce CH',
                to: email,
                subject: 'Your product was deleted',
                text: message,
                attachments:[]
            }
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            return info
        } catch (error) {
            return new CustomError(`Nodemailer ${error}`, 500)
        }
    }
}

export const emailService = new EmailService(config.SMTP_EMAIL,config.SMTP_CREDENTIALS)

        


