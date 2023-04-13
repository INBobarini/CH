import mongoose from 'mongoose'
import {productosModel,cartsModel, chatModel} from '../models/schemas.js'

class productsManager{
    constructor(model){
        this.model = model
    }
    async getAll(){
        return await this.model.find() 
    }
    async getAllLean(){
        return await this.model.find().lean()
    }
    async getFirstN(number){
        return await this.model.find().skip(number).exec()
    }
    async getOneById(pid){
        return await this.model.findById({_id:pid})
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

class cartsManager{
    constructor(model){
        this.model = model
    }
    async createOne(){
        class Cart{
            constructor(){
                this.products = [] //pushear objeto {productID:,quantity}
            }
        }
        return await cartsModel.create(new Cart())
    }
    async getOne(cid){
        return await cartsModel.findById(cid)
    }
    async addProduct(cid,pid){
        try{
            let foundCart = await cartsModel.findById(cid)
            
            let foundProd = await productosModel.findById(pid)
            
            let productsInCart = foundCart.products.map((e)=>e.product)
            
            let productInCart = productsInCart.find(e=>e==pid)
            console.log(!productInCart)
            if(!productInCart){
                let newProdToCart = {
                    product:pid,
                    quantity:1
                }
                return await cartsModel.findByIdAndUpdate(
                    cid, { $push: { products: newProdToCart } }, { new: true }
                )
            }
            else{
                return await cartsModel.findOneAndUpdate(
                    {_id:cid, 'products.product': pid}, 
                    {$inc: { 'products.$.quantity': 1 } },
                    {new:true}
                )
            }
        }
        catch(err){
            return err
        } 
    }
}
class messagesManager {
    constructor(model){
        this.model = model
    }
    async getAll(){
        return await this.model.find() 
    }
    async getAllLean(){
        return await this.model.find().lean()
    }
    async createOne(user,message){
        return await this.model.create({user:user,message:message})//item must be an object
    }
}

const cManager = new cartsManager(cartsModel)
const pManager = new productsManager(productosModel)
const msgManager = new messagesManager(chatModel)

export {pManager,cManager, msgManager};