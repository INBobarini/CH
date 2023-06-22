import mongoose from '../DAO/DaoMongoose/_mongoConnect.js'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Uuid } from '../utils/uuid.js'

const ticketsSchema = new mongoose.Schema({
    //_id:{type:mongoose.Schema.Types.ObjectId},
    code:{type: String, unique: true, default: new Uuid().uuid},//autogenerarse y ser único
    amount: {type: Number, required: true},
    purchaser:{type: String, required: true}//email
}, {versionKey:false,timestamps:{createdAt:'purchase_datetime'}}
)

ticketsSchema.plugin(mongoosePaginate)

export const ticketsModel = mongoose.model('tickets', ticketsSchema) 

//TEST
/*
const ticket = {
    amount:5,
    purchaser:"inbobarini@gmail.com"
}
*/
//let result = await ticketsModel.create(ticket)
//console.log(result)

//let result = await ticketsModel.find()
//console.log(result) 

