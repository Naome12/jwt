const express =require('express')
const router = express.Router()
const bcrypt =require('bcryptjs') 
const  JWT= require('jsonwebtoken') 
const {users} = require('../db')
const {check,validationResult } = require('express-validator')

router.get('/',(req,res)=>{
    res.send('Hi, welcome to our page')
})

router.post('/signup',[
    check('email','please provide a valid email').isEmail(),
    check('password','please provide a password of characters greater than 7 characters').isLength({
        min:8  
    })
],async(req,res)=>{
const {password,email} = req.body

//VALIDATED THE INPUT  

const errors = validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array()
    })
}
// res.send("Validation Pass")

// VALIDATE THE USER IF DOESN'T ALREADY EXISTS
 let user= users.find((user)=>{
    return user.email === email
 });

 if(user){
 return res.status(400).json({
   "error":[
    {
        "msg":" already exists"
    }
   ] 
})
 }
 const hashedPassword = await bcrypt.hash(password,10) ;

 users.push({
    email,
    password:hashedPassword
 })




const token = await JWT.sign({
    email
},"fshadshkdhdhkdhkfdhvbjdhjbkddk",{
    expiresIn:3600000
})

res.json({
    password,
    email,
    hashedPassword,
    token
})
console.log(req.body)
console.log(hashedPassword)  
})
router.post('/login',async(req,res)=>{
    const {password,email}= req.body;


    let user = users.find((user)=>{
        return user.email === email
    })

    
 if(!user){
    return res.status(400).json({
      "error":[
       {
           "msg":"Invalid credentials"
       }
      ] 
   })
    } 
let isMatch = await bcrypt.compare(password,user.password)
if(!isMatch){
    return res.status(400).json({
      "error":[
       {
           "msg":"Invalid credentials"
       }
      ] 
   })
    }

    
const token = await JWT.sign({
    email
},"fshadshkdhdhkdhkfdhvbjdhjbkddk",{
    expiresIn:3600000
})

res.json({
    token
})


})

router.get('/all',(req,res)=>{
    res.json(users)
})

module.exports = router 

