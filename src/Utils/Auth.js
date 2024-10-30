import express from 'express';
import AuthSchema from '../Model/AuthSchema.js';
import AddContactsSchema from '../Model/AddContacts.js';
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const Auth = async (req, res, next) => {
    const { firstname, lastname, dataofbirth, gender, password, confirmPassword ,mobile} = req.body;
  
    if (!firstname || !lastname || !dataofbirth || !gender || !password || !confirmPassword || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = await AuthSchema.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists. Please Sign In.' });
    }
    next();
};
export const AddContacts=async(req,res,next)=>{
    const { firstname, lastname,mobile} = req.body;
  
    if (!firstname || !lastname || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await AddContactsSchema.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists. Please Add new One.' });
    }
    next()
}
export const ChangePassword=async(req,res,next)=>{
    const {mobile,newPassword,confirmPassword}=req.body
    const exist=await AuthSchema.findOne({mobile})
    if(!exist){
        return res.status(404).json({message:'Enter register Mobile Number'})
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
    next()
}
