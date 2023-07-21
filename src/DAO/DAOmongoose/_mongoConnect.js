import mongoose from 'mongoose'
import {config} from '../../config/config.js'


const MONGODB_CNX_STR = config.mongoUrl
//mongodb+srv://Ivan:<password>@cluster0.8lq7s6v.mongodb.net/?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/ecommerce

const environment = async ()=> {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`BD conectada a ${MONGODB_CNX_STR}`)
    //let response = await productosModel.find().explain('executionStats')
}
environment()

export default mongoose











