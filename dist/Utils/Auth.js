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
exports.ChangePassword = exports.Auth = void 0;
const AuthSchema_1 = __importDefault(require("../Model/AuthSchema"));
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, dataofbirth, gender, password, confirmPassword, mobile } = req.body;
    if (!firstname || !lastname || !dataofbirth || !gender || !password || !confirmPassword || !mobile) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingUser = yield AuthSchema_1.default.findOne({ mobile });
    if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists. Please Sign In.' });
    }
    next();
});
exports.Auth = Auth;
const ChangePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, newPassword, confirmPassword } = req.body;
    const exist = yield AuthSchema_1.default.findOne({ mobile });
    if (!exist) {
        return res.status(404).json({ message: 'Enter register Mobile Number' });
    }
    if (!newPassword || !confirmPassword) {
        return res.status(404).json({ message: 'All fileds are Required' });
    }
    if (!strongPasswordRegex.test(newPassword)) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.' });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    next();
});
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=Auth.js.map