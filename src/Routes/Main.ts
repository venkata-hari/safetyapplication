import express from 'express'
import Auth from './Auth'
import AddContacts from './AddContacts'
import CountryCodes from './CountryCodes'
const router=express.Router()
router.use('/auth',Auth)
router.use('/contacts',AddContacts)
router.use('/country',CountryCodes)
export default router