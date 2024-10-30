import mongoose from 'mongoose'
export const Connect=async(URL:any)=>{
try{
await mongoose.connect(URL)
console.log('connected mongoose successfully')
}
catch(err){
    console.log(err)
}
}