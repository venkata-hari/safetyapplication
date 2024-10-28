"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Connect_1 = require("./MongoDb_Connection/Connect");
const dotenv_1 = __importDefault(require("dotenv"));
const Main_1 = __importDefault(require("./Routes/Main"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use('/', Main_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'Internal Server Error';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    });
});
app.listen(PORT, () => {
    const URL = process.env.MOGO_URL || 'mongodb+srv://venkat:1234@cluster0.srkzk.mongodb.net/harborleaf?retryWrites=true&w=majority&appName=Cluster0';
    if (!URL) {
        console.error('Database URL is not defined');
    }
    (0, Connect_1.Connect)(URL);
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map