import jwt from 'jsonwebtoken'
export const Validate=async(req,res,next)=>{
try{
    const token=req.header('token')
    if(!token){
        return res.status(400).json({message:'invalid token'})
    }
    const decode=jwt.verify(token,'key')
    req.user=decode.user 
    next()
}
catch(err){
    next(err)
}
}