import {Router} from 'express'
import ProductManager from '../ProductManager.js';

const productosRouter = Router()

const pManager = new ProductManager; 

/*- La ruta raíz GET / deberá listar todos los productos de la base. 
(Incluyendo la limitación ?limit del desafío anterior.*/
productosRouter.get('/', async(req,res)=>{
    let limit = req.query.limit
    let products = await pManager.getProducts()
    if(limit!==undefined){
        products.splice(limit)
    }
    return res.send ({products})
})

/*- La ruta GET /:pid deberá traer sólo el producto con el id proporcionado*/
productosRouter.get('/:pid', async(req,res)=>{
    let product = await pManager.getProductById(req.params.pid)
    res.send({product})
})
/*- La ruta raíz POST / deberá agregar un nuevo producto con los campos:
    id: Number/String (A tu elección, el id NO se manda desde body, 
        se autogenera como lo hemos visto desde los primeros entregables, 
        asegurando que NUNCA se repetirán los ids en el archivo.
    title:String,
    description:String
    code:String
    price:Number
    status:Boolean
    stock:Number
    category:String
    thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
    Status es true por defecto.
    Todos los campos son obligatorios, a excepción de thumbnails
*/
productosRouter.post('/', async(req,res)=>{
    let product = await pManager.addProduct(req.body)
    res.send({product})
})

export default productosRouter 