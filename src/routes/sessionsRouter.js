import {Router} from 'express'
import passport from 'passport'
import {current} from '../middlewares/auth.js'


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
.get((req,res)=>{res.redirect('/')})

sessionsRouter.route('/')
.delete((req,res)=>{//hacer un metodo destroy con sessionManager
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

sessionsRouter.route('/current').get((req,res)=>{//sacar a session manager, usar en profile view, mandar a un controller de sesiones?
    try{
        let currentUser = current(req.session)
        res.status(200).send(currentUser)
    }
    catch(error){
        res.status(403).json({message:"No logueado", error:error})
    }
    
})

export {sessionsRouter}