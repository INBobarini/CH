import express from 'express'
import ProductManager from './ProductManager.js'; //Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
const app = express()
app.use(express.urlencoded({extended:true}))
const session = new ProductManager; //Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.

app.get('/products', async(req,res)=>{
    let limit = req.query.limit
    let products = await session.getProducts()
    //console.log(limit===undefined)
    if(limit!==undefined){
        products.splice(limit)
    }
    return res.send ({products})
})

app.get('/products/:pid', async(req,res)=>{
    let product = await session.getProductById(req.params.pid)
    res.send({product})
})

app.listen(8080,()=>console.log("servidor en el puerto 8080") )

/*
El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos .
Si se recibe un límite, sólo devolver el número de productos solicitados.
ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
*/





