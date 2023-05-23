export const auth = function (req,res,next){ 
    console.log(req.session)
    if(req.session.passport.user){//no sirve para admin! y reemplazar por cookie
        return next()
        
    }
    res.redirect('/api/sessions/login')
}