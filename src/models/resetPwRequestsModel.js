import mongoose from '../DAO/DaoMongoose/_mongoConnect.js'
import { Uuid } from '../utils/uuid.js'

const resetRequestsSchema = new mongoose.Schema({
    //_id:{type:mongoose.Schema.Types.ObjectId},
    code:{type: String, default:  new Uuid().toString()},
    email:{type: String, required: true, index:true},
    expireDate:{type: Date, default : new Date(Date.now() + 3600000)},
    used: {type: Boolean, default: false}
    
},{versionKey:false})

resetRequestsSchema.index({ expireDate: -1 }) //for finding the most recent when getting one

export const resetPWRequestModel = mongoose.model('resetRequests', resetRequestsSchema) 