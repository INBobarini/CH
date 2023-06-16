import { v4 as uuid } from 'uuid';
export default class CartEntity {
    constructor(){
        this.products = []
    }
    addProductToCart(prodQuantObj){//{product:_idProduct, quantity}
        return this.products.push(prodQuantObj)
        //set up a validator for input type
    }
}