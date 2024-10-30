import express from 'express'
import * as controller from '../Controller/CountryCodes'
const router=express.Router()
router.post('/createCountryCode',controller.CreateCountryCodes)
router.get('/countrycodes',controller.getCountryCodes)
router.patch('/updateCountryCode/:id',controller.UpdateCountryCodes)
router.delete('/deleteCountryCode/:id',controller.DeleteCountryCodes)
export default router