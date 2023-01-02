import expresss from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import studentsRoute from './routes/students.js'
import userRoute from './routes/userRoute.js'
import mongoDBconnect from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';



// init expresss
 const app = expresss();
 dotenv.config();

// middlewares 
app.use(expresss.json());
app.use(expresss.urlencoded({ extended : false }));
app.use(cookieParser());

// init env variables
const PORT = process.env.SERVER_PORT

// routes 
app.use('/api/user', userRoute );
app.use('/api/student', studentsRoute);



// Express errorhandler
app.use( errorHandler )


 // listen server
 app.listen( PORT, () => {
    mongoDBconnect();
    console.log(`Server is runing on port ${PORT}`.bgGreen.black);
 })