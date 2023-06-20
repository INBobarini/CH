import fs from 'fs'
import { productosModel } from '../models/schemas.js'


let docsInProductsCollection = await productosModel.estimatedDocumentCount()

if (docsInProductsCollection == 0){
    const products =  JSON.parse(await fs.promises.readFile('./productos.json','utf-8'))
    let loadedProductsInDb = await productosModel.insertMany(
        products
    )
    if(loadedProductsInDb){
        console.log("BD productos generada")
    } 
}