import express from 'express'
import ProductManager from '../controllers/ProductManager.js'
//import ProductManager from '../controllers/productManagerDb.js'
//import productosDb from '../database/mongoose.js'

const router = express.Router()

//const pm = new ProductManager

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get('/',async(req,res)=>{
    const products = await pm.getProducts()

    res.render('home',{
        products: products,
        style:'index.css'
    })
})

router.get('/realtimeproducts',async(req,res)=>{
    const products = await pm.getProducts()
    res.render('realTimeProducts',{
        products: products,
        style:'index.css'
    })
})

router.post('/realtimeproducts',async(req,res,next)=>{
    
})

export default router