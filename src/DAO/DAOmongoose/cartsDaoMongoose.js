import { DAOMongoose } from "./_DaoMongoose.js";
import { cartsModel } from "../models/cartsModel.js";
import { productosModel } from "../models/productsModel.js";

class CartsDAOMongoose extends DAOMongoose{
    constructor (model) {
        super(model)
    }
    /*async addtoQuantOfProductInCart(cid,pid,extraQuantNumber){
        let updCart = await cartsModel.findOneAndUpdate(
            {_id:cid, 'products.product': pid}, 
            {$inc: { 'products.$.quantity': extraQuantNumber } },
            {new:true}
        )
        updCart = await cartsModel.findOneAndUpdate(//for removing the product if quantity<0
            {_id:cid, 'products.quantity': { $lte: 0 }}, 
            {$pull: { products: {product:pid} } },
            {new:true}
        )
    }
    async addFirstProductToCart(cid,pid){//check if it is the first
        
        return await cartsModel.findOneAndUpdate(
            {_id:cid}, 
            {$push: { products: {product:pid,quantity:1} } }, 
            {new: true}
        )
    }
    */
}

export const cartsDAOMongoose = new CartsDAOMongoose(cartsModel)

//TESTS


//CREATE
//let newCart = await cartsDAOMongoose.create({products:[]})
//console.log("Created: " + JSON.stringify(newCart))
//READ
//let foundCart = await cartsDAOMongoose.readOne({_id:"647e16034b631d2deb87f003"})
//console.log("Found:" + JSON.stringify(foundCart))
//AUXILIAR: BUSCAR UN PRODUCTO
//import { productsDAOMongoose } from "./productsDAOMongoose.js";
//let foundProd = await productsDAOMongoose.read()
//let idOfFirstProd = foundProd.docs[0]._id
//UPDATE
/*
let updCart = await cartsDAOMongoose.updateOne(
    {_id:"647e16034b631d2deb87f003"},
    { $push: {
        products:{product:"647def660b150074569b5649", quantity:4}
    }},
    {new:true}
)
console.log("Updated: " + JSON.stringify(updCart))
*/
//DELETE
//let delCart = await cartsDAOMongoose.deleteOne({_id:"647e16034b631d2deb87f003"})
//console.log("Deleted: " + JSON.stringify(delCart))


//cartsDAOMongoose.addtoQuantOfProductInCart("647df66830ffde29f2c57d92","647def660b150074569b5649",-1)
//cartsDAOMongoose.addFirstProductToCart("647df66830ffde29f2c57d92","647def660b150074569b5649")




