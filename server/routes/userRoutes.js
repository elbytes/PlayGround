import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserHome,
  findUser,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/home').get(protect, getUserHome)
router.post('/search', findUser)

export default router
