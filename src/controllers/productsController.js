import { productsRepository } from '../repository/productsRepository.js'
import { CustomError } from '../models/errors/customError.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'


export async function handleGet(req, res, next) {
    try{
        if(!req.params._id){
            //---Productos---
            const{query,limit,page,sort} = req.query//DTO
            req.result = await productsRepository.getProducts(query,limit,page,sort)
            
            req.statusCode = req.result? 200 : 404
            next()
        }
        else{
            //---Unico producto---
            req.result = await productsRepository.getProduct(req.params._id)
            req.statusCode = req.result? 200 : 404
            next()
        } 
    }
    catch(error){
        next(error)
    }
}

export async function handlePost(req, res, next) {
    try{
        if(!req.body){
            throw new CustomError("!req.body", 400)
        }
        req.result = await productsRepository.createProduct(req.body)//DTO?
        req.statusCode = req.result? 201 : 400
        next()
    }
    catch(error){
        next(error)
    }
}

export async function handlePostAndGetAll(req, res, next) {
    try{
        if(!req.body){
            throw new CustomError("!req.body", 400)
        }
        req.result = await productsRepository.createProduct(req.body)
        req.statusCode = req.result? 201 : 400
        const{query,limit,page,sort} = req.query
        req.query.limit = 20
        req.result = await productsRepository.getProducts(query,limit,page,sort)
        next()
    }
    catch(error){
        next(error)
    }
}

export async function handlePut(req, res, next) {
    try{
        if(!req.body){
            throw new CustomError("!req.body", 400)
        }
        if(!req.params._id){
            throw new CustomError("!req.params._id", 400)
        }
        req.result = await productsRepository.updateProduct(req.params._id,req.body)
        req.statusCode = req.result? 200 : 412
        next()
    }
    catch(error){
        next(error)
    }
}

export async function handleDelete(req, res, next) {
    try{
        if(!req.params._id){
            throw new CustomError("!req.params._id", 400)
        }
        req.result = await productsRepository.deleteProduct(req.params._id)
        req.statusCode = req.result? 200 : 404
        next()
    }
    catch(error){
        next(error)
    }
}

export async function handleDeleteAndGetAll(req, res, next) {
    try{
        req.result = await productsRepository.deleteProduct(req.params._id)
        req.statusCode = req.result? 201 : 400
        const{query,limit,page,sort} = req.query
        req.query.limit = 20
        req.result = await productsRepository.getProducts(query,limit,page,sort)
        
        next()
    }
    catch(error){
        next(error)
    }
}
//TESTS
//Controllers

