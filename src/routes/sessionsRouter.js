import {Router} from 'express'
import passport from 'passport'
import {current} from '../middlewares/auth.js'
import * as sessionsService from '../services/sessionsService.js'
import { CustomError } from '../models/errors/customError.js'

const sessionsRouter = Router()

sessionsRouter
.route('/github').get(
    passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{res.redirect('/')})

//LOGIN

/*sessionsRouter.get('/github', passport.authenticate(
    'github',
    {scope:['user:email']}),
    async (req,res)=>{
    }
)*/

sessionsRouter.route('/githubcallback').get(
    passport.authenticate('github', {failureRedirect:'/api/sessions/login'}), async (req,res)=>{res.redirect('/')})

sessionsRouter.route('/logout')
.get(async (req,res)=>{
    let currentUser = current(req.session)
    if (currentUser){
        await sessionsService.logOutUser(currentUser.email)
        res.redirect('/')
    }
    new CustomError("logoutRouter failed", 500)
})

sessionsRouter.route('/')
.delete((req,res)=>{//hacer un metodo destroy con sessionManager
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

sessionsRouter.route('/current')
.get((req,res)=>{//sacar a session manager, usar en profile view, mandar a un controller de sesiones?
    try{
        let currentUser = current(req.session)
        res.status(200).send(currentUser)
    }
    catch(error){
        res.status(403).json({message:"No logueado", error:error})
    }
})

sessionsRouter.route('')

export {sessionsRouter}