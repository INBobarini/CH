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

const folderNames = {}
folderNames.profilePicture = './src/public/profiles'
folderNames.productPicture = './src/public/products'
folderNames.document = './src/public/documents'

const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, folderNames[file.fieldname]??'./src/public/others')
  },
  filename: function(req,file,cb){
      cb(null,`${Date.now()}-${file.originalname}`)
  }
})

export const customUploader = multer ({storage})
.fields([{
  name:'profilePicture',
  name:'productPicture',
  name:'document'
}])




