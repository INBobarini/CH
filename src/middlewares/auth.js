export const auth = function (req,res,next){ 
    
    if(!req.session){//no sirve para admin! y reemplazar por cookie
        return res.redirect('/api/sessions/login')
    }
    next()
}