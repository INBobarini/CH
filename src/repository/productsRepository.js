import { dao } from "../DAO/daosFactory.js";
import { CustomError } from "../models/errors/customError.js";
import {  winstonLogger as logger } from "../utils/winstonLogger.js";


class ProductsRepository { //create a generic repo integrating the logs, then extend it
    #stage = "Products_Repo"
    constructor(dao){
        this.dao=dao
    }
    async createProduct(product){
        let result = await this.dao.create(product)
        
        return result
    }
    async getProduct(pid){
        if(!pid) { new CustomError("pid not received in productsRepo", 400)}
        let result = await this.dao.readOne({_id:pid})
        
        return result
    }
    async getManyProductsByIds(pids){
        let result = await this.dao.readMany({_id:{$in: pids}})
        
        return result
    }
    async getProducts(query,limit,page,sort){
        const options = {
            page:page||1,
            limit:limit||10,
            sort:sort||{}
        }
        let result = await this.dao.readMany(query, options)
        
        return result
    }
    async updateProduct(pid,newData){
        let result = await this.dao.updateOne({_id:pid}, newData) //newData = {key:value}
        
        return result
    }
    async updateProducts(criteria,newData){
        let result = await this.dao.updateMany(criteria, newData)
        
        return result
    }
    async updateMultipleProducts(arrProducts){
        let updates = arrProducts.map(((p)=>{
            let filter = {_id: p._id}
            let update = {$set: p}
            return {filter, update}
        }))
        let result = await this.dao.updateManyWithDifferentData(updates)
        
        return result
    }
       
    async deleteProduct(pid){
        let result =  await this.dao.deleteOne({_id:pid})
        return result
    }
    async deleteProducts(criteria){
        let result = await this.dao.deleteMany(criteria)
        
        return result
    }
}

export const productsRepository = new ProductsRepository(dao.products)

//UPDATE MULTIPLE SETS
/*
const upd = [{
            _id: "6483898895d70999f8d6c1e5",
            stock: 10
        },{
            _id: "6483898895d70999f8d6c1e6",
            stock: 10
        }
    ]

    await productsRepository.updateMultipleProducts(upd)
*/
