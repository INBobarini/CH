import {Router} from 'express'
import { customUploader } from '../utils.js'

const usersRouter = Router()

usersRouter.route('/premium/:uid').get(
    //change user from role user to premium and viceversa
    //upload to premium if ID, address and comprobante were loaded
    //if not return an error, only if going from user to premium
)

usersRouter.route('/:uid/documents').post(
    customUploader,
    (req,res,next)=>{
        console.log("paso el mw")
        res.json(req.files)

    }
)

//update user status
        /*
        await usersService.updateUserDocuments(req.body.field_name)
            await usersRepo.update({status:})

        */
        //res.status(201).json(req.files)

usersRouter.route('/premium/:uid').post(
    /*
        await usersService.checkDocumentsAndUpgradeToPremium(req.body.field_name)
            await usersRepo.update({status:})
            //documents: id,comprobante,comprobante
        if not all documents return error

    */
)

export {usersRouter}

/* Implementar una nueva ruta en el router de api/users, 
la cual será /api/users/premium/:uid  la cual permitirá 
cambiar el rol de un usuario, de “user” a “premium” y viceversa. */
