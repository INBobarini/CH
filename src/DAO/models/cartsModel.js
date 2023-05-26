import mongoose from './_mongoConnect.js'
import mongoosePaginate from 'mongoose-paginate-v2'

export const cartSchema = new mongoose.Schema({
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

export const cartsModel = mongoose.model('carritos', cartSchema)