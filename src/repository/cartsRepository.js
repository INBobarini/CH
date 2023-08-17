import { dao } from "../DAO/daosFactory.js";
import { logDebug, winstonLogger as logger } from "../utils/winstonLogger.js";

class CartsRepository{
    #stage = "Carts_Repo"
    constructor(dao){
        this.dao=dao
    }
    async createCart(){
        let element = {}
        let result = await this.dao.create(element)
        logDebug(logger, [element], this.#stage)
        return result
    }
    
    async getCart(cid){
        let result = await this.dao.readOne({_id:cid})
        logDebug(logger, [cid], this.#stage)
        return result
    }

    async getCartWithPopulatedProducts(cid){
        let result =  await this.dao.readOnePopulated({_id:cid})
        return result
    }

    async getCarts(query, paginationOpts){
        let result = await this.dao.readManyPaginated(query,paginationOpts)
        logDebug(logger, [query,paginationOpts], this.#stage)
        return result
    }

    async updateCart(cid, prodsArrayInCart){
        let result = await this.dao.updateOne(
            {_id:cid},
            {$pull:{products:{}}}
        )
        if(!prodsArrayInCart){return result} 
        result = await this.dao.updateOne(
            {_id:cid},
            {$push:{products:prodsArrayInCart}}
        )
        logDebug(logger, [cid, prodsArrayInCart], this.#stage)
        return result
    }
    async deleteCart(cid){
        let result =  await this.dao.deleteOne({_id:cid})
        logDebug(logger, [cid], this.#stage)
        return result
    }
}
export const cartsRepository = new CartsRepository(dao.carts)

//TESTS

//CREATE
//console.log(await cartsRepository.createCart())
//READ
//console.log(await cartsRepository.getCart("647df66830ffde29f2c57d92"))
//console.log(await cartsRepository.getCarts())
//UPDATE
/*
cartsRepository.updateCart("647df66830ffde29f2c57d92",
    [
        {product:"646e34fcdaf88eafb79b743b", quantity:15},
        {product:"646e34fcdaf88eafb79b7437", quantity:3}
    ]
)
*/
//DELETE
//console.log(await cartsRepository.deleteCart("647df66830ffde29f2c57d92"))
