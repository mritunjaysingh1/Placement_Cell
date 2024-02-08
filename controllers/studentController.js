const Interview = require("../models/interview");
const Student = require("../models/student");

// Add student page
module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }

  return res.redirect("/");
};

// Edit student page
module.exports.editStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (req.isAuthenticated()) {
    return res.render("edit_student", {
      title: "Edit Student",
      student_details: student,
    });
  }

  return res.redirect("/");
};

// Creat new Student
module.exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      batch,
      college,
      placementStatus,
      DSA_marks,
      React_marks,
      WEB_D_marks,
    } = req.body;

    Student.findOne({ email }, async (err, student) => {
      if (err) {
        console.log("error in finding student");
        return;
      }

      if (!student) {
        await Student.create(
          {
            name,
            email,
            college,
            batch,
            DSA_marks,
            React_marks,
            WEB_D_marks,
            placementStatus,
          },
          (err, student) => {
            if (err) {
              return res.redirect("back");
            }
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete student
module.exports.destroy = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return;
    }

    const interviewsOfStudent = student.interviews;

    if (interviewsOfStudent.length > 0) {
      for (let interview of interviewsOfStudent) {
        await Interview.findOneAndUpdate(
          { company: interview.company },
          { $pull: { students: { student: studentId } } }
        );
      }
    }

    student.remove();
    return res.redirect("back");
  } catch (err) {
    console.log("error", err);
    return;
  }
};

// update student details
module.exports.update = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const {
      name,
      college,
      batch,
      DSA_marks,
      React_marks,
      WEB_D_marks,
      placementStatus,
    } = req.body;

    if (!student) {
      return res.redirect("back");
    }

    student.name = name;
    student.college = college;
    student.batch = batch;
    student.DSA_marks = DSA_marks;
    student.React_marks = React_marks;
    student.WEB_D_marks = WEB_D_marks;
    student.placementStatus = placementStatus;

    student.save();
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
