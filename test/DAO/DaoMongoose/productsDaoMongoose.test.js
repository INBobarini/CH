import mongoose from 'mongoose'
import Assert from 'assert'
import { productsDAOMongoose } from '../../../src/DAO/DaoMongoose/productsDaoMongoose.js'

//mongodb+srv://Ivan:<password>@cluster0.8lq7s6v.mongodb.net/?retryWrites=true&w=majority

const assert = Assert.strict

const productOutputFormat = {
    id: "number"||"string", 
    title: "string", 
    description: "string", 
    code: "string",
    price: "number", 
    status: "boolean",
    stock: "number",
    category: "string",
    thumbnails: "array" //of strings.
}
const productInputFormat = {
    title: "string", 
    description: "string", 
    code: "string",
    price: "number", 
    stock: "number",
    category: "string",
    thumbnails: "array" //of strings.
}

const productInput = {
    "title": "Caja de herramientas",
    "description": "Bahco",
    "code": "843hf59je",
    "price": 13000,
    "stock": 23,
    "status": true,
    "thumbnail": ["caja.jpeg","caja2.jpeg"],
    "category": "herramientas"
}

before(async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/testDb')
})

after(async()=>{

    await mongoose.connection.close()
})

//describe may be read as "when"
describe('Test productsDaoMongoose:',()=>{
    describe('Create',()=>{
        //suite: el campo code no debe repetirse
        //suite: se crea con un id unico
        //no ok, enviar con _id
        //owner default should be admin
            it('Product must be created', async()=>{ 
                let newProd1 = await productsDAOMongoose.create(productInput)
                assert.ok(newProd1,"Returned undefined or null")
            })
            it('Should not allow repeated codes', async()=>{ 
                let newProd2 = await productsDAOMongoose.create(productInput)
                assert.ok(!newProd2,"A repeated product was created and not rejected")
                assert
            })
            it('Should not use external _ids', async()=>{ 
                const pojoInputProduct = JSON.parse(JSON.stringify(productInput))
                pojoInputProduct._id = "e4g54ge77h4afafar"
                pojoInputProduct.code = "q7qh74a55ha5a5a"
                let newProd3 = await productsDAOMongoose.create(productInput)
                assert.notDeepStrictEqual(newProd3._id,pojoInputProduct._id,"Product created with an externally given _id")
            })
            it('Default owner is admin', async()=>{ 
                let newProd4 = await productsDAOMongoose.create(productInput)
                assert.ok(newProd4.owner==="admin","default owner should be admin")
            })
        //passing an empty should return an error
    })
    /* 
    describe('read',()=>{
        //devuelve todos los productos
        //devuelve por id, si no se encuentra: error not found
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
    describe('update',()=>{
        //recibe id y campo a actualizar, (parcial y completo)
        //no actualizar el id
        // 
        //verificar que no se borre el id
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
    describe('delete',()=>{
        //recibir id, eliminar producto
        describe('cuando llamo con un objeto cualquiera',()=>{
            it('devuelve el mismo objeto, plano. Sin campos ni metodos extra',()=>{
                
            })
        })
    })
    */
})

//TESTS
/*

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

