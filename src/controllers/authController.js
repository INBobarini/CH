export async function registroController(req, res, next) {
    req.logger.info("registrado: " + req.user.email)
    res.status(201).json(req.user)
}
export async function loginController(req, res, next) {
    req.logger.info("logueado: " + req.user.email)
    res.sendStatus(201)
}

export async function logoutController(req, res, next) {
    req.logger.info("logout " + req.user.email)
    req.logout(err => { //req.logout agregado por passport
        res.sendStatus(200)
    })
}
export async function loginGhController(req, res, next) {
    reg.logger.info("logueado GH: " + req.user.email)
    res.sendStatus(201)
}
