import express from 'express'
import AuthSchema from '../Model/AuthSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const SignUp=async(req,res,next)=>{
try{
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(req.body.password,salt)
    const OTP=Math.floor(Math.random()*5000)
    const data=await AuthSchema.create({...req.body,password:hash,otp:OTP})
    return res.status(200).json({message:'Signup Successfully',data})
}
catch(err){
    next(err)
}
}
export const SignIn=async(req,res,next)=>{
try{
    const {mobile,password}=req.body
    if(!mobile || !password){
        return res.status(400).json({message:'All fileds are required'})
    }
    const exist=await AuthSchema.findOne({mobile})
    if(!exist){
     return res.status(400).json({message:'Account does not exist'})
    }
    const isPassword=await bcrypt.compare(password,exist.password)
    if(!isPassword){
        return res.status(400).json({message:'Invalid Password'})
    }
    const payload={
        user:{
            id:exist._id,
            mobile:exist.mobile
        }
    }
    const token=jwt.sign(payload,"key")
    return res.status(200).json({message:'successfully login',token})
}
catch(err){
    next(err)   
}
}
export const ForgetPassword=async(req,res,next)=>{
    try{
        const {mobile}=req.body
        const exist=await AuthSchema.findOne({mobile})
        if(!exist){
            return res.status(404).json({message:'Enter register Mobile Numbet'})
        }
        const OTP=Math.floor(Math.random()*5000)
        const data=await AuthSchema.findOneAndUpdate({mobile:mobile},{$set:{otp:OTP}},{new:true}).select('mobile otp');
        return res.status(200).json({message:'OTP sent to mobile Number',data})
    }
    catch(err){
        next(err)
    }
}
export const ChangePassword=async(req,res,next)=>{
    try{ 
        const{mobile,newPassword}=req.body
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(newPassword,salt)   
        await AuthSchema.findOneAndUpdate({mobile:mobile},{$set:{password:hash}},{new:true}).select('firstname,lastname,mobile');
        return res.status(200).json({message:'password changed successfully'})
    }
    catch(err){
        next(err)
    }
}
export const VerifyOtp=async(req,res,next)=>{
    try{ 
        const{mobile,otp}=req.body
        const exist=await AuthSchema.findOne({mobile})
        if(!exist){
            return res.status(400).json({message:'Invalid Mobile Number'})
        }
        if(!otp){
            return res.status(400).json({message:'OTP is required'})
        }
        if(exist.otp!==otp){
          return res.status(400).json({message:'Invalid OTP'})
        }
        const data=await AuthSchema.findOneAndUpdate({mobile:mobile},{$set:{otp:otp}},{new:true}).select('firstname,lastname,mobile');
        return res.status(200).json({message:'OTP verified successfully'})
    }
    catch(err){
        next(err)
    }
}