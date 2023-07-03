import mongoose from '../DAO/DaoMongoose/_mongoConnect.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    role: {type: String, default: "user"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carritos" }
}, { versionKey: false })

usersSchema.plugin(mongoosePaginate)
export const usersModel = mongoose.model('usuarios', usersSchema)
  
const githubUsersSchema = new mongoose.Schema({ //TODO MIX with DTO?
    userLogin:{ type: String, required: true, unique: true },
    first_name:{ type: String, required: false },
    role: {type: String, default: "user"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carritos" } 
},{ versionKey: false })

githubUsersSchema.plugin(mongoosePaginate)
export const usersGithubModel = mongoose.model('usuariosGithub', githubUsersSchema)

const resetRequestsSchema = new mongoose.Schema({
    code:{type: String, required: true},
    email:{type: String, required: true, index:true},
    expireDate:{type: Date, default : new Date(Date.now() + 3600000)},
    used: {type: Boolean, default: false}
    
},{versionKey:false})

export const resetRequestsModel = mongoose.model('resetRequests', resetRequestsSchema) 