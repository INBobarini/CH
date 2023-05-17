import express from 'express'
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js'

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/carritosRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import {sessionsRouter} from './routes/sessionsRouter.js'
import {authRouter} from './routes/authRouter.js'

import { Server as SocketIOServer} from 'socket.io'

import cookieParser from 'cookie-parser';
import session from 'express-session'

import FileStore from 'session-file-store'//instalarlo con npm i session-file-store
import MongoStore from 'connect-mongo' //npm i connect-mongo

import {passportInitialize, passportSession} from './config/passport.config.js'

import {ROUTES} from './routes/_routesDictionary.js'

//express
const app = express()
const httpServer = app.listen(8080,()=>console.log("servidor en el puerto 8080") )

/*
-Se deberá contar con un hasheo de contraseña utilizando bcrypt
Se deberá contar con una implementación de passport, tanto para register como para login.
Implementar el método de autenticación de GitHub a la vista de login.

*/

//cookie parser
app.use(cookieParser("passw0rd"))

//session
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/ecommerce',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        //ttl:15,
    }),
    secret:'secretIvan',
    resave:false,
    saveUninitialized:false,
}))

//passport
app.use(passportInitialize, passportSession)

//mongo

//express para recibir json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//websocket
const io = new SocketIOServer(httpServer)

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


app.use((req,res,next)=>{//para tener websocket en las peticiones
    req['io'] = io
    next()
})


io.on('connection', async socket =>{ 
    console.log("Nuevo cliente conectado: "+ socket.id)
    socket.on('productos', data => {
        socket.broadcast.emit('actualizar', data)
    })
})






