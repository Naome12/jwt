const express = require("express")
const app = express()
require('dotenv').config()
const  jwt= require('jsonwebtoken') 
const post= require("./routes/post")
const auth = require("./routes/auth")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth',auth)
app.use('/post',post)


app.listen(process.env.PORT,()=>{
    console.log(`Server is runnig on ${process.env.PORT}`)
})