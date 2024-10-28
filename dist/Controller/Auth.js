"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtp = exports.ChangePassword = exports.ForgetPassword = exports.SignIn = exports.SignUp = void 0;
const AuthSchema_1 = __importDefault(require("../Model/AuthSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(req.body.password, salt);
        const OTP = Math.floor(Math.random() * 5000);
        const data = yield AuthSchema_1.default.create(Object.assign(Object.assign({}, req.body), { password: hash, otp: OTP }));
        return res.status(200).json({ message: 'Signup Successfully', data });
    }
    catch (err) {
        next(err);
    }
});
exports.SignUp = SignUp;
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, password } = req.body;
        if (!mobile || !password) {
            return res.status(400).json({ message: 'All fileds are required' });
        }
        const exist = yield AuthSchema_1.default.findOne({ mobile });
        if (!exist) {
            return res.status(400).json({ message: 'Account does not exist' });
        }
        const isPassword = yield bcrypt_1.default.compare(password, exist.password);
        if (!isPassword) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        const payload = {
            user: {
                id: exist._id,
                mobile: exist.mobile
            }
        };
        const token = jsonwebtoken_1.default.sign(payload, "key");
        return res.status(200).json({ message: 'successfully login', token });
    }
    catch (err) {
        next(err);
    }
});
exports.SignIn = SignIn;
const ForgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile } = req.body;
        const exist = yield AuthSchema_1.default.findOne({ mobile });
        if (!exist) {
            return res.status(404).json({ message: 'Enter register Mobile Numbet' });
        }
        const OTP = Math.floor(Math.random() * 5000);
        const data = yield AuthSchema_1.default.findOneAndUpdate({ mobile: mobile }, { $set: { otp: OTP } }, { new: true }).select('mobile otp');
        return res.status(200).json({ message: 'OTP sent to mobile Number', data });
    }
    catch (err) {
        next(err);
    }
});
exports.ForgetPassword = ForgetPassword;
const ChangePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, newPassword } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(newPassword, salt);
        yield AuthSchema_1.default.findOneAndUpdate({ mobile: mobile }, { $set: { password: hash } }, { new: true }).select('firstname,lastname,mobile');
        return res.status(200).json({ message: 'password changed successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.ChangePassword = ChangePassword;
const VerifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mobile, otp } = req.body;
        const exist = yield AuthSchema_1.default.findOne({ mobile });
        if (!exist) {
            return res.status(400).json({ message: 'Invalid Mobile Number' });
        }
        if (!otp) {
            return res.status(400).json({ message: 'OTP is required' });
        }
        if (exist.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        const data = yield AuthSchema_1.default.findOneAndUpdate({ mobile: mobile }, { $set: { otp: otp } }, { new: true }).select('firstname,lastname,mobile');
        return res.status(200).json({ message: 'OTP verified successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.VerifyOtp = VerifyOtp;
//# sourceMappingURL=Auth.js.map