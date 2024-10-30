import express,{Request,Response,NextFunction} from 'express'
import AuthSchema,{Auth} from '../Model/AuthSchema'
import CountryCodesSchema,{Country} from '../Model/CountryCodes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Promise_Type } from '../Utils/Types'
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const SignUp=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
try{
    const { firstname, lastname, dataofbirth, gender, password, confirmPassword, countryCode, mobile } = req.body;
    if (!firstname || !lastname || !dataofbirth || !gender || !password || !confirmPassword || !countryCode || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const country:Country=await CountryCodesSchema.findOne({countryCode:countryCode})
    if(!country){
        return res.status(400).json({ message: 'Invalid country code' });
    }
    const mobileRegex= new RegExp(country.regex);
    if (!mobileRegex.test(`${mobile}`)) {
        return res.status(400).json({ message: 'Invalid mobile number for the specified country code' });
    }
    const existingUser = await AuthSchema.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists. Please Sign In.' });
    }

    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(req.body.password,salt)
    const OTP = Math.floor(10000 + Math.random() * 90000);
    const data=await AuthSchema.create({...req.body,password:hash,confirmPassword:hash,otp:OTP})
    return res.status(200).json({message:'Signup Successfully',data})
}
catch(err){
    next(err)
}
}
export const SignIn=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
try{
    const {mobile,password}=req.body
    if(!mobile || !password){
        return res.status(400).json({message:'All fileds are required'})
    }
    const exist:any=await AuthSchema.findOne({mobile})
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
export const ForgetPassword=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
    try{
        const {countryCode,mobile}=req.body
        if(!countryCode || !mobile){
            return res.status(404).json({message:'All Fileds are Required'})
        }
        const exist=await AuthSchema.findOne({mobile})
        if(exist?.mobile!==mobile){
            return res.status(404).json({message:'Enter register Mobile Number'})
        }
        if(exist?.countryCode!==countryCode){
            return res.status(404).json({message:'Enter register CountryCode'})
        }
        const OTP = Math.floor(10000 + Math.random() * 90000);
        const data=await AuthSchema.findOneAndUpdate({mobile:mobile,countryCode:countryCode},{$set:{otp:OTP}},{new:true}).select('otp');
        return res.status(200).json({message:'OTP sent to mobile Number',data})
    }
    catch(err){
        next(err)
    }
}
export const ChangePassword=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
    try{ 
        const {countryCode,mobile,newPassword,confirmPassword}=req.body
        const exist=await AuthSchema.findOne({mobile})
        if(exist?.mobile!==mobile){
            return res.status(404).json({message:'Enter register Mobile Number'})
        }
        if(exist?.countryCode!==countryCode){
            return res.status(404).json({message:'Enter register CountryCode'})
        }
        if(!newPassword || !confirmPassword){
            return res.status(404).json({message:'All fileds are Required'})
        }
        if (!strongPasswordRegex.test(newPassword)) {
            return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(newPassword,salt)   
        await AuthSchema.findOneAndUpdate({mobile:mobile},{$set:{password:hash}},{new:true}).select('firstname,lastname,mobile');
        return res.status(200).json({message:'password changed successfully'})
    }
    catch(err){
        next(err)
    }
}
export const VerifyOtp=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
    try{ 
        const{countryCode,mobile,otp}=req.body
        const exist=await AuthSchema.findOne({mobile})
        if(exist?.mobile!==mobile){
            return res.status(404).json({message:'Enter register Mobile Number'})
        }
        if(exist?.countryCode!==countryCode){
            return res.status(404).json({message:'Enter register CountryCode'})
        }
        if(!otp){
            return res.status(400).json({message:'OTP is required'})
        }
        if(exist?.otp!==otp){
          return res.status(400).json({message:'Invalid OTP'})
        }
        const data=await AuthSchema.findOneAndUpdate({mobile:mobile},{$set:{otp:otp}},{new:true}).select('firstname,lastname,mobile');
        return res.status(200).json({message:'OTP verified successfully'})
    }
    catch(err){
        next(err)
    }
}