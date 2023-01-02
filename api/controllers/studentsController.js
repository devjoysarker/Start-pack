import Student from "../models/Student.js"
import bcrypt from "bcrypt"
import createError from "./errorControllers.js";
/**
 * @access public
 * @route /api/student
 * @method Get
 */

export const getAllStudents = async (req,res,next) => {

    try {
      const Students = await Student.find();
       res.status(200).json(Students);
    } catch (error) {
     next(error);
    }

}
/**
 * @access public
 * @route /api/student/:id
 * @method Get
 */

export const getSinglestudent = async (req, res, next) => {
    const { id } = req.params
    try {
        const student = await Student.findById(id);

        if ( !student ) {
         return next(createError(404,"Student not found"))
        }

        if( student ) {
         res.status(200).json(student)
        }

      } catch (er) {
         next(er)
      }
}

/**
 * @access public
 * @route /api/student
 * @method Post
 */

export const createStudent = async (req,res,next) => {

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password,salt)

    try {
        const students = await Student.create({...req.body, password : hash_pass});
         res.status(200).json(students)
      } catch (error) {
         next(error);
      }
}
/**
 * @access public
 * @route /api/student/:id
 * @method put || patch
 */

export const updateStudent = async (req,res,next) => {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(req.body.password,salt)

        const { id } = req.params
    try {
        const student = await Student.findByIdAndUpdate(id,{...req.body,password : hash_pass},{ new : true})
         res.status(200).json(student)
      } catch (error) {
         next(error);
      }
}
/**
 * @access public
 * @route /api/student/:id
 * @method delete
 */

export const deleteStudent = async (req,res,next) => {
    const { id } = req.params
    try {
        const student = await Student.findByIdAndDelete(id)
         res.status(200).json(student)
      } catch (error) {
         next(error);
      }
}