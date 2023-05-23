export async function registroController(req, res, next) {
    console.log("registrado: " + req.user)
    res.status(201).json(req.user)
}
export async function loginController(req, res, next) {
    console.log("logueado: " + req.user)
    res.sendStatus(201)
}

export async function logoutController(req, res, next) {
    req.logout(err => { //req.logout agregado por passport
        res.sendStatus(200)
    })
}
export async function loginGhController(req, res, next) {
    console.log("logueado GH: " + req.user)
    res.sendStatus(201)
}
