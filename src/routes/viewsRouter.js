import express from 'express'
import {messagesRepository as chatService} from '../DAO/managers/chatService.js'
import {io} from '../app.js'
import { __dirname } from '../utils.js'
import * as pController from '../controllers/productsController.js'
import * as cController from '../controllers/cartsController.js'
import {auth} from '../middlewares/auth.js'

const viewsRouter = express.Router()

viewsRouter.use(express.json())

viewsRouter.use(express.static('/src/public'))

viewsRouter.use((req,res,next)=>{//para tener websocket en las peticiones
    req['io'] = io
    next()
})

//PRODUCTS
viewsRouter.route('/').
get(
    auth,
    pController.handleGet,
    (req,res)=>{
        const {
            docs,
            totalPages,
            page,
            limit,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        } = req.result;
        
        res.render('home',{
            products:docs,
            styles:'css/index.css',
            user: req.user||"no logueado",
            totalPages,
            page,
            limit,
            hasPrevPage,
            hasNextPage,
            prevPage, //TO DO hide prevPage/nextpage buttons if their value is null, 
            nextPage,
        })
    }
)
//vista singular, no lanzada
/*router.get('/:pid',async(req,res)=>{//algo hace que se confunda el entrypoint del '/'
    let product = await pManager.getOneById(req.params.pid)
    console.log(req.body)
    res.render('singleProduct',{
        product: product,
        style: 'index.css'
    })
})*/

viewsRouter.route('/realtimeproducts')
.get(
    (req,res,next)=>{req.query.limit = 20, next()}, //mandarlo desde views
    pController.handleGet, 
    async (req,res)=>{
        res.render('realTimeProducts',{
            products:req.result.docs,
            style:'index.css'
        })
})

viewsRouter.route('/realtimeproducts')
.post(
    pController.handlePostAndGetAll, 
    async (req,res)=>{
        req['io'].sockets.emit('updateProducts', req.result.docs)  
})
viewsRouter.route('/realtimeproducts')
.delete(
    async (req,res,next)=>{req.params._id = req.body._id, next()}, //resolver este parche
    pController.handleDeleteAndGetAll,
    async(req,res)=>{
        req['io'].sockets.emit('updateProducts', req.result.docs)
})
//CARTS
viewsRouter.route('/carts/:cid')
.get(
    cController.handleGetPopulated,
    async(req,res)=>{
    try{
        let cart = req.result
        res.render('cart',{
            products: cart.products,
            cartId: req.params.cid,
            hasProducts: Boolean(cart.products.length)
        })
    }
    catch(err){console.log(err),res.send(err)}
})
//CHAT
viewsRouter.route('/chat')
.get(async(req,res,next)=>{
    let messages = await chatService.getAllLean()
    res.render('chat',{
        messages: messages,
    })
})
viewsRouter.route('/chat')
.post(async(req,res)=>{
    let{user, message} = req.body.newMessage
    let result = await chatService.createOne(user, message)
    let messages = await chatService.getAllLean() 
    req['io'].sockets.emit('actualizarMensajes', messages)
    res.send(result)
})
//SESSIONS
viewsRouter.route('/api/sessions/profile').get(async (req,res)=>{ 
    let user = await sManager.getUserData(req.session.user)
    res.render('profile', {
        user: req.user ?? null, 
    });
})
viewsRouter.route('/api/sessions/register')
.get(async (req,res)=>{
    res.render('sign-up')
})
viewsRouter.route('/api/sessions/login')
.get(async (req,res)=>{
    res.render('login')
})
export default viewsRouter