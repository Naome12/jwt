const express =require('express')
const router = express.Router()
const { publicPost, privatePosts } = require('../db')
const checkAuth = require('../middleware/checkAuth')


router.get('/public',(req,res)=>{
res.json(publicPost)
})

router.get('/private',checkAuth,(req,res)=>{
    res.json(privatePosts)
    })
module.exports = router


