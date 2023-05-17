import express from 'express'
import {pManager} from '../controllers/productManagerDb.js' 
import {msgManager} from '../controllers/chatManagerDb.js'
import {cManager} from '../controllers/cartsManagerDb.js'
import {responseObj} from '../middlewares/responseFormatter.js'

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

/*const auth = function (req,res,next){ 
    if(req.cookies.user||req.cookies.admin){
        console.log(req.SignedCookies)
        next()
    }
    res.redirect('/api/sessions/login')
}*/

//PRODUCTS

router.get('/', async(req,res)=>{
    console.log(req.session)
    try{
        let products = await pManager.getAll(
            req.query.limit,
            req.query.page,
            req.query.query,
            req.query.sort
        )
        products =  new responseObj("success", products)  
        
        const { payload, limit, totalPages, page, hasPrevPage, 
            hasNextPage, prevPage, nextPage } = products;

        res.render('home', {
            products: payload,
            style: 'index.css',
            user: req.user,
            limit, //no se usa
            totalPages,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage, 
            nextPage,
        });
    }
    catch(err){
        res.status(500).send({error:err})
    }
})

/*router.get('/:pid',async(req,res)=>{//ruta cambiada porque algo hace que se confunda el entrypoint del '/'
    let product = await pManager.getOneById(req.params.pid)
    console.log(req.body)
    res.render('singleProduct',{
        product: product,
        style: 'index.css'
    })
})*/

router.get('/realtimeproducts',async(req,res)=>{
    try{
        let products = await pManager.getAll()
        res.render('realTimeProducts',{
            products: products,
            style:'index.css'
        })
    }
    catch(err){
        res.status(500).send({error:err})
    }
})

router.post('/realtimeproducts',async(req,res)=>{
    let result = await pManager.createOne(req.body.product)
    let products = await pManager.getAllLean() 
    req['io'].sockets.emit('updateProducts', products)
    res.send(result)
})

router.delete('/realtimeproducts',async(req,res)=>{
    let result = await pManager.deleteOne(req.body._id)
    let products = await pManager.getAllLean() 
    req['io'].sockets.emit('updateProducts', products)
    res.send(result)
})

//CARTS

router.get('/carts/:cid',async(req,res)=>{
    let cart = await cManager.getOne(req.params.cid)
    cart = JSON.parse(JSON.stringify(cart,null,'\t'))
    res.render('cart',{
        products: cart.products,
        style: 'index.css'
    })
})


//CHAT
router.get('/chat',async(req,res,next)=>{
    let messages = await msgManager.getAllLean()
    res.render('chat',{
        messages: messages,
        style:'index.css'
    })
})

router.post('/chat',async(req,res)=>{
    console.log(req.body)
    let{user, message} = req.body
    let result = await msgManager.createOne(user,message)
    let messages = await msgManager.getAllLean() 
    req['io'].sockets.emit('actualizarMensajes', messages)
    res.send(result)
})

//SESSIONS

router.get('/login', async(req,res)=>{
    res.render('login')
})

/*
router.get('/', async(req,res)=>{
    console.log(req.session.user)
    res.render('start',{
        
        user:req.session.user
    })
})
*/
export default router