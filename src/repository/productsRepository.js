import { dao } from "../DAO/daosFactory.js";

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
    async getManyProductsByIds(pids){
        return await this.dao.readMany({_id:{$in: pids}})
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
        return await this.dao.updateOne({_id:pid}, newData) //newData = {key:value}
    }
    async updateProducts(criteria,newData){
        return await this.dao.updateMany(criteria, newData)
    }
    async updateMultipleProducts(arrProducts){
        let updates = arrProducts.map(((p)=>{
            
            let filter = {_id: p._id}
            let update = {$set: p}
            
            return {filter, update}
        }))
        return await this.dao.updateManyWithDifferentData(updates)
    }
    
      
    async deleteProduct(pid){
        return await this.dao.deleteOne({_id:pid})
    }
    async deleteProducts(criteria){
        return await this.dao.deleteMany(criteria)
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
