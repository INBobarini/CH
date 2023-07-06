import { dao } from "../DAO/daosFactory.js";
import { CustomError } from "../models/errors/customError.js";
import { winstonLogger as logger } from "../utils/winstonLogger.js";
import { config } from '../config/config.js'


class ResetPwRequestsRepository {
    constructor(dao){
        this.dao=dao
    }
    async createResetPasswordLink(email){
        let resetPasswordRequest = await this.dao.create({email:email})
        //let code = new Uuid().toString()
        //let resetPasswordlink = config.baseUrl + "restore/" + code
        /*
        let resetRequest = {
            code: code,
            email: email,
            expireDate: new Date(Date.now() + 3600000),
            used: false
        }
        */
        //this.#resetPasswordRequests.unshift(resetRequest) //using unshift instead of push allows later to find the newest request first
        //console.log(this.#resetPasswordRequests)
        let code = resetPasswordRequest.code
        let urlString = config.baseUrl + "restore/" + code
        let htmlString = `<html><body><a href="${urlString}">${urlString}</a></body></html>`
        return htmlString
    }
    async verifyResetPasswordRequest(code){
        logger.debug(`In verifyResetPasswordRequest code was: ${code}`)
        /*let i = this.#resetPasswordRequests.findIndex(e=>e.code===code)
        if (i===-1) {
            return new CustomError(`Reset request not found`, 404, "verifyResetPasswordRequest")
        }
        let foundResetRequest = this.#resetPasswordRequests[i]
        */
        
        let foundResetRequest = await this.dao.readOne({code:code})
        let remainingTime = Number(new Date(foundResetRequest.expireDate).getTime()) - Number(new Date())
        console.log(foundResetRequest.expireDate)
        if (remainingTime < 0) {
            return new CustomError(`Reset request expired`, 498)
        }
        if (foundResetRequest.used)
            return new CustomError(`Reset request was used`, 409)
        
        return foundResetRequest.email
    }
    async markLinkasUsed(code){
        //let i = this.#resetPasswordRequests.findIndex(e=>e.code===code)
        //this.#resetPasswordRequests[i].used = true
        let foundResetRequest = await this.dao.readOne({code:code})

        let updatedRequest = await this.dao.updateOne({_id:foundResetRequest._id}, {used:true})
        return updatedRequest
    }
    async getEmailFromCode(code){
        //let foundResetRequest = this.#resetPasswordRequests.find(e=>e.code===code)
        let foundResetRequest = await this.dao.readOne({code:code})
        return foundResetRequest.email
    }

}

export const resetPwRequestsRepository = new ResetPwRequestsRepository(dao.resetPWRequests)