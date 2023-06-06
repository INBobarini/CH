import {chatModel} from '../models/chatModel.js'

class messagesRepository {
    constructor(model){
        this.model = model
    }
    async getAll(){
        return await this.model.find() 
    }
    async getAllLean(){
        return await this.model.find().lean()
    }
    async createOne(user, message){
        return await this.model.create({user:user,message:message})//item must be an object
    }
}

const msgManager = new messagesRepository(chatModel)


export {msgManager as messagesRepository}