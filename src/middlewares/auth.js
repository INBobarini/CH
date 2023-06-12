import * as DTOs from '../services/DTOs.js'

export const current = function (session){//req.session
    if(session.passport){
    const currentUser = new DTOs.User(session.passport.user)
        return currentUser
    }
    else{
        return res.json({"error":"no se encontró la sesión"})
    }
}

export const hasSession = async (req,res,next)=>{
    if(!req.session.passport){
        return res.redirect("/api/sessions/login")//dictionary!
    }
    next()
}

//define roles array?

export async function auth(permission){
    //permission puede ser: {notUser:true} or {notAdmin:true}
    return async (req, res, next) => {
        
        let user = current(req.session);
        const message = "Not authorized";

        if (user.role === "admin" && permission.notAdmin) {
            return res.status(403).json("Admin " + message);
        }

        if (user.role === "user" && permission.notUser) {
            return res.status(403).json("User " + message);
        }

        next();
    };
} 
    /*console.log("auth")
    let user = current(req.session)
    const message = "Not authorized"
    if((user.role==="admin")&&(permission.notAdmin)) {
    return res.status(403).json("Admin " + message)
    }
    if((user.role==="user")&&(permission.notUser)) {
    return res.status(403).json("User " + message)
    }
    next()*/
 

