import {Router} from 'express'
//import ProductManager from '../controllers/ProductManager.js';
import {pManager} from '../controllers/productManagerDb.js'

const productosRouter = Router()

productosRouter.get('/', async(req,res)=>{
    let result = await pManager.getAll()
    if(!result){return res.status(401).send({status:"failure", payload:"no products"})}  
    if(req.query.limit!==undefined){
        result = await pManager.getFirstN(req.query.limit)
        return res.status(200).send({status:"success", payload:result})
    }
    else{
        return res.status(200).send({status:"success", payload:result})
    }
})

productosRouter.get('/:_id', async(req,res)=>{
    console.log('GET con req.params._id: '+ req.params._id)
    const result = await pManager.getOneById(req.params._id)
    if(!result){return res.status(404).send({status:"failure", payload:"product not found"})} 
    res.send({status:"success", payload:result})
})

productosRouter.post('/', async(req,res)=>{
    try{
        let result = await pManager.createOne(req.body)
        res.send({status:"success", payload:result})
    }
    catch(error){
        console.log(error)
        res.send({status:"failure", payload:"product not added"})
    }
})

productosRouter.put('/:_id', async(req,res)=>{
    try{
        let result = await pManager.updateOne(req.params._id,req.body)
        res.send({status:"success", payload:result})
    }
    catch(err){
        res.status(404).send({status:"failure", payload:"not found"})
    }
})

productosRouter.delete('/:_id', async(req,res)=>{
    try{
        let result = await pManager.deleteOne(req.params._id)
        res.send({status:"success", payload:result})
    }
    catch(err){
        res.status(404).send({status:"failure", payload:"not found"})
    }
})

export default productosRouter 