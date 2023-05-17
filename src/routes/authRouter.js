import express,{ Router } from 'express'
import { loginController, logoutController, registroController, loginGhController } from '../controllers/authController.js'
import passport from 'passport'
import { autenticationRegister, autenticationLogin, autenticationLoginGh } from '../config/passport.config.js'

const authRouter = Router()

authRouter.use(express.json())

authRouter.post('/register', autenticationRegister, registroController)
authRouter.post('/login', autenticationLogin, loginController)
authRouter.delete('/logout', logoutController)
authRouter.post('/loginGithub', autenticationLoginGh, loginGhController)
//to do logout github


export {authRouter}
