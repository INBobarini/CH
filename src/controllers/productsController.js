import {pManager} from '../DAO/productManagerDb.js'

export async function handleGet(req, res, next) {
    
    try{
        if(!req.params._id){
            //---Productos---
            const{limit,page,query,sort} = req.query
            req.result = await pManager.getAll(limit,page,query,sort)
            req.statusCode = req.result? 200 : 404
            next()
        }
        else{
            //---Unico producto---
            req.result = await pManager.getOneById(req.params._id)
            req.statusCode = req.result? 200 : 404
            next()
        } 
    }
    catch(error){
        res.status(req.statusCode).send({status:"failure", payload:"not found"})
    }
   
}

export async function handlePost(req, res, next) {
    try{
        req.result = await pManager.createOne(req.body)
        req.statusCode = req.result? 201 : 400
        next()
    }
    catch(error){
        res.status(req.statusCode).send({status:"failure", payload:"not found"})
    }
}

export async function handlePostAndGetAll(req, res, next) {
    try{
        req.result = await pManager.createOne(req.body)
        req.statusCode = req.result? 201 : 400
        req.result = await pManager.getAll(req.querylimit = 100)
        next()
    }
    catch(error){
        res.status(req.statusCode).send({status:"failure", payload:"not found"})
    }
}

export async function handleDeleteAndGetAll(req, res, next) {
    try{
        req.result = await pManager.deleteOne(req.params._id)
        req.statusCode = req.result? 201 : 400
        req.result = await pManager.getAll(req.querylimit = 100)
        next()
    }
    catch(error){
        res.status(req.statusCode).send({status:"failure", payload:"not found"})
    }
}

export async function handlePut(req, res, next) {
    try{
        req.result = await pManager.updateOne(req.params._id,req.body)
        req.statusCode = req.result? 200 : 412
        next()
    }
    catch(error){
        res.status(req.statusCode).send({status:"failure", payload:"not found"}) //TO DO: reemplazar los strings segun el codigo de erro
    }
}

export async function handleDelete(req, res, next) {
    try{
        req.result = await pManager.deleteOne(req.params._id)
        req.statusCode = req.result? 200 : 404
        next()
    }
    catch(err){
        res.status(req.statusCode).send({status:"failure", payload:"not found"})
    }
}
