const express = require("express");
const {
  addStudent,
  update,
  editStudent,
  create,
  destroy,
} = require("../controllers/studentController");
const router = express.Router();

// add  Student page
router.get("/add-student", addStudent);

// update student
router.post("/update/:id", update);

// Edit page
router.get("/edit-student/:id", editStudent);

// create new Student
router.post("/create", create);

// Delete student
router.get("/destroy/:studentId", destroy);

module.exports = router;
