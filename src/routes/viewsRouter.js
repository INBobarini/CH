import express from 'express'
import {pManager} from '../controllers/productManagerDb.js' 
import {msgManager} from '../controllers/chatManagerDb.js'

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

//PRODUCTOS

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

router.post('/realtimeproducts',async(req,res)=>{
    let result = await pManager.createOne(req.body.product)
    let products = await pManager.getAllLean() 
    req['io'].sockets.emit('updateProducts', products)
    res.send(result)
})

router.delete('/realtimeproducts',async(req,res)=>{
    let result = await pManager.deleteOne(req.body._id)
    let products = await pManager.getAllLean() 
    req['io'].sockets.emit('updateProducts', products)
    res.send(result)
})

//CHAT
router.get('/chat',async(req,res,next)=>{
    let messages = await msgManager.getAllLean()
    res.render('chat',{
        messages: messages,
        style:'index.css'
    })
})

router.post('/chat',async(req,res,next)=>{
    console.log(req.body)
    let{user, message} = req.body.newMessage
    let result = await msgManager.createOne(user,message)
    let messages = await msgManager.getAllLean() 
    req['io'].sockets.emit('actualizarMensajes', messages)
    res.send(result)
})

export default router