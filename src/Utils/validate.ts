import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {Promise_Type} from './Types'
export const Validate=async(req:any,res:Response,next:NextFunction):Promise_Type=>{
try{
    const token=req.header('token')
    if(!token){
        return res.status(400).json({message:'invalid token'})
    }
    const decode:any=jwt.verify(token,'key')
    req.user=decode.user 
    next()
}
catch(err){
    next(err)
}
}