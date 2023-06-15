import express from 'express'
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js'

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import {sessionsRouter} from './routes/sessionsRouter.js'
import {authRouter} from './routes/authRouter.js'

import { Server as SocketIOServer} from 'socket.io'

import cookieParser from 'cookie-parser';
import session from 'express-session'

import FileStore from 'session-file-store'//instalarlo con npm i session-file-store
import MongoStore from 'connect-mongo' //npm i connect-mongo

import {passportInitialize, passportSession} from './middlewares/passport.config.js'
import {config} from './config/config.js'
import {ROUTES} from './routes/_routesDictionary.js'

//express
const app = express()
const httpServer = app.listen(config.port,()=>console.log("servidor en el puerto 8080") )

//cookie parser
app.use(cookieParser(config.cookieKey))

//session
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongoUrl,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        //ttl:15,
    }),
    secret: config.sessionSecret,
    resave:false,
    saveUninitialized:false,
}))

//passport
app.use(passportInitialize, passportSession)

//express para recibir json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//websocket
export const io = new SocketIOServer(httpServer)

//vistas handlebars
app.engine('handlebars', handlebars.engine());
app.set('views','./src/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))

//routers API
app.use(ROUTES.PRODUCTS, productsRouter)
app.use(ROUTES.CARTS, cartsRouter)
//routers vistas
app.use(ROUTES.VIEWS, viewsRouter)
//router login
app.use(ROUTES.SESSIONS, sessionsRouter)
//router auth
app.use(ROUTES.AUTH, authRouter)



io.on('connection', async socket =>{ //when a socket is initialized clientside this gets called
    console.log("Nuevo cliente conectado: "+ socket.id)
    socket.on('productos', data => {
        socket.broadcast.emit('updateProducts', data)
    })
})






