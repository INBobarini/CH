import {io} from '../app.js' //mover a middleware/services?
import { winstonLogger as logger } from '../utils/winstonLogger.js'

io.on('connection', async socket =>{ 
    logger.info("Nuevo cliente conectado: "+ socket.id)
    socket.on('productos', data => {
        socket.broadcast.emit('actualizar', data)
    })
})

export {io}