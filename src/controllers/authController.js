export async function registroController(req, res, next) {
    try {
        req.logger.info("registrado: " + req.user.email)
        res.status(201).json(req.user)
    } catch (error) {
        next(error)
    }
    
}
export async function loginController(req, res, next) {
    try {
        req.logger.info("logueado: " + req.user.email)
        res.status(201).send()
    } catch (error) {
        next(error)
    }
}

export async function logoutController(req, res, next) {
    try {
        req.logger.info("logout " + req.user.email)
        req.logout(err => { //req.logout agregado por passport
        res.status(204).send()
        })
    } catch (error) {
        next(error)
    }
}
export async function loginGhController(req, res, next) {
    try {
        reg.logger.info("logueado GH: " + req.user.email)
        res.status(201).send()
    } catch (error) {
        next(error)
    }
    
}
