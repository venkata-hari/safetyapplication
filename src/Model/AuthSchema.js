import mongoose from "mongoose";
const AuthSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },  
    dataofbirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    otp: { type: String },
    lat: { type: String },
    lng: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", AuthSchema);
