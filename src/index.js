import express from 'express'
import { Connect } from './MongoDb_Connection/Connect.js'
import dotenv from 'dotenv'
import mainrouter from './Routes/Main.js'
import cors from 'cors'
const app = express()
dotenv.config()
const PORT = process.env.PORT || 80
app.use(cors())
app.use(express.json())
app.use('/', mainrouter)
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' })
})
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'Internal Server Error';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})


app.listen(PORT, () => {
    const URL = process.env.MOGO_URL || 'mongodb+srv://venkat:1234@cluster0.srkzk.mongodb.net/harborleaf?retryWrites=true&w=majority&appName=Cluster0'
    if (!URL) {
        console.error('Database URL is not defined');
    }
    Connect(URL);
    console.log(`Server is running on port ${PORT}`);
});
