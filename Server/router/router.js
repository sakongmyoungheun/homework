import express from 'express'
import * as Controller from '../controller/controller.js'


const router = express.Router()

router.get('/', Controller.getInformation)

export default router