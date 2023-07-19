import { DAOMongoose } from "./_DaoMongoose.js";
import { productosModel } from "../../models/productsModel.js";


class ProductsDAOMongoose extends DAOMongoose{
    constructor (model) {super(model)}
}

export const productsDAOMongoose = new ProductsDAOMongoose(productosModel)

