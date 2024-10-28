import express from 'express';
import { SignUp,SignIn,ForgetPassword ,ChangePassword, VerifyOtp} from '../Controller/Auth';
import * as Validate from '../Utils/Auth'
const router = express.Router();
router.post('/signup',Validate.Auth, SignUp);
router.post('/signin', SignIn);
router.post('/forgetpassword',ForgetPassword);
router.post('/verifyotp',VerifyOtp);
router.post('/changepassword',Validate.ChangePassword,ChangePassword);
export default router;
