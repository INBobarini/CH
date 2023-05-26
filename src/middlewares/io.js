import {io} from '../app.js' //mover a middleware/services?

io.on('connection', async socket =>{ 
    console.log("Nuevo cliente conectado: "+ socket.id)
    socket.on('productos', data => {
        socket.broadcast.emit('actualizar', data)
    })
})

export {io}