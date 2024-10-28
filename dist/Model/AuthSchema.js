"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AuthSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Auth", AuthSchema);
//# sourceMappingURL=AuthSchema.js.map