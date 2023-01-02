
import bcrypt from "bcrypt"
import userModels from "../models/userModels.js";
import createError from "./errorControllers.js";
import jwt from 'jsonwebtoken'
/**
 * @access public
 * @route /api/student
 * @method Get
 */

export const getAlluser = async (req,res,next) => {

    try {
      const user =  await userModels.find();
       res.status(200).json(user);
    } catch (error) {
     next(error);
    }

}
/**
 * @access public
 * @route /api/user
 * @method Post
 */

export const createUser = async (req,res,next) => {

   // hash password
   const salt = await bcrypt.genSalt(10);
   const hash_pass = await bcrypt.hash(req.body.password,salt)

   try {
       const users = await userModels.create({...req.body, password : hash_pass});
        res.status(200).json(users)
     } catch (error) {
        next(error);
     }
}
/**
 * @access public
 * @route /api/student/:id
 * @method Get
 */

export const getSingleUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await userModels.findById(id);
        res.status(201).json(user)

      } catch (error) {
         next(error)
      }
}

/**
 * @access public
 * @route /api/student/:id
 * @method put || patch
 */

export const updateUser = async (req,res,next) => {
        // hash password
      //   const salt = await bcrypt.genSalt(10);
      //   const hash_pass = await bcrypt.hash(req.body.password,salt)

        const { id } = req.params
    try {
        const user = await userModels.findByIdAndUpdate(id,{...req.body},{ new : true})
         res.status(200).json(user)
      } catch (error) {
         next(error);
      }
}
/**
 * @access public
 * @route /api/student/:id
 * @method delete
 */

export const deleteUser = async (req,res,next) => {
    const { id } = req.params
    try {
        const user = await userModels.findByIdAndDelete(id)
         res.status(200).json(user)
      } catch (error) {
         next(error);
      }
}


/**
 * @access public
 * @route /api/user/login
 * @method Post
 */

export const userLogin = async (req,res,next) => {

   try {
     // Find user
      const login_user = await userModels.findOne( { email : req.body.email } );

      // Check user exits or not
      if( !login_user ) {
         return next(createError(404,"user not found"))
      }

      // Check password
      const passwordCheck = await bcrypt.compare(req.body.password, login_user.password);

      // password handle
       if( !passwordCheck ) {
         return next(createError(404,"Wrong password"));
       }

       // Create Token 
       const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, process.env.JWT_SECRET)

       // Login user info
       const {password, isAdmin, ...login_info} = login_user._doc;

       res.cookie("access_token",token).status(200).json({
         token :token,
         user : login_info
       })
      
   } catch (error) {
      next(error)
   }
}

/**
 * @access public
 * @route /api/user/register
 * @method Post
 */

export const userRegister = async (req,res,next) => {

   // hash password
   const salt = await bcrypt.genSalt(10);
   const hash_pass = await bcrypt.hash(req.body.password,salt)

   try {
       const users = await userModels.create({...req.body, password : hash_pass});
        res.status(200).json(users)
     } catch (error) {
        next(error);
     }
}