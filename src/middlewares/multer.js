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
.fields([
    {name:'profilePicture', maxCount:1},
    {name:'productPicture', maxCount:8},
    {name:'document', maxCount:2},
    {name:'identificacion'},
    {name:'comprobante_de_domicilio'},
    {name:'comprobante_de_estado_de_cuenta'}
])