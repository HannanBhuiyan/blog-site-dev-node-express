require('dotenv').config()

const dev = {
     app: {
          port:process.env.PORT || 8000
     },
     db: {
          url:process.env.DB_URL 
     },
     secret_key: {
          key: process.env.SESSION_SECRET_KEY
     }
}

module.exports = dev