const JWT  = require("jsonwebtoken")


module.exports = async(req,res,next)=>{
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(400).json({
            "error":[
             {
                 "msg":"NO TOKEN FOUND"
             }
            ] 
         })
    }

try {
    let user = await JWT.verify(token,"fshadshkdhdhkdhkfdhvbjdhjbkddk")
    req.user = user.email;
    next()
} catch (error) {
    return res.status(400).json({
        "error":[
         {
             "msg":"TOKEN INVALID"
         }
        ] 
     })
}
}