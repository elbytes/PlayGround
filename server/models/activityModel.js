import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const Activity = mongoose.model('Activity', activitySchema)

export default Activity