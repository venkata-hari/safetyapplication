import express from "express";
import * as controller from "../Controller/AddContacts"
import * as Validate from "../Utils/validate"
const router=express.Router()
router.post('/addcontacts',Validate.Validate,controller.createContacts)
router.get('/getcontacts',Validate.Validate,controller.GetContacts)
export default router