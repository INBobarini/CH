import express from 'express'
import {pManager, msgManager} from '../controllers/productManagerDb.js'


const router = express.Router()

//const pm = new ProductManager

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get('/',async(req,res)=>{
    try{
        let products = await pManager.getAllLean()
        res.render('home',{
            products: products,
            style:'index.css'
        })
    }
    catch(err){
        res.status(500).send({error:err})
    }
})

router.get('/realtimeproducts',async(req,res)=>{
    try{
        let products = await pManager.getAllLean()
        res.render('realTimeProducts',{
            products: products,
            style:'index.css'
        })
    }
    catch(err){
        res.status(500).send({error:err})
    }
})

router.get('/realtimeproducts',async(req,res)=>{
    try{
        let products = await pManager.getAllLean()
        res.render('realTimeProducts',{
            products: products,
            style:'index.css'
        })
    }
    catch(err){
        res.status(500).send({error:err})
    }
})

router.get('/chat',async(req,res,next)=>{
    let messages = await msgManager.getAllLean()
    res.render('chat',{
        messages: messages,
        style:'index.css'
    })
})

router.post('/chat',async(req,res,next)=>{
    let{user, message} = req.body
    let result = await msgManager.createOne(user,message) 
    req['io'].sockets.emit('actualizar')
    res.send(result)
})

export default router