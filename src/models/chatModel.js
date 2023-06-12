import mongoose from '../DAO/DaoMongoose/_mongoConnect.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const chatSchema = new mongoose.Schema({
    user:{type: String, required: true}, 
    message: {type: String, required: true}
},{versionKey:false})

chatSchema.plugin(mongoosePaginate)

const chatModel = mongoose.model('chat', chatSchema)

export {chatSchema,chatModel}
