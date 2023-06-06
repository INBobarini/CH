import { DAOMongoose } from "./_DaoMongoose.js";
import { productosModel } from "../models/productsModel.js";


class ProductsDAOMongoose extends DAOMongoose{
    constructor (model) {super(model)}
}

export const productsDAOMongoose = new ProductsDAOMongoose(productosModel)

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
console.log(newProd)
*/

//let foundProd = await productsDAOMongoose.readOne({_id:"647e0f9362fe03146f5a8147"})
//console.log(foundProd)
//let products = await productsDAOMongoose.readMany({_id:"647e0f9362fe03146f5a8147"})
//console.log(products.docs)

//let updProd = await productsDAOMongoose.updateOne({_id:"647e0f9362fe03146f5a8147"},{price: 10000,stock:5})
//console.log(updProd)

//let delProd = await productsDAOMongoose.deleteOne({_id:"647e0f9362fe03146f5a8147"})
//console.log(delProd)

