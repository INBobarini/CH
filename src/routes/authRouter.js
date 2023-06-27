import express,{ Router } from 'express'
import { loginController, logoutController, registroController, loginGhController } from '../controllers/authController.js'
import { autenticationRegister, autenticationLogin, autenticationLoginGh } from '../middlewares/passport.config.js'
import {errorHandler} from '../middlewares/errorHandler.js'

const authRouter = Router()

authRouter.use(express.json())

authRouter.route('/register')
.post(
    autenticationRegister, 
    registroController,
    errorHandler
)

authRouter.route('/login')
.post(
    autenticationLogin, 
    loginController,
    errorHandler
)

authRouter.route('/logout')
.delete(
    logoutController,
    errorHandler
)

/*authRouter.route('/loginGithub')
.post(
    autenticationLoginGh, 
    loginGhController
)*/
//to do logout github

export {authRouter}
