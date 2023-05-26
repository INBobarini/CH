import mongoose from './_mongoConnect.js'
import mongoosePaginate from 'mongoose-paginate-v2'

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

export const productosModel = mongoose.model('productos', productosSchema) 