import mongoose from 'mongoose'
import colos from 'colors'

const connectDatabase=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to Mongo Database ${connect.connection.host}`.bgBlue.white)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}
export default connectDatabase;