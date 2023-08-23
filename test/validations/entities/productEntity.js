import { v4 as uuid } from 'uuid';
import * as entityValidator from '../testUtils.js'

class ProductRequiredFieldsVerification {
    required = {
        title: true,
        description: true, 
        price: true,
        //thumbnail: true,
        code: true,
        stock: true,
        owner: true 
    } 
    constructor(product){
        this.okRequires =  entityValidator.required(product, this.required) 
    }
}

class ProductFieldTypesVerification {
    types = {
        title: "string",
        description:  "string", 
        price: "number",
        //thumbnail: "array",
        code:  "string",
        stock: "number",
        owner: "string"
    }
    constructor(product){
        this.okTypes =  entityValidator.types(product, this.required, this.types)
    }
}
export const productsVerifications = {
    Mandatory: ProductRequiredFieldsVerification,
    Types: ProductFieldTypesVerification
}
