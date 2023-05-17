import {Router} from 'express'
import {sManager} from '../controllers/sessionsManager.js'
import passport from 'passport'


const sessionsRouter = Router()


//LOGIN

sessionsRouter.get('/github', passport.authenticate(
    'github',
    {scope:['user:email']}),
    async (req,res)=>{
    }
)

sessionsRouter.get('/githubcallback', passport.authenticate(
    'github',
    {failureRedirect:'/api/sessions/login'}),
    async (req,res)=>{
        console.log("github callback")
        res.redirect('/products')
    }
)

sessionsRouter.get('/login',(req,res)=>{//mover a views
    res.render('login', {
        usuario: "usuario",
    });
})

sessionsRouter.get('/logout',(req,res,next)=>{
    res.redirect('/')
})

sessionsRouter.get('/profile', async (req,res)=>{
    //let user = await sManager.getUserData(req.session.user)
    res.render('profile', {
        user: req.user, 
    });
})

sessionsRouter.get('/register',(req,res)=>{//mover a views
    res.render('sign-up', {
        usuario: "usuario",
    });
})

sessionsRouter.delete('/',(req,res)=>{
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

sessionsRouter.get('/current',(req,res)=>{//mover a views
    let userToShow = req.session.passport.user
    userToShow.password = "XXXXXXXX"
    res.send(userToShow)
})

export {sessionsRouter}