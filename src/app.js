import express from 'express'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/carritosRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import { Server as SocketIOServer} from 'socket.io'


//express
const app = express()
const httpServer = app.listen(8080,()=>console.log("servidor en el puerto 8080") )

//websocket
const io = new SocketIOServer(httpServer)

app.use((req,res,next)=>{//para tener websocket en las peticiones
    req['io'] = io
    next()
})

//express para recibir json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routers API
app.use('/api/products/', productsRouter)
app.use('/api/carts/', cartsRouter)
//routers vistas
app.use('/',viewsRouter)

//vistas handlebars
app.engine('handlebars', handlebars.engine());
app.set('views','./src/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname+'/public'))

io.on('connection', async socket =>{ 
    console.log("Nuevo cliente conectado: "+socket.id)
    socket.on('productos', data => {
        socket.broadcast.emit('actualizar', data)
    })
})






