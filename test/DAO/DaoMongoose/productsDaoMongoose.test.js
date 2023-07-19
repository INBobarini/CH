import mongoose from 'mongoose'
import {productosModel} from '../../../src/models/productsModel.js'
import Assert from 'assert'
import DAOMongoose from '../../../src/DAO/DaoMongoose/_DaoMongoose.js'
import ProductEntity from '../../../src/models/entities/productsEntity.js'


//mongodb+srv://Ivan:<password>@cluster0.8lq7s6v.mongodb.net/?retryWrites=true&w=majority

const assert = Assert.strict

const testProductsSchema = new mongoose.Schema({
    //_id:{type:mongoose.Schema.Types.ObjectId},
    title:{type: String, required: true, index:true},
    description:{type: String, required: true},
    code:{type: String, required: true},
    price:{type: Number, required: true},
    thumbnail:{type: [String], required: true},
    stock:{type: Number, required: true},
    category: {type: String},
    status:{type: Boolean, required: false, default: true},
    owner: {type: String}
},{versionKey:false})

const productOutputFormat = {
    id: number||string, 
    title: string, 
    description: string, 
    code: string,
    price: number, 
    status: boolean,
    stock: number,
    category: string,
    thumbnails: array //of strings.
}
const productInputFormat = {
    title: string, 
    description: string, 
    code: string,
    price: number, 
    stock: number,
    category: string,
    thumbnails: array //of strings.
}

before(async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/testDb')
})

after(async()=>{
    await mongoose.connection.close(testProductsSchema())
})

//describe may be read as "when"
describe('dao mongoose',()=>{
    describe('create',()=>{
        //suite: el campo code no debe repetirse
        //suite: se crea con un id unico
        //no ok, enviar con _id
        //owner default should be admin
        describe('',()=>{
            it('',()=>{ 
                let productDao = new DAOMongoose()
            })
        })
    })
    describe('read',()=>{
        //devuelve todos los productos
        //devuelve por id, si no se encuentra: error not found
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
    describe('update',()=>{
        //recibe id y campo a actualizar, actualizar el id
        //verificar que no se borre el archivo
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
    describe('delete',()=>{
        //recibir id, eliminarlo
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
})

//TESTS
/*
let newProd = await productsDAOMongoose.create(
    {
        "title": "Caja de herramientas",
        "description": "Bahco",
        "code": "843hf59je",
        "price": 13000,
        "stock": 23,
        "status": true,
        "thumbnail": "caja.jpeg"
      }
)
//console.log(newProd)
*/

//let foundProd = await productsDAOMongoose.readOne({_id:"647e0f9362fe03146f5a8147"})
//console.log(foundProd)
//let products = await productsDAOMongoose.readMany({},{})
//console.log(products)

//let updProd = await productsDAOMongoose.updateOne({_id:"647e0f9362fe03146f5a8147"},{price: 10000,stock:5})
//console.log(updProd)

//let delProd = await productsDAOMongoose.deleteOne({_id:"647e0f9362fe03146f5a8147"})
//console.log(delProd)

