import mongoose from 'mongoose'

const DBNAME = "ecommerce"
const MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/' + DBNAME
//mongodb+srv://Ivan:<password>@cluster0.8lq7s6v.mongodb.net/?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/ecommerce

const environment = async ()=> {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log(`BD conectada a ${MONGODB_CNX_STR}`)
    //let response = await productosModel.find().explain('executionStats')
}
environment()

export default mongoose











