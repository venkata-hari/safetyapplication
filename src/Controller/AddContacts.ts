import express,{Request,Response,NextFunction} from 'express'
import AddContactsSchema from "../Model/AddContacts"
import {Promise_Type} from '../Utils/Types'
export const createContacts = async (req:any,res:Response,next:NextFunction):Promise_Type => {
  try {
    const { contacts } = req.body
    for (const contact of contacts) {
        const { firstname, lastname, mobile } = contact;
  
        if (!firstname || !lastname || !mobile) {
          return res.status(400).json({ message: "All fields are required for each contact." });
        }
      }
  
    const userId = req.user.id;
    const newContacts = await AddContactsSchema.create({
      user:userId,
      contacts: contacts,
    });
    return res.status(200).json({
      message: "Contacts created successfully",
      data: newContacts,
    });
  } catch (err) {
    next(err)
  }
};



export const GetContacts=async(req:Request,res:Response,next:NextFunction):Promise_Type=>{
    try{
      const data=await AddContactsSchema.find().populate('user','firstname lastname')
      return res.status(200).json({message:'Contacts are fetched Successfully',data})
    }
    catch(err){
        next(err)
    }
}