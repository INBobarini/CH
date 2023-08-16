import { cartsRepository } from "../repository/cartsRepository.js"
import { productsRepository } from "../repository/productsRepository.js"
import { cartsModel } from "../models/cartsModel.js"
import { ticketsRepository } from "../repository/ticketsRepository.js"
import { current } from "../middlewares/auth.js"
import {winstonLogger as logger} from "../utils/winstonLogger.js"

import { CustomError } from "../models/errors/customError.js"


//returns cart objects
//TODO assign cart
async function getCartAndValidateProdInCart(cid,pid){
    let foundCart = await cartsRepository.getCart(cid)
    
    if(!foundCart){
        logger.warning("Cart does not exist")
        return null //it is not defined what should be returned as error in a service
    }
    let foundProd = await productsRepository.getProduct(pid)
    if(!foundProd){
        logger.warning("Product does not exist")
        return null //it is not defined what should be returned as error in a service
    }
    return foundCart
}

export async function emptyCart(cid){
    let emptiedCart = await cartsRepository.updateCart(cid)
    return await cartsRepository.getCart(cid)
}
export async function fillCart(cid,arrayOfProdQuant){//replaces content of the cart with new data
    let updatedCart = await cartsRepository.updateCart(cid,arrayOfProdQuant)
    return updatedCart
}
export async function addProductToCart(cid,pid){//user.cart could be used in this case.
    let foundCart = await getCartAndValidateProdInCart(cid,pid)
    if(!foundCart) return null

    let indexOfProductInCart = (foundCart.products.findIndex(e=>e.product==pid))
    
    if(indexOfProductInCart===-1){
        foundCart.products.push({product:pid,quantity:1})
    }
    else{
        foundCart.products[indexOfProductInCart].quantity++
    }
    await cartsRepository.updateCart(cid,foundCart.products)
    return await cartsRepository.getCart(cid)

}
export async function removeProductFromCart(cid,pid){
    let foundCart = await getCartAndValidateProdInCart(cid,pid)
    let indexOfProductInCart = foundCart.products.findIndex(e=>e.product==pid)
    let quantOfProdIncart = foundCart.products[indexOfProductInCart].quantity
    if(quantOfProdIncart<=1){
        foundCart.products.splice(indexOfProductInCart,1)
    }
    else{
        foundCart.products[indexOfProductInCart].quantity--
    }
    return await cartsRepository.updateCart(cid,foundCart.products)
}
export async function updateQuantOfProductInCart(cid, pid, quantity){
    let foundCart = await getCartAndValidateProdInCart(cid,pid)
    let indexOfProductInCart = foundCart.products.findIndex(e=>e.product==pid)
    foundCart.products[indexOfProductInCart].quantity = quantity
    return await cartsRepository.updateCart(cid,foundCart.products)
}
export async function getCartWithPopulatedProducts(cid){
    return await cartsRepository.getCartWithPopulatedProducts(cid)
}

export async function purchaseCart(cid, purchaserEmail){
    
    //GETTING DATA
    let cartToPurchase = await cartsRepository.getCart(cid)
    let productsIds = cartToPurchase.products.map(e=>e.product)
    let productsInStore = await productsRepository.getManyProductsByIds(productsIds)
   
    //AUXILIARY CART 
    let confirmedCart = cartToPurchase.products.filter((c=>{//A cart for which there is enough stock
        let currentProd = productsInStore.docs.find((p)=>p._id===c.product)
        let isThereEnoughStock = c.quantity<=currentProd.stock
        return isThereEnoughStock
    }))

    //CALCULATE & UPDATE STOCKS
    let updProds = productsInStore.docs.map((p,i) => {
        let prodInCCart = confirmedCart.find((e)=>e.product===p._id)
        p.stock = p.stock - prodInCCart.quantity
        return p
    })
    await productsRepository.updateMultipleProducts(updProds)
    
    //UPDATE THE CART WITH THE REMAINDER PRODUCTS
    const remainderCart = cartToPurchase.products.filter(e => !confirmedCart.includes(e));
    await cartsRepository.updateCart(cid, remainderCart)

    //CREATE THE TICKET FROM THE CONFIRMED CART
    const amount = confirmedCart.reduce((acc,subtotal,i,p)=>{
        let prodPrice = updProds[i].price
        subtotal = p[i].quantity * prodPrice
        return acc + subtotal
    },0)
    await ticketsRepository.createTicket(amount,purchaserEmail)
    //RETURN THE CART WITH THE REMAINDER ITEMS
    return remainderCart
}

    
//TESTS
//EMPTYCART
//console.log(await emptyCart("647e32473c7c7bd8dc2b2269"))
//FILLCART
/*
console.log(await fillCart("647e32473c7c7bd8dc2b2269",[
    {
        product:"646e34fcdaf88eafb79b7438",
        quantity: 9
    },
    {
        product:"646e34fcdaf88eafb79b743b",
        quantity: 2
    },
    ]
))
*/
//ADDPRODUCT
//console.log(await addProductToCart("647e3eb165e4e94bd72913f9","646e34fcdaf88eafb79b743a"))
//REMOVEPRODUCT
//console.log(await removeProductFromCart("647e3eb165e4e94bd72913f9","646e34fcdaf88eafb79b7443"))
//UPDATEQUANTITY
//console.log(await updateQuantOfProductInCart("647e3eb165e4e94bd72913f9","646e34fcdaf88eafb79b7443",9))
//PURCHASECART
//purchaseCart("647e3eb165e4e94bd72913f9","inbobarini@gmail.com")

