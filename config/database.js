import mongoose from 'mongoose'
import colors from 'colors'
import ConsoleHelperBackend from '../ConsoleHelperBackend.js'

const connectDatabase=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        ConsoleHelperBackend(`Connected to Mongo Database ${connect.connection.host}`.bgBlue.white)
    } catch (error) {
        ConsoleHelperBackend(`Error in MongoDB ${error}`.bgRed.white)
    }
}
export default connectDatabase;