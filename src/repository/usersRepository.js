import { dao } from "../DAO/daosFactory.js";
import { logDebug, winstonLogger as logger, winstonLogger } from "../utils/winstonLogger.js";
import { createHash, isValidPassword } from "../utils.js";
import { Uuid } from "../utils/uuid.js";
import { config } from "../config/config.js";
import { CustomError } from "../models/errors/customError.js";
import { User } from "../services/DTOs.js";


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
    async createPremiumUser(user){
        user.role = "premium"
        let result = await this.dao.create(user)
        return result
    }

    async getUser(criteria){
        logger.debug(`In user repo criteria was: ${JSON.stringify(criteria)}`)
        let result = await this.dao.readOne(criteria)
        return result
    }

    async getUsers(){
        let result = await this.dao.readAllRaw()
        if(!result) return new CustomError("Users not found", 404)
        const DTOUsers = result.map(e =>  new User(e))
        return DTOUsers
    }
    async updateUser(criteria,newData){
        //TODO: verify that password is not modified this way
        let result = await this.dao.updateOne(criteria, newData) //newData = {key:value}
        return result
    }
    async updateUserPassword(criteria, newPassword){
        let user = await this.dao.readOne(criteria)
        if(!user) {
            logger.warning("User not found for resetting password")
            return null
        }
        let newEncryptedPass = createHash(newPassword)
        if(isValidPassword(user, newPassword)){//valid means that pws match
            return new CustomError("Old and new passwords match", 400)
        }
        let result = await this.dao.updateOne(user._id, {password:newEncryptedPass})
        if (result){
            return "Password changed succesfully" //maybe better a response object?
        }
        else return new CustomError("Error updating password", 500)  
    }
    async updateUserDocuments(criteria, newDocs){
        let user = await this.dao.readOne(criteria)
        let updatedDocs = newDocs.concat(user.documents)
        logger.debug(JSON.stringify(`Docs to update: ${updatedDocs}`))
        let result = await this.dao.updateOne(user._id, {documents:updatedDocs})
        return result
    }
    async deleteManyUsersByEmail(emailArray){
        let criteria = {email: {$in: emailArray}}//incompatible with DAOFS
        let result = await this.dao.deleteMany(criteria)
        return result
    }
}  

export const usersRepository = new UsersRepository(dao.users)
