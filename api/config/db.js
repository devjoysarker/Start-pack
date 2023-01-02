 import mongoose  from "mongoose";

 // Create a mongoDB Connection

 const mongoDBconnect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_STRING);
        console.log(`Mongo DB connection Done`.bgBlue.black);
    } catch (error) {
        console.log(`error`.bgRed.black);
    }
 }

 export  default mongoDBconnect