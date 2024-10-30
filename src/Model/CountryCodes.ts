import mongoose from 'mongoose'
export type Country = {
    country: string ;
    countryCode: string ;
    regex: string | RegExp | undefined;
} | any
const CountryCodeSchema=new mongoose.Schema({
    country:{type:String},
    countryCode:{type:String},
    regex:{type:String}

},{timestamps:true})
export default mongoose.model<Country>("CountryCodes",CountryCodeSchema)