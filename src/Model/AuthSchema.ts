import mongoose from "mongoose";
export type Auth = {
  firstname?: string;
  lastname?: string;
  mobile?: string;
  countryCode?:string;
  dataofbirth?: string;
  password?: string | undefined;
  confirmPassword?: string;
  otp?:string;
  gender?:string

};
const AuthSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    countryCode:{type: String, required: true},
    mobile: { type: String, required: true, unique: true },
    dataofbirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    otp: { type: String },
  },
  { timestamps: true }
);
AuthSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret.password, delete ret.confirmPassword }
})
export default mongoose.model<Auth>("Auth", AuthSchema);
