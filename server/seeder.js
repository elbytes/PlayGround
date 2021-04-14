import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import activityList from './data/activityList.js'
import User from './models/userModel.js'
import Activity from './models/activityModel.js'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

const importData = async () =>{
    try {
        await User.deleteMany()
        await Activity.deleteMany()

        await User.insertMany(users)
        await Activity.insertMany(activityList)

        console.log('Data imported')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () =>{
    try {
        await User.deleteMany()
        await Activity.deleteMany()

        console.log('Data destroyed')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] == '-d'){
    destroyData()
} else{
    importData()
}