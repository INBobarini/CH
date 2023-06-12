import { cartsDAOMongoose } from "../DAO/DaoMongoose/cartsDAOmongoose.js";

class CartsRepository{
    constructor(dao){
        this.dao=dao
    }
    async createCart(){//require user in arg?
        let element = {}
        return await this.dao.create(element)
    }
    async getCart(cid){
        return await this.dao.readOne({_id:cid})
    }
    async getCarts(query,paginationOpts){
        return await this.dao.readMany(query,paginationOpts)
    }

    async updateCart(cid,prodsArrayInCart){//empties
        //if(this.dao="mongoose"||"fs")
        let result = await this.dao.updateOne(
            {_id:cid},
            {$pull:{products:{}}}
        )
        if(!prodsArrayInCart){return result} 
        result = await this.dao.updateOne(
            {_id:cid},
            {$push:{products:prodsArrayInCart}}
        )
        return result
    }
    async deleteCart(cid){
        return await this.dao.deleteOne({_id:cid})
    }
}
export const cartsRepository = new CartsRepository(cartsDAOMongoose)

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
