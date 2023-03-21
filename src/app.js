import express from 'express'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
//import {socketHandler} from './middleware/socketHandler.js' 

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/carritosRouter.js';
import viewsRouter from './routes/viewsRouter.js'
import { Server } from 'socket.io'

import ProductManager from './controllers/ProductManager.js';
const pm = new ProductManager

//express
const app = express()
const httpServer = app.listen(8080,()=>console.log("servidor en el puerto 8080") )


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

//websocket
export const socketServer = new Server(httpServer)

socketServer.on('connection', async clientSocket =>{
    console.log("Nuevo cliente conectado: "+clientSocket.id)
    let productos = await pm.getProducts()
    clientSocket.emit('updateProducts',{products:productos})
    clientSocket.on('deleteById', async id=>{
        console.log(await pm.deleteProduct(id))
        const updatedProducts = await pm.getProducts()
        clientSocket.emit('updateProducts',{products:updatedProducts})
    })
    clientSocket.on('addProduct', async product=>{
        console.log(await pm.addProduct(product))
        const updatedProducts = await pm.getProducts()
        clientSocket.emit('updateProducts',{products:updatedProducts})
    })
})






