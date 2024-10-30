import express from 'express'
import Auth from './Auth.js'
import AddContacts from './AddContacts.js'
const router=express.Router()
router.use('/auth',Auth)
router.use('/contacts',AddContacts)
export default router