import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/ecommerce'
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
    products: /*{
        type:Array,
        default:[],
        ref:"productos"
    }*/
    
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

export {productosModel, cartsModel, chatModel, cartSchema}

