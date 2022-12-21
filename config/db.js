const config = require('./config')
const mongoose = require('mongoose')
const chalk = require('chalk')
mongoose.set('strictQuery', true);
const dbURL = config.db.url


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true,})
.then(()=>{
     console.log(chalk.yellow.bold("Database connection success "))
})
.catch((error)=>{
     console.log(error)
     process.exit(1)
})




