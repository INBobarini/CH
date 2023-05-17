import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const DBNAME = "ecommerce"
const MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/' + DBNAME
//mongodb+srv://Ivan:<password>@cluster0.8lq7s6v.mongodb.net/?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/ecommerce

const environment = async ()=> {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`BD conectada a ${MONGODB_CNX_STR}`)
    //let response = await productosModel.find().explain('executionStats')
    //console.log(response)
}
environment()

const productosSchema = new mongoose.Schema({
    //_id:{type:mongoose.Schema.Types.ObjectId},
    title:{type: String, required: true, index:true},
    description:{type: String, required: true},
    code:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: String, required: true},
    stock:{type: Number, required: true},
    status:{type: Boolean, required: false},
},{versionKey:false})
productosSchema.plugin(mongoosePaginate)
const productosModel = mongoose.model('productos', productosSchema) 

const cartSchema = new mongoose.Schema({
    products: 
    [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productos" //para utilizar el populate
        },
        quantity: {
            type: Number,
            required: true,
          }
    }]
},{versionKey:false});

cartSchema.plugin(mongoosePaginate)

const cartsModel = mongoose.model('carritos', cartSchema)

const chatSchema = new mongoose.Schema({
    user:{type: String, required: true}, 
    message: {type: String, required: true}
},{versionKey:false})

chatSchema.plugin(mongoosePaginate)

const chatModel = mongoose.model('chat', chatSchema)

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  role: {type: String, default: "user"},
  cart: {type: mongoose.Schema.Types.ObjectId, ref: "carritos" }
}, { versionKey: false })

const usersModel = mongoose.model('usuarios', usersSchema)

const githubUsersSchema = new mongoose.Schema({
  userLogin:{ type: String, required: true, unique: true },
  first_name:{ type: String, required: false }, 
},{ versionKey: false })

 const usersGithubModel = mongoose.model('usuariosGithub', githubUsersSchema)

export {productosModel, cartsModel, chatModel, cartSchema, usersGithubModel, usersModel}

