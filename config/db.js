const config = require('./config')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dbURL = config.db.url


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=>{
     console.log("Database connection success ")
})
.catch((error)=>{
     console.log(error)
     process.exit(1)
})




