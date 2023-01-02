
import createError from "../controllers/errorControllers.js";
import  Jwt  from "jsonwebtoken";


// Check user authenticated or not
export  const authMiddleware = (req,res,next) => {

    try {
        
        const token = req.cookies.access_token;
        // Check token
        if ( !token ) {
            return next(createError(404,"Your not authenticated"))
        }

        // Login users
        const login_user = Jwt.verify(token, process.env.JWT_SECRET);

        if (!login_user  ) {

            return next(createError(404,"Invalid token"))
        }
        
        if( login_user ) {
            req.user = login_user
            next()
        }

    } catch (error) {
        next(error)
    }
}