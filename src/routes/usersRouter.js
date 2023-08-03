import {Router} from 'express'
import { customUploader } from '../middlewares/multer.js'
import  * as usersService from '../services/sessionsService.js'
import { current } from '../middlewares/auth.js'

const usersRouter = Router()

usersRouter.route('/premium/:uid').get(
    //change user from role user to premium and viceversa
    //upload to premium if ID, address and comprobante were loaded
    //if not return an error, only if going from user to premium
)

usersRouter.route('/:uid/documents').post(
    customUploader,
    async (req,res,next) => {
        let user = current(req.session)
        if(req.files) {
            let newDocs = []
            Object.keys(req.files).forEach(key => {
                req.files[key].forEach(e=>{
                    newDocs.push({
                        name: e.fieldname,
                        reference: e.path
                    })
                })
            });
            console.log(newDocs)
            //TO DO, TEST WITH user variable
            await usersService.updateUserDocuments('inbobarini@gmail.com', newDocs)
        }
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

usersRouter.route('/').get(
    async(req,res, next)=>{
        req.result = await usersService.getUserData()
        next()
    }   
)
usersRouter.route('/').delete(
    async(req,res, next)=>{
        let time = undefined
        req.result = await usersService.deleteInactiveUsers(time)
        //mail sender
        next()
    }   
)

export {usersRouter}

/* Implementar una nueva ruta en el router de api/users, 
la cual será /api/users/premium/:uid  la cual permitirá 
cambiar el rol de un usuario, de “user” a “premium” y viceversa. */
