import { dao } from "../DAO/daosFactory.js";
import { logDebug, winstonLogger as logger } from "../utils/winstonLogger.js";


class ProductsRepository { //create a generic repo integrating the logs, then extend it
    #stage = "Products_Repo"
    constructor(dao){
        this.dao=dao
    }
    async createProduct(product){
        let result = await this.dao.create(product)
        logDebug(logger, [product], this.#stage)
        return result
    }
    async getProduct(pid){
        console.log(pid)
        let result = await this.dao.readOne({_id:pid})
        logDebug(logger, [pid], this.#stage)
        return result
    }
    async getManyProductsByIds(pids){
        let result = await this.dao.readMany({_id:{$in: pids}})
        logDebug(logger, [pids], this.#stage)
        return result
    }
    async getProducts(query,limit,page,sort){
        const options = {
            page:page||1,
            limit:limit||10,
            sort:sort||{}
        }
        let result = await this.dao.readMany(query, options)
        logDebug(logger, [query,limit,page,sort], this.#stage)
        return result
    }
    async updateProduct(pid,newData){
        let result = await this.dao.updateOne({_id:pid}, newData) //newData = {key:value}
        logDebug(logger, [pid,newData], this.#stage)
        return result
    }
    async updateProducts(criteria,newData){
        let result = await this.dao.updateMany(criteria, newData)
        logDebug(logger, [criteria,newData], this.#stage)
        return result
    }
    async updateMultipleProducts(arrProducts){
        let updates = arrProducts.map(((p)=>{
            let filter = {_id: p._id}
            let update = {$set: p}
            return {filter, update}
        }))
        let result = await this.dao.updateManyWithDifferentData(updates)
        logDebug(logger, [arrProducts], this.#stage)
        return result
    }
       
    async deleteProduct(pid){
        let result =  await this.dao.deleteOne({_id:pid})
        logDebug(logger, [pid], this.#stage)
        return result
    }
    async deleteProducts(criteria){
        let result = await this.dao.deleteMany(criteria)
        logDebug(logger, [criteria], this.#stage)
        return result
    }
}

export const productsRepository = new ProductsRepository(dao.products)
