import express from 'express'
import {messagesRepository} from '../repository/chatRepository.js'
import {io} from '../app.js'
import { __dirname } from '../utils.js'
import * as pController from '../controllers/productsController.js'
import * as cController from '../controllers/cartsController.js'
import * as sessionsService from '../services/sessionsService.js'
import {auth, current, hasSession}  from '../middlewares/auth.js'
import { createMockProduct } from '../mocks/mocks.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'
import { CustomError } from '../models/errors/customError.js'

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
    hasSession,
    pController.handleGet,
    (req,res)=>{
        const {docs,totalPages,page,limit,hasPrevPage,
            hasNextPage,prevPage,nextPage,} = req.result;
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
            isAdmin: false|| (req.user.role==="admin")
        })
    }
)

viewsRouter.route('/mockingproducts')
.get((req,res,next)=>{res.send(createMockProduct(100))}
    )
//vista singular, no lanzada
/*router.get('/:pid',async(req,res)=>{//algo hace que se confunda el entrypoint del '/'
    let product = await pManager.getOneById(req.params.pid)
    //console.log(req.body)
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
    await auth({notUser:true}),
    pController.handlePostAndGetAll, 
    async (req,res)=>{
        req['io'].sockets.emit('updateProducts', req.result.docs)
        res.send(req.result)  
})
viewsRouter.route('/realtimeproducts/')
.delete(
    await auth({notUser:true}),
    (req,res,next)=>{req.params._id = req.body, next()},//fetch brings only from req.body
    pController.handleDeleteAndGetAll,
    async(req,res)=>{
        req['io'].sockets.emit('updateProducts', req.result.docs)
        res.send(req.result)
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
    catch(err){req.logger(err),res.send(err)}
})
//CHAT
viewsRouter.route('/chat')
.get(
    async(req,res,next)=>{
        let messages = await messagesRepository.getAllLean()
        let fullName = req.user.first_name + " " + req.user.last_name //DTO?
        res.render('chat',{
            fullName: fullName,
            messages: messages,
        })
    },
)

viewsRouter.route('/chat')
.post(
    await auth({notAdmin:true}),
    async(req,res)=>{
        let{user, message} = req.body.newMessage
        let result = await messagesRepository.createOne(user, message)
        let messages = await messagesRepository.getAllLean() 
        req['io'].sockets.emit('actualizarMensajes', messages)
        res.send(result)
    },
)
//SESSIONS
viewsRouter.route('/api/sessions/profile').
get(async (req,res)=>{ 
    let user = await sessionsService.getUserData(req.session.passport.user)// ver
    res.render('profile', {
        user: user ?? null, 
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

//LOGGER

let logs = []

viewsRouter.route('/loggerTest')
.post(async(req,res)=>{
    logs.push(req.body)
    if(!req.body) throw new CustomError("No se generó log", 404)
    else res.status(201)
    //no error handler defined
})

viewsRouter.route('/loggerTest')
.get(async (req, res) => {
    const separatedLogs = logs.map(log => JSON.stringify(log, null, 2)).join('\n');
    res.type('json').send(`[${separatedLogs}]`);
});
