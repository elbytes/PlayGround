import bodyParser from 'body-parser'
import asyncHandler from 'express-async-handler'
import Newsletter from '../models/newsletterModel.js'

export const addEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  const emailExists = await newsletter.findOne({ email })
  console.log('getting')
  if (emailExists) {
    res.status(400)
    throw new Error('You have already been added to the list of subscribers')
  }

  const emailAdded = await Newsletter.create({ email })

  if (emailAdded) {
    res.status(201).json({ message: 'You will get the most recent updates!' })
  } else {
    res.status(400)
    throw new Error('Something went wrong. Try contacting support.')
  }
})
