import mongoose from 'mongoose'
export const Connect=async(URL)=>{
try{
await mongoose.connect(URL)
console.log('connected mongoose successfully')
}
catch(err){
    console.log(err)
}
}