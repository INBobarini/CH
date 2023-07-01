import { createTransport } from 'nodemailer'
import { logDebug, winstonLogger } from '../utils/winstonLogger.js'
import { Uuid } from '../utils/uuid.js'
import { config } from '../config/config.js'

class EmailService {
    #clienteNodemailer
    constructor(credencialesMail) {
        this.#clienteNodemailer = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user:"inbobarini@gmail.com",
            pass: credencialesMail}
        })
    }
    async sendRestorePasswordLink(destinatario) {
        const restoreLink = config.baseUrl + "api/auth/restore/" + new Uuid() //prolly better use the routerdictionary
        //change so it creates a schema, restorePassLinks.create(uuid,email,date, used)
        //localhost:8080/api/sessions/restore/53803b9a-cd3b-4ba5-a5e6-0113751085a1
        let htmlString = `<html><body><a href="${restoreLink}">${restoreLink}</a></body></html>`
       
        // const newToken = restorePassRequests.create(destinatario, uniqueLink)
        const mailOptions = {
            from: 'ecommerce CH',
            to: destinatario,
            subject: 'Password restore',
            html: htmlString,
            attachments:[]
        }
        try {
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            return info
        } catch (error) {
            return error
        }
            
    }
}
const passMailApp = 'gltlwwcfywjflsqd'
export const emailService = new EmailService(passMailApp)

        


