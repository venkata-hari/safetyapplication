import express,{Request,Response,NextFunction} from 'express'
import CountryCodesSchema from "../Model/CountryCodes"
import {Promise_Type} from "../Utils/Types"
export const CreateCountryCodes = async (req:Request,res:Response,next:NextFunction):Promise_Type => {
    try {
        const { country, countryCode, regex } = req.body
        if (!country || !countryCode || !regex) {
            return res.status(400).json({ message: 'All fileds are required' })
        }
        const exist =await CountryCodesSchema.findOne({countryCode})
        if(exist){
            return res.status(400).json({message:'Country Code Already Exist'})
        }
        const data = await CountryCodesSchema.create(req.body)
        return res.status(200).json({ message: 'Country code created successfully', data })
    }
    catch (err) {
        next(err)
    }
}
export const getCountryCodes = async (req:Request,res:Response,next:NextFunction):Promise_Type => {
    try {
        const data = await CountryCodesSchema.find()
        return res.status(200).json({ message: 'Country codes fetched successfully', data })
    }
    catch (err) {
        next(err)
    }
}
export const UpdateCountryCodes = async (req:Request,res:Response,next:NextFunction):Promise_Type => {
    try {
        const data = await CountryCodesSchema.findByIdAndUpdate({ _id:req.params.id }, { $set: req.body }, { new: true })
        return res.status(200).json({ message: 'Country code Updated successfully', data })
    }
    catch (err) {
        next(err)
    }
}
export const DeleteCountryCodes = async (req:{params:{id:string}},res:Response,next:NextFunction):Promise_Type=> {
    try {
       
        const data = await CountryCodesSchema.findByIdAndDelete({ _id:req.params.id }).exec()
        return res.status(200).json({ message: 'Country code deleted successfully', data })
    }
    catch (err) {
        next(err)
    }
}