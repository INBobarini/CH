import express,{ Router } from 'express'
import { loginController, logoutController, registroController, loginGhController } from '../controllers/authController.js'
import { autenticationRegister, autenticationLogin, autenticationLoginGh } from '../middlewares/passport.config.js'
import {errorHandler, errorHandlerJson} from '../middlewares/errorHandler.js'
import { handleNewPassRestoreRequest } from '../controllers/mailerController.js'
import { restoreUserPassword } from '../controllers/usersController.js'
import { config } from '../config/config.js'


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

authRouter.route('/restore').post(
    handleNewPassRestoreRequest,
    errorHandler
)

authRouter.route('/restorePass').put(
    restoreUserPassword,
    (req,res, next)=>{
        if(req.error){
            return res.status(req.error.code).json(JSON.stringify(req.error.message))
        }   
        if(req.updatedUser){//pasword updated
            return res.status(200).json("Password cambiada")
        }
        else {
            next()
        }
    },
    errorHandlerJson
)

export {authRouter}
