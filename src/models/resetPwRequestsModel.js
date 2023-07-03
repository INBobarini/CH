/*import mongoose from '../DAO/DaoMongoose/_mongoConnect.js'

const resetRequestsSchema = new mongoose.Schema({
    //_id:{type:mongoose.Schema.Types.ObjectId},
    code:{type: String, required: true},
    email:{type: String, required: true, index:true},
    expireDate:{type: Date, default : new Date(Date.now() + 3600000)},
    used: {type: Boolean, default: false}
    
},{versionKey:false})

export const resetRequestsModel = mongoose.model('resetRequests', resetRequestsSchema) */