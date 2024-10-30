import express from 'express';
import { SignUp,SignIn,ForgetPassword ,ChangePassword, VerifyOtp} from '../Controller/Auth';
const router = express.Router();
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/forgetpassword',ForgetPassword);
router.post('/verifyotp',VerifyOtp);
router.post('/changepassword',ChangePassword);
export default router;
