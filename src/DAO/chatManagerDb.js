import {chatModel} from '../models/schemas.js'

class messagesManager {
    constructor(model){
        this.model = model
    }
    async getAll(){
        return await this.model.find() 
    }
    async getAllLean(){
        return await this.model.find().lean()
    }
    async createOne(user,message){
        return await this.model.create({user:user,message:message})//item must be an object
    }
}

const msgManager = new messagesManager(chatModel)

export {msgManager}