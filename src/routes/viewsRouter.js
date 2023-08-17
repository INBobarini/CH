import express from 'express'
import {messagesRepository} from '../repository/chatRepository.js'
import {io} from '../app.js'
import { __dirname } from '../utils.js'
import * as pController from '../controllers/productsController.js'
import * as cController from '../controllers/cartsController.js'
import * as uController from '../controllers/usersController.js'
import * as sessionsService from '../services/sessionsService.js'
import { current, hasSession, checkAuthorizations }  from '../middlewares/auth.js'
import { createMockProduct } from '../mocks/mocks.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'
import { CustomError } from '../models/errors/customError.js'
import { errorHandler, errorHandlerJson } from '../middlewares/errorHandler.js'
import { cartsResponse, successfulResponse } from '../middlewares/successfulResponse.js'




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
    (req,res,next)=>{
        try {
            const {docs,totalPages,page,limit,hasPrevPage,
                hasNextPage,prevPage,nextPage,} = req.result;
            res.render('home',{
                products:docs,
                styles:'css/index.css',
                userName: req.user.first_name||"no logueado",
                userCart: req.user.cart,
                totalPages,
                page,
                limit,
                hasPrevPage,
                hasNextPage,
                prevPage, //TO DO hide prevPage/nextpage buttons if their value is null, 
                nextPage,
                isAdmin: false || (req.user.role==="admin")
            })
        } catch (error) {
            next(error)
        }
    }
)

viewsRouter.route('/mockingproducts').get(
    (req,res,next)=>{res.send(createMockProduct(100))}
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
    //(req,res,next)=>{req.query.limit = 20, next()}, //mandarlo desde views
    pController.handleGet, 
    async (req,res)=>{
        try {
            res.render('realTimeProducts',{
                products:req.result.docs,
                style:'index.css'
            })
        } catch (error) {
            next(error)
        }
})

viewsRouter.route('/realtimeproducts')
.post(
    hasSession,
    await checkAuthorizations("isAdmin","isPremium"),
    pController.handlePostAndGetAll, 
    async (req,res,next)=>{
        try {
            req['io'].sockets.emit('updateProducts', req.result.docs)
            res.send(req.result)   
        } catch (error) {
            next(error)
        }
    },
    errorHandlerJson
)
viewsRouter.route('/realtimeproducts/')
.delete(
    hasSession,
    (req,res,next)=>{req.params._id = req.body, next()},//fetch brings only from req.body
    await checkAuthorizations("isAdmin","isPremiumAndOwner"),
    pController.handleDeleteAndGetAll,
    async(req,res, next)=>{
        try {
            req['io'].sockets.emit('updateProducts', req.result.docs)
            res.send(req.result)
        } catch (error) {
            next(error)
        }
    },
    errorHandler
)
//CARTS
viewsRouter.route('/carts/:cid')
.get(
    cController.handleGetPopulated,
    async(req,res,next)=>{
        try{
            let cart = req.result
            res.render('cart',{
                products: cart.products,
                cartId: req.params.cid,
                hasProducts: Boolean(cart.products.length)
            })
        }
        catch(err) {
            next(err)
        }
    },
    errorHandlerJson
)
//CHAT
viewsRouter.route('/chat').get(
    async(req,res,next)=>{
        try {
            let messages = await messagesRepository.getAllLean()
            let fullName = req.user.first_name + " " + req.user.last_name //DTO?
            res.render('chat',{
                fullName: fullName,
                messages: messages,
            })
        } catch (error) {
            next(error)
        }
    },
    errorHandler
)

viewsRouter.route('/chat').post(
    await checkAuthorizations("isAdmin"),
    async(req,res,next)=>{
        try {
            let{user, message} = req.body.newMessage
            let result = await messagesRepository.createOne(user, message)//to controller?
            let messages = await messagesRepository.getAllLean() 
            req['io'].sockets.emit('actualizarMensajes', messages)
            res.send(result)
        } catch (error) {
            next(error)
        }
        
    },
    errorHandler
)

//SESSIONS
viewsRouter.route('/api/sessions/profile').
get(
    uController.handleGetCurrentUserData,
    async (req,res,next)=>{ 
        try {
            let DTOuser = req.result
            res.render('profile', {user: DTOuser ?? null})
        } catch (error) {
            next(error)
        }
    }
)
viewsRouter.route('/api/sessions/register').get(
    async (req,res, next)=>{
        res.render('sign-up')
    }
)

viewsRouter.route('/api/sessions/login').get(
    async (req,res, next)=>{
        res.render('login')
    }
)


//AUTH
viewsRouter.route('/pwRestoreRequest')
.get(async(req,res,next)=>{
    res.render('pwRestoreRequest')
})

viewsRouter.route('/restore/:code')
.get(
    //if verifycode render, else res.json
    uController.handleGetEmail,//validates code and gets email
    async(req, res,next)=>{
        try {
            let message = ""
            return res.render('restorePassword',
                {expiredMessage:message}
            ) 
        } catch (error) {
            next(error)
        }    
    },
    errorHandlerJson
)

//LOGGER

viewsRouter.route('/loggerTest').post(
    async(req,res,next)=>{
        try {
            let logs = []
            logs.push(req.body)
            if(!req.body) throw new CustomError("No se generó log", 404)
            else res.status(201)
        } catch (error) {
            next(error)
        }
    },
    errorHandler
)

viewsRouter.route('/loggerTest').get(
    async (req, res, next) => {
        try {
            const separatedLogs = logs.map(log => JSON.stringify(log, null, 2)).join('\n')
            res.type('json').send(`[${separatedLogs}]`)
        } catch (error) {
            next(error)
        }
    },
    errorHandler
)

//TICKETS 
viewsRouter.route('/tickets').get(
    uController.handleGetUserTickets,
    async(req, res, next)=>{
        try {
            let tickets = req.result
            res.render('tickets',{
                tickets: tickets,
                hasTickets: tickets.length? true : false
            }) 
        } catch (error) {
            next(error)
        }
    },
    errorHandler
)

//USERS
viewsRouter.route('/manageUsers').get(  
    await checkAuthorizations("isAdmin"),
    uController.handleGetUsersData,
    async(req,res)=>{
        let users = req.result
        res.render('manageUsers',{
            users: users
        })
    },
    errorHandler
)

export default viewsRouter