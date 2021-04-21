import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Activity from '../models/activityModel.js'

const router = express.Router()

//@desc fetch all activities
//route GET /api/activity
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const activities = await Activity.find({})
    res.json(activities)
  })
)

//@desc fetch an activity
//route GET /api/activity/:name
router.get(
  '/:name',
  expressAsyncHandler(async (req, res) => {
    const activity = await Activity.find({ name: req.params.name })

    if (activity) {
      res.json(activity)
    } else {
      res.status(404)
      throw new Error('Activity not found')
    }
  })
)

export default router
