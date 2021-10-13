import express from 'express'
const router = express.Router()
import { addEmail } from '../controllers/newsletterController.js'

router.route('/api/newsletter').post(addEmail)

export default router
