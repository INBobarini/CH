import { v4 as uuid } from 'uuid';
import * as entityValidator from '../validations/_entityValidation.js'

export default class ProductEntity {
    #required = {
        _id: false,
        title: true,
        description: true, 
        price: true,
        thumbnail: true,
        code: true,
        stock: true   
    } 
    #types = {
        _id: "string",
        title: "string",
        description:  "string", 
        price: "number",
        thumbnail:"string",
        code:  "string",
        stock: "number"
    }
    
    constructor(product){
        let vProduct =  entityValidator.required(product, this.#required)
        vProduct =  entityValidator.types(product, this.#required, this.#types)
        this._id = {$oid:uuid()},
        this.title = vProduct.title,
        this.description = vProduct.description,
        this.price = vProduct.price,
        this.thumbnail = vProduct.thumbnail,
        this.code = vProduct.code,
        this.stock = vProduct.stock
    }
}
/*
let product = 
    {
        title: "Mesa de comedor",
        description: "Madera maciza",
        code: "843he59jd",
        price: 2000,
        stock: 6,
        status: true,
        thumbnail: "dining_table.jpeg"
    }
let result = new ProductEntity(product)
//console.log(result)
*/
