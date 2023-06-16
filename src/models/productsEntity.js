import { v4 as uuid } from 'uuid';
export default class ProductEntity {
    constructor(product){
        this._id = uuid(),
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.thumbnail = product.thumbnail,
        this.code = product.code,
        this.stock = product.stock
    }
    #types = {
        _id: String,
        title: String,
        description: String, 
        price: Number,
        thumbnail: String,
        code: String,
        stock: Number
    }
    #required = {
        _id: false,
        title: true,
        description: true, 
        price: true,
        thumbnail: true,
        code: true,
        stock: true
    }

    checkTypes(){//incomplete, move to a parent class
        if (this.#types){}
    }
}