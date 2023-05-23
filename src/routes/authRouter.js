import express,{ Router } from 'express'
import { loginController, logoutController, registroController, loginGhController } from '../controllers/authController.js'
import { autenticationRegister, autenticationLogin, autenticationLoginGh } from '../config/passport.config.js'

const authRouter = Router()

authRouter.use(express.json())

authRouter.route('/register')
.post(
    autenticationRegister, 
    registroController
)

authRouter.route('/login')
.post(
    autenticationLogin, 
    loginController
)

authRouter.route('/logout')
.delete(
    logoutController
)

/*authRouter.route('/loginGithub')
.post(
    autenticationLoginGh, 
    loginGhController
)*/
//to do logout github

export {authRouter}
