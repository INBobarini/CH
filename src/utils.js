//---dirname---//

import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname =  dirname(__filename)

//---bcrypt---//

import bcrypt from 'bcrypt'
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export {__dirname, createHash, isValidPassword}

//---multer---//

import multer from 'multer'

function setMulterStorage(path){
    return multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, path)
        },
        filename: function(req,file,cb){
            cb(null,`${Date.now()}-${file.originalname}`)
        }
    })
}

export const uploader = {
    profilePicture: setMulterStorage('./src/public/profile'),
    productPicture: setMulterStorage('./src/public/products'),
    document: setMulterStorage('./src/public/documents')
} 
const maxFiles = {
    profilePicture: 1,
    productPicture: 8,
    document: 3,
    identification: 1,
    addressVoucher: 1,
    accountVoucherStatement:1,
}

export function uploads (req,res,next){
    if (req.body.field_name){
        let uploadType = req.body.field_name
        let document = uploader[uploadType].fields([
          {name: uploadType, maxCount : maxFiles[uploadType]}
      ])
        
        return document
    }
    else {
      next(); // If no field_name provided, move to the next middleware
    }
}


