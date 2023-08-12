import {Router} from 'express'
import { customUploader } from '../middlewares/multer.js'
import  * as usersService from '../services/sessionsService.js'
import { auth, checkAuthorizations, current } from '../middlewares/auth.js'
import { emailService } from '../services/mailerService.js'
import { usersRepository } from '../repository/usersRepository.js'

import * as usersController from '../controllers/usersController.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { succesfulResponse } from '../middlewares/succesfulResponse.js'

const usersRouter = Router()

usersRouter.route('/:uid/documents').post(
    customUploader,
    usersController.handleNewUserDocuments,
    succesfulResponse,
    errorHandler
)

usersRouter.route('/premium/:uid').post(
    await checkAuthorizations("isAdmin"),
    usersController.handlePremium,
    succesfulResponse,
    errorHandler
)

usersRouter.route('/').get(
    usersController.handleGetUsersData,
    succesfulResponse,
    errorHandler
)
usersRouter.route('/').delete(
    usersController.handleDeleteInactiveUsers,
    succesfulResponse,
    errorHandler
)

export {usersRouter}



