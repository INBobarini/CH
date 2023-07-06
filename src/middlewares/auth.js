import { CustomError } from '../models/errors/customError.js'
import { productsRepository } from '../repository/productsRepository.js'
import * as DTOs from '../services/DTOs.js'
import { winstonLogger as logger } from '../utils/winstonLogger.js'


export const current = function (session){//req.session
    if(session.passport){
    const currentUser = new DTOs.User(session.passport.user)
        return currentUser
    }
    else{
        logger.warning("!session.passport")
        return null
    }
}

export const hasSession = async (req,res,next)=>{
    if(!req.session.passport){
        return res.redirect("/api/sessions/login")//dictionary!
    }
    next()
}

export async function auth(permission){
    //permission puede ser: {notUser:true} or {notAdmin:true}
    return async (req, res, next) => {
        try{
            let user = current(req.session);
            if(!user){
                throw new CustomError("!user", 401)
            }
            if (user.role === "admin" && permission.notAdmin) {
                throw new CustomError(`Forbidden for ${user.role} role, ${user.email}`, 403)
            }
            if (user.role === "user" && permission.notUser) {
                throw new CustomError(`Forbidden for ${user.role} role, ${user.email}`, 403)
            }
            if (user.role === "premium" && permission.notPremium) {
                throw new CustomError(`Forbidden for ${user.role} role, ${user.email}`, 403)
            }
            next()
        }
        catch(err){
            next(err);
        }
    };
} 

export async function checkAuthorizations(...authorizationNames) { //pass the functions as strings
    return async (req, res, next) => {
        //--- Reference data ---
        let user = current(req.session)
        if(!user) return new CustomError("User not found for authentication", 401)
        logger.info(`${user.email} requests authorization`) 
        let product
        if(req.params._id){
            product = await productsRepository.getProduct(req.params._id)
        }
        
        //--- Current authorizations ---
        let authorizations = {}
        authorizations.isAdmin = async function () {
            let user = current(req.session)
            if(user.role==="admin") return true
            return false
        }
        authorizations.isPremium = async function () {
            let user = current(req.session)
            logger.debug("User"+ JSON.stringify(user))
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
        //--- Executing the authorizations ---
        for (let f of authorizationNames){
            if (await authorizations[f]()){
                logger.info(`Authorizated by ${f}`)
                return next()
            }
        }
        return new CustomError("Not authorized", 401),
        next()
  }  
}
//checkAuthorizations("isAdmin")




 

