import { productsDAOMongoose } from "../DAO/DAOmongoose/productsDaoMongoose.js";

class ProductsRepository {
    constructor(dao){
        this.dao=dao
    }
    async createProduct(product){
        return await this.dao.create(product)
    }
    async getProduct(pid){
        return await this.dao.readOne({_id:pid})
    }
    async getProducts(query,limit,page,sort){
        const options = {
            page:page,
            limit:limit,
            sort:sort
        }
        return await this.dao.readMany(query, options)
    }
    async updateProduct(pid,newData){
        return await this.dao.updateOne({_id:pid}, newData)
    }
    async updateProducts(criteria,newData){
        return await this.dao.updateMany(criteria, newData)
    }
    async deleteProduct(pid){
        return await this.dao.deleteOne({_id:pid})
    }
    async deleteProducts(criteria){
        return await this.dao.deleteMany(criteria)
    }
}

export const productsRepository = new ProductsRepository(productsDAOMongoose)

