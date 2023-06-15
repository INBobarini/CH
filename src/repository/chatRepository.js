import {chatModel} from '../models/chatModel.js'

class MessagesRepository {
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

export const messagesRepository = new MessagesRepository(chatModel)
//make a DAO for chat??