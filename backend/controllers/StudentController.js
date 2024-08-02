const { mySqlConnection } = require("../config/db");

//GET STUDENT
const getStudentlist = async (req, res) => {
  try {
    const data = await mySqlConnection.query(`SELECT * FROM students`);
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: "data not found/unable to get data from server",
        success: false,
        status: "failed",
      });
    } else {
      res.status(200).send({
        message: "data fetched successfully",
        StudentCount : data[0].length,
        data: data[0],
        success: true,
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error, check try catch block",
      success: false,
      status: failed,
    });
  }
};

//GET STUDENT BY ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      res.status(400).send({
        success: false,
        status: "failed",
        message: "student id is required",
      });
    }
    const [existingStudent] = await mySqlConnection.query(`SELECT id FROM students WHERE id = ?`, [studentId]);

    if(existingStudent.length===0){
        return res.status(404).send({
            status: "failed",
            success: false,
            message: "Student not found/wrong id has been given in the url",
            length : existingStudent.length
          });
    }

    const [data] = await mySqlConnection.query(
      `SELECT * FROM students WHERE id = ?`,
      [studentId]
    );
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: "data not found/unable to get data from server",
        success: false,
        status: "failed",
      });
    } else {
      res.status(200).send({
        message: "data fetched by id successfully",
        success: true,
        status: "success",
        data: data[0],
      });
    }
  } catch (error) {
    console.log(error);
    req.status(500).send({
      message: "server error, check try catch block when getting student by id",
      success: false,
      status: "failed",
    });
  }
};

//CREATE STUDENT
const createStudentList = async (req, res) => {
  try {
    const { name, email, age, gender } = req.body;
    if (!name || !email || !age || !gender) {
      res.status(400).send({
        success: false,
        status: "failed",
        message: "all fields are required",
      });
    }
    const data = await mySqlConnection.query(
      `INSERT INTO students (name , email , age , gender) VALUES ( ? , ? , ? , ?)`,
      [name, email, age, gender]
    );
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: "data not found/unable to create",
        success: false,
        status: "failed",
      });
    } else {
      res.status(200).send({
        message: "data created successfully",
        success: true,
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error while creating student, check try catch block",
      success: false,
      status: "failed",
    });
  }
};

//UPDATE STUDENT
const updateStudentList = async (req, res) => {
  try {
    const { name, email, age, gender } = req.body;
    const studentId = req.params.id;
    if (!studentId) {
      res.status(400).send({
        success: false,
        status: "failed",
        message: "student id is required",
      });
    }
    const [existingStudent] = await mySqlConnection.query(
      `SELECT id FROM students WHERE id = ?`,
      [studentId]
    );

    if (existingStudent.length === 0) {
      return res.status(404).send({
        status: "failed",
        success: false,
        message: "Student not found/wrong id has been given in the url",
      });
    }
    const data = await mySqlConnection.query(
      `UPDATE students SET name = ? , email = ? , age = ? , gender = ? WHERE id = ?`,
      [name, email, age, gender, studentId]
    );
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: "data not found/unable to update",
        success: false,
        status: "failed",
      });
    } else {
      res.status(200).send({
        message: "data updated successfully",
        success: true,
        status: "success",
        data: data[0],
      });
    }
  } catch (error) {
    console.log(error);
    req.status(500).send({
      message: "server error while updating student, check try catch block",
      success: false,
      status: "failed",
    });
  }
};

//DELETE STUDENT
const deleteStudentList = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      res.status(400).send({
        success: false,
        status: "failed",
        message: "student id is required",
      });
    }
    const [existingStudent] = await mySqlConnection.query(
      `SELECT id FROM students WHERE id = ?`,
      [studentId]
    );

    if (existingStudent.length === 0) {
      return res.status(404).send({
        status: "failed",
        success: false,
        message: "Student not found/wrong id has been given in the url",
      });
    }
    const data = await mySqlConnection.query(
      `DELETE FROM students WHERE id = ?`,
      [studentId]
    );
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: "data not found/unable to delete",
        success: false,
        status: "failed",
      });
    } else {
      res.status(200).send({
        message: "data deleted successfully",
        success: true,
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    req.status(500).send({
      message: "server error while deleting student, check try catch block",
      success: false,
      status: "failed",
    });
  }
};

//exports
module.exports = {
  getStudentlist,
  createStudentList,
  updateStudentList,
  deleteStudentList,
  getStudentById
};
