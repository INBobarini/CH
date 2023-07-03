import { dao } from "../DAO/daosFactory.js";
import { logDebug, winstonLogger as logger, winstonLogger } from "../utils/winstonLogger.js";
import { createHash, isValidPassword } from "../utils.js";
import { Uuid } from "../utils/uuid.js";
import { config } from "../config/config.js";
import { CustomError } from "../models/errors/customError.js";

class UsersRepository { //TODO: create a generic repo integrating the logs, then extend it
    #stage = "Users_Repo"
    #resetPasswordRequests = []
    constructor(dao){
        this.dao = dao
    }
    async createUser(user){
        let result = await this.dao.create(user)
        return result
    }
    async getUser(criteria){
        logger.debug(`In user repo criteria was: ${JSON.stringify(criteria)}`)
        let result = await this.dao.readOne(criteria)
        return result
    }
    async updateUser(criteria,newData){
        //TODO: verify that password is not modified this way
        let result = await this.dao.updateOne({criteria}, newData) //newData = {key:value}
        return result
    }
    async updateUserPassword(criteria, newPassword){
        let user = await this.dao.readOne(criteria)
        if(!user) {
            logger.warning("User not found for resetting password")
            return null
        }
        let newEncryptedPass = createHash(newPassword)
        if(isValidPassword(user, newPassword)){//valid means that pw match
            throw new CustomError("New and old passwords match",400,"updateUserPassword")
        }
        let result = await this.dao.updateOne(user._id, {password:newEncryptedPass})
        return result
    }
    async createResetPasswordLink(email){
        let code = new Uuid().toString()
        let resetPasswordlink = config.baseUrl + "api/auth/restore/" + code
        let resetRequest = {   //this could be a schema/model if used again
            code: code,
            email: email,
            expireDate: new Date(Date.now() + 3600000),
            used: false
        }
        this.#resetPasswordRequests.unshift(resetRequest) //using unshift instead of push allows later to find the newest request first
        console.log(this.#resetPasswordRequests)
        return resetPasswordlink
    }
    async verifyResetPasswordRequest(code){
        let i = this.#resetPasswordRequests.findIndex(e=>e.code===code)
        if (i===-1) {
            throw new CustomError(`Reset request not found`, 404, "verifyResetPasswordRequest")
        }
        let foundResetRequest = this.#resetPasswordRequests[i]
        let remainingTime = foundResetRequest.expireDate - new Date()
        if (remainingTime < 0) {
            throw new CustomError(`Reset request expired`, 498)
        }
        if (foundResetRequest.used)
            throw new CustomError(`Reset request was used`, 409)
        
        this.#resetPasswordRequests[i].used = true
        return foundResetRequest.email
    }
    async getResetPassRequestFromCode(code){
        
        let foundResetRequest = this.#resetPasswordRequests.find(e=>e.code===code)
        return foundResetRequest
    }
}

export const usersRepository = new UsersRepository(dao.users)
