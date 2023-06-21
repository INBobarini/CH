import { v4 as uuid } from 'uuid';
import * as valueValidator from '../validations/_singleValueValidation.js'
import {productVerification} from '../validations/_IdExistsVerification.js'

export default class CartEntity {
    constructor(){
        this.products = []
    }
    addProductToCart(prodQuantObj){//{product:_idProduct, quantity}
        let vProdQuantObj = valueValidator.positiveInteger(prodQuantObj.quantity,"quantity")
        productVerification.checkById(prodQuantObj.product)
        return this.products.push(vProdQuantObj)
        //set up a validator for input type
    }
}
const cart = new CartEntity()
