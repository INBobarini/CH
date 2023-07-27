import {Router} from 'express'
import { upload } from '../utils.js'

const usersRouter = Router()

usersRouter.route('/premium/:uid').get(
    //change user from role user to premium and viceversa
    //upload to premium if ID, address and comprobante were loaded
    //if not return an error, only if going from user to premium
)

usersRouter.route('/premium/:uid').post(
    upload.single('file'),
    (req,res,next)=>{
        if(!req.file){
            return res.status(400).send("error multer")
        }
        let image = req.file.path
        console.log(image)
        res.status(201).json(req.file)
    }
)

usersRouter.route('/:uid/documents').post(
    upload.array('files') //check this
    //profile picture goes to profiles folder
    //product picture to products folder
    //document to documents folder
    //if all 3 uploaded -> continue
    //usersRepoUpdateStatus //to check if the documents were used
)

export {usersRouter}

/* Implementar una nueva ruta en el router de api/users, 
la cual será /api/users/premium/:uid  la cual permitirá 
cambiar el rol de un usuario, de “user” a “premium” y viceversa. */
