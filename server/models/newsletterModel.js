import mongoose from 'mongoose'

const newsletterSchema = mongoose.Schema({
  name: { type: String, required: true },
})

const Newsletter = mongoose.model('Newsletter', newsletterSchema)
export default Newsletter
