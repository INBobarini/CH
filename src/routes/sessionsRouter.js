import {Router} from 'express'
import {sManager} from '../DAO/managers/sessionsManager.js'
import passport from 'passport'


const sessionsRouter = Router()

sessionsRouter
.route('/github')
.get(passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{})

//LOGIN

/*sessionsRouter.get('/github', passport.authenticate(
    'github',
    {scope:['user:email']}),
    async (req,res)=>{
    }
)*/

sessionsRouter.route('/githubcallback')
.get(passport.authenticate('github',{failureRedirect:'/api/sessions/login'}),async (req,res)=>{res.redirect('/')})

sessionsRouter.route('/logout')
.get((req,res)=>{res.redirect('/')})

sessionsRouter.route('/')
.delete((req,res)=>{//hacer un metodo destroy con sessionManager
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

sessionsRouter.route('/current').get((req,res)=>{//sacar a session manager
    let userToShow = req.session.passport.user
    userToShow.password = "XXXXXXXX"
    res.send(userToShow)
})

export {sessionsRouter}