import express from "express";
import * as controller from "../Controller/AddContacts.js"
import * as Validate from "../Utils/validate.js"
const router=express.Router()
router.post('/addcontacts',Validate.Validate,controller.createContacts)
router.get('/getcontacts',Validate.Validate,controller.GetContacts)
export default router