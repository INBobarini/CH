import {productosModel} from '../models/schemas.js'

class productsManager{
    constructor(model){
        this.model = model
    }
    async getAll(limit,page,query,sort){//implementar el sort
        //const sortCriteria = {};
        //sortCriteria["price"] = sort == "asc" ? -1 : 1
        
        let result = await this.model.paginate(
            {status:true||query}, //no entendí que hacer con el query,  
            {limit:limit??10, page:page||1 /*, sort:sortCriteria*/}
        )
        result = JSON.stringify(result, null, '\t') 
        result = JSON.parse(result)
        return result
    }
    async getAllLean(limit,page,query,sort){//en desuso
        return await this.model.find().lean()
    }
    async getFirstN(number){//en desuso
        return await this.model.find().skip(number).exec()
    }
    async getOneById(pid){
        let product = await this.model.findById({_id:pid})
        product = JSON.parse(JSON.stringify(product, null, '\t'))
        return product
    }
    async createOne(item){
        return await this.model.create(item)//item must be an object
    }
    async updateOne(pid,data){
        return await this.model.updateOne({_id:pid},data)
    }
    async deleteOne(pid){
        return await this.model.deleteOne({_id:pid})
    }
}

const pManager = new productsManager(productosModel)

export {pManager};