import {Router} from 'express'
import {sManager} from '../controllers/sessionsManager.js'


const sessionsRouter = Router()

//LOGIN

sessionsRouter.get('/login',(req,res,next)=>{
    //const data = req.body
    
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
        user: req.session.user, 
    });
})

sessionsRouter.get('/register',(req,res)=>{
    res.render('sign-up', {
        usuario: "usuario",
    });
})

sessionsRouter.post('/', async (req,res)=>{//log in check
    let loginOk = await sManager.logInCheck(req.body.email, req.body.password)
    if(loginOk){
        const authCookie = loginOk.role==="admin"? "admin" : "user"
        res.cookie(authCookie, { maxAge: 100000, signed:true })
        req.session.user = loginOk
        return res.status(201).json(req.session.user)
    }
    console.log('acceso denegado')
    return res.sendStatus(401)
})

sessionsRouter.post('/register', async (req,res)=>{
    let result = await sManager.registerUser(req.body)
    res.send(result)
})

sessionsRouter.delete('/',(req,res)=>{
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

export {sessionsRouter}