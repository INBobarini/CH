import { DAOMongoose } from "./_DaoMongoose.js";
import { cartsModel } from "../../models/cartsModel.js";
import { productosModel } from "../../models/productsModel.js";

class CartsDAOMongoose extends DAOMongoose{
    constructor (model) {
        super(model)
    }
}

export const cartsDAOMongoose = new CartsDAOMongoose(cartsModel)

//TESTS


//CREATE
//let newCart = await cartsDAOMongoose.create({products:[]})
//console.log(newCart)
//READ
//let foundCart = await cartsDAOMongoose.readOne({_id:"648211fefb26aecfb5937403"})
//console.log(foundCart)
//let foundCarts = await cartsDAOMongoose.readMany()
//console.log(foundCarts)
//AUXILIAR: BUSCAR UN PRODUCTO
//import { productsDAOMongoose } from "./productsDAOMongoose.js";
//let foundProd = await productsDAOMongoose.read()
//let idOfFirstProd = foundProd.docs[0]._id
//UPDATE
/*
let updCart = await cartsDAOMongoose.updateOne(
    {_id:"648211fefb26aecfb5937403"},
    { $push: {
        products:{product:"647def660b150074569b5649", quantity:4}
    }},
    {new:true}
)
console.log(updCart)
*/
//DELETE
//let delCart = await cartsDAOMongoose.deleteOne({_id:"648211fefb26aecfb5937403"})
//console.log(delCart)





