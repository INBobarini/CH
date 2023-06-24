import { CustomError } from '../models/errors/customError.js'
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
        }
        catch(err){
            next(err);
        }
    };
} 

 

