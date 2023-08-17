import {Router} from 'express'
import { customUploader } from '../middlewares/multer.js'
import  * as usersService from '../services/sessionsService.js'
import { checkAuthorizations, current } from '../middlewares/auth.js'
import { emailService } from '../services/mailerService.js'
import { usersRepository } from '../repository/usersRepository.js'

import * as usersController from '../controllers/usersController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { successfulResponse } from '../middlewares/successfulResponse.js'


const usersRouter = Router()

usersRouter.route('/:uid/documents').post(
    customUploader,
    usersController.handleNewUserDocuments,
    
 
)

usersRouter.route('/premium/:uid').post(
    await checkAuthorizations("isAdmin"),
    usersController.handlePremium,
)

usersRouter.route('/').get(
    usersController.handleGetUsersData,
)
usersRouter.route('/').delete(
    usersController.handleDeleteInactiveUsers,
    
)
usersRouter.route('/:uid').delete(
    usersController.handleDeleteUser,
    
)

usersRouter.use(successfulResponse, errorHandler)

export {usersRouter}



