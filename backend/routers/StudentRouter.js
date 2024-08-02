
//imports
const express = require('express')
const { getStudentlist , createStudentList, updateStudentList ,deleteStudentList , getStudentById} = require('../controllers/StudentController')
//created router
const router = express.Router()

//getting students data router
router.get("/getstudents", getStudentlist)


//getting student data by id router
router.get("/getstudents/:id", getStudentById)


//creating students data router
router.post("/create", createStudentList)


//updating students data router
router.put("/update/:id", updateStudentList)

//delete students data router
router.delete("/delete/:id", deleteStudentList)


//exports
module.exports = router