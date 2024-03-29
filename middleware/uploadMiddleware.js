const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'public/uploads')
     },
     filename: (req, file, cb) => {
          cb(null, file.fieldname + "-" + Date.now() + '-' + file.originalname )
     }
})

const upload = multer({

     storage,
     limits: {
          fileSize:  1024 * 1024 * 5
     },
     fileFilter: (req, file, cb) => {
          const type = /jpeg|jpg|png|gif/
          const extName = type.test(path.extname(file.originalname).toLowerCase())

          if(type && extName) {
               cb(null, true)
          }else {
               cb(new Error("Only supprot image"))
          }

     }
})

module.exports = upload