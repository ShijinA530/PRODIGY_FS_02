require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors');
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/data', routes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => 
        console.log('connected to db & listening on port', process.env.PORT)    
    )
})
.catch((error) => 
    console.log(error)
)
