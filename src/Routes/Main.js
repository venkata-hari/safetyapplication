import express from 'express'
import Auth from './Auth.js'
const router=express.Router()
router.use('/auth',Auth)
export default router