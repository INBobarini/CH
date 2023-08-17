import { CustomError } from '../models/errors/customError.js'
import { productsRepository } from '../repository/productsRepository.js'
import { usersRepository } from '../repository/usersRepository.js'
import * as DTOs from '../services/DTOs.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'


export const current = async function (session){//req.session
    if(session.passport){
        let email = session.passport.user.email
        let user = await usersRepository.getUser({email:email})
        if(!user) {return new CustomError("User has no session", 403)}
        const currentUser = new DTOs.User(user)
        return currentUser
    }
    else{
        logger.warning("!session.passport")
        return null
    }
}

export const hasSession = async (req,res,next)=>{
    if(!req.session.passport){
        logger.debug("has Session")
        res.redirect("/api/sessions/login")//dictionary!
    }
    next()
}



export async function checkAuthorizations(...authorizationNames) { //pass the functions as strings
    return async (req, res, next) => {
        //--- Gathering reference data ---
        try {
            if(!req.session) throw new CustomError("User not found for authentication", 404)
            req.user = await current(req.session)
            let user = req.user
            if(!user) throw new CustomError("User not found for authentication", 401)
            logger.info(`${user.email} requests authorization`) 
            
            let product
            if(req.params._id){
                product = await productsRepository.getProduct(req.params._id)
            }
        
        
        
        //--- Available authorization methods ---
        let authorizations = {}
        authorizations.isAdmin = async function () {
            let user = await current(req.session)
            if(user.role==="admin") return true
            return false
        }
        authorizations.isPremium = async function () {
            let user = await current(req.session)
            if(user.role==="premium") return true
            return false
        }
        authorizations.isOwner = async function () {
            if(!product) {
                new CustomError ("Product not found for auth", 404)
                return false
            }
            if (product.owner===user.email) return true
            return false
        }
        authorizations.isPremiumAndOwner = async function () {
            if(!product) {
                new CustomError ("Product not found for auth", 404)
                return false
            }
            if(user.role==="premium"){
                if(!product.owner) {
                    logger.warning("product.owner is undefined")
                    return false
                }
                if (product.owner===user.email) return true
            }
            return false
        }
        //--- Evaluating the authorizations ---
        logger.debug(`${user.email} attempts authorization with role ${user.role} using ${authorizationNames}`)
        for (let f of authorizationNames){
            if (await authorizations[f]()){
                logger.info(`Authorizated by ${f}`)
                return next()
            }
        }
        throw new CustomError("No reason to authorize", 401)
    
    } catch (error) {
        next(error)
    }
  }  
}





 

