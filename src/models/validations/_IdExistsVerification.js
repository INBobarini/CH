//import { productsRepository } from "../../repository/productsRepository.js"
import { customError } from "../errors/errorsDictionary.js"

class idVerification{
    constructor(arrayCollection){
        this.collection = arrayCollection 
    }
    async checkById(_id){
        let found = this.collection.find( (e)=>{ return e._id===_id})
        //if (!found) throw new customError.NotFoundError(`${_id} not found`)
    }
}

//export const productVerification = new idVerification(await productsRepository.getProducts())

