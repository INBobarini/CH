import {Router} from 'express'
import {sManager} from '../controllers/sessionsManager.js'
import passport from 'passport'


const sessionsRouter = Router()


//LOGIN

sessionsRouter.get('/login',(req,res)=>{//mover a views
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
        user: req.user, 
    });
})

sessionsRouter.get('/register',(req,res)=>{
    res.render('sign-up', {
        usuario: "usuario",
    });
})

sessionsRouter.get('/github', passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{})

sessionsRouter.get('/githubcallback', passport.authenticate(
    'github',
    {failureRedirect:'/login'}),
    async (req,res)=>{
        req.session.user = req.user
        console.log(req.user)
        res.redirect('/')
    }
)
    



//Variante usando passport de diapositivas
/*sessionsRouter.post('/register', passport.authenticate('register',{failureRedirect:'/failRegister'}, async (req, res)=>{
    res.send({status:"success", message: "User registered"})
}))
sessionsRouter.get('/failRegister', (req,res)=>{
    console.log("Failed strategy")
    res.send({error:"Failed"})

})

sessionsRouter.post('/login', passport.authenticate('login',{failureRedirect:'/failLogin'}, async (req, res)=>{
    if(!req.user) return res.status(400).send({status:"error", error:"Invalid credentials"})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
    }
    res.send({status: "success", payload: req.user})
}))
sessionsRouter.get('/failLogin', (req,res)=>{
    res.send({error:"Failed Login"})
})
*/
//router original sin passport
/*sessionsRouter.post('/', async (req,res)=>{//log in check
    if(!req.body.email || !req.body.password){
        res.status(400).send({status:error, error:"Incomplete values"})
    }
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
*/
//router original sin passport

/*sessionsRouter.post('/register', async (req,res)=>{
    const {first_name,last_name,email,age,password} = req.body;
    if(!first_name || !last_name || !email || !age || !password){
        return res.sendStatus(400)
    }
    let result = await sManager.registerUser(req.body)
    res.send(result)
})*/

sessionsRouter.delete('/',(req,res)=>{
    req.session.destroy()
    res.clearCookie("admin",{signed:true})
    res.clearCookie("usuario",{signed:true})
    res.sendStatus(200)
})

export {sessionsRouter}