import { v4 as uuid } from 'uuid';

export default class UserEntity {
    constructor(user){
        this._id = uuid()
        this.email = user.title
        this.password = user.password
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.age = user.age
        this.role = user.role ?? "user"
        this.cart = user.cart
    }
    #types = {
        _id: String,
        email: String,
        password: String, 
        first_name: String,
        last_name: String,
        role: String,
        cart: String
    }
    #required = {
        _id: false,
        email: true,
        password: true, 
        first_name: false,
        last_name: false,
        role: true,
        cart: true
    }
}