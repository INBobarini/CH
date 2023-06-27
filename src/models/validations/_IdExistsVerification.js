//import { productsRepository } from "../../repository/productsRepository.js"
import { CustomError } from "../errors/customError.js"

export class IdVerification{
    constructor(arrayCollection){
        this.collection = arrayCollection 
    }
    async checkById(_id){
        let found = this.collection.find( (e)=>{ return e._id===_id})
        if (!found) throw new CustomError(`${_id} not found`, 404)
    }
}

 

