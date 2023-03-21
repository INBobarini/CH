import express from 'express'
import ProductManager from '../controllers/ProductManager.js'
import {socketServer} from '../app.js'


const router = express.Router()

const pm = new ProductManager

router.use(express.urlencoded({extended:true}))

router.get('/',async(req,res)=>{
    const products = await pm.getProducts()
    res.render('home',{
        products: products,
        style:'index.css'
    })
})

router.get('/realtimeproducts',async(req,res)=>{
    
    socketServer.on('connection', async clientSocket =>{
        console.log("Nuevo cliente conectado: "+clientSocket.id)
        const productos = await pm.getProducts()
        clientSocket.emit('updateProducts',{products:productos})
    })

    let products = await pm.getProducts()
    
    res.render('realTimeProducts',{
        products: products,
        style:'index.css'
    })
})


router.post('/realtimeproducts',async(req,res,next)=>{
    
})


export default router