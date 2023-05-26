import {productosModel} from '../models/productsModel.js'
import {cartsModel} from '../models/cartsModel.js'
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
    async emptyCart(cid){
        let emptyCart = await cartsModel.updateOne({_id:cid},{products:[]}, { new: true })
        return await cartsModel.findById(cid)
    }
    async getOne(cid){
        return await cartsModel.findById(cid).populate('products.product')
    }
    async getLast(){
        return await cartsModel.findOne().sort({_id:-1})
    }
    j
    async addProduct(cid,pid){       
        try{
            let foundCart = await cartsModel.findById(cid)
            
            let foundProd = await productosModel.findById(pid)
            
            let productsInCart = foundCart.products.map((e)=>e.product)
            
            let productInCart = productsInCart.find(e=>e==pid)
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
    async removeProduct(cid,pid){       
        try{
            let foundCart = await cartsModel.findById(cid)
            let foundProd = await productosModel.findById(pid)
            let productsInCart = foundCart.products.map((e)=>e.product)
            let productInCart = productsInCart.find(e=>e==pid)
            if(productInCart){
                let updCart = await cartsModel.findOneAndUpdate(
                    {_id:cid, 'products.product': pid}, 
                    {$inc: { 'products.$.quantity': -1 } },
                    {new:true}
                )
                updCart = await cartsModel.findOneAndUpdate(
                    {_id:cid, 'products.quantity': { $lte: 0 }}, 
                    {$pull: { products: {product:pid} } },
                    {new:true}
                )
            }
            return await cartsModel.findById(cid)
        }
        catch(err){
            return err
        } 
    }
    async addProducts(cid,products){//pisa no actualiza
        let foundCart = await cartsModel.findOneAndUpdate(
            {_id:cid},
            {$set:{products:[]}},
            {new:true}
        )
        foundCart = await cartsModel.updateMany(
            {_id:cid},
            {$push:{products:{$each:products}}},
            {new:true}
        )
        return await cartsModel.findById(cid)
    }
    async updateQuantity(cid,pid,quantity){
        let updCart = await cartsModel.findOneAndUpdate(
            {_id:cid, 'products.product': pid}, 
            {$set: { 'products.$.quantity': Number(quantity)} },//xq quantity{"quantity":"9"}
            {new:true}
        )
        return await cartsModel.findById(cid)
    }
}

const cManager = new cartsManager(cartsModel)

export {cManager}