import express,{ Router } from 'express'
import { loginController, logoutController, registroController, loginGhController } from '../controllers/authController.js'
import { autenticationRegister, autenticationLogin, autenticationLoginGh } from '../middlewares/passport.config.js'
import {errorHandler} from '../middlewares/errorHandler.js'
import { handleGetPassRestore, handlePostPassRestore, handleUpdatePassword } from '../controllers/mailerController.js'

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
    handlePostPassRestore,
    errorHandler
)

authRouter.route('/restore/:code').get(
    handleGetPassRestore,
    errorHandler
)

authRouter.route('/restore').put(
    handleUpdatePassword,
    (req,res, next)=>{
        try{
            if(req.updatedUser){//pasword updated
                res.redirect('../api/sessions/login')
            }
            else{//password didn't update
                res.redirect('../api/auth/pwRestoreRequest')
            }
        }catch(error){
            next(error)
        }
    },
    errorHandler
)

export {authRouter}
