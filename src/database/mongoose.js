import mongoose from 'mongoose'

const MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/ecommerce'
//'mongodb+srv://ivan:@cluster0.zgagt.mongodb.net/?retryWrites=true&w=majority'


await mongoose.connect(MONGODB_CNX_STR)
console.log(`BD conectada a ${MONGODB_CNX_STR}`)

const productosSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    code:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: String, required: true},
    stock:{type: Number, required: true},
    status:{type: Boolean, required: true},
},{versionKey:false})

const productosModel = mongoose.model('productos', productosSchema) 

export {productosModel}