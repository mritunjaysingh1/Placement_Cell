const Interview = require("../models/interview");
const Student = require("../models/student");

// addInterview page
module.exports.addInterview = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_interview", {
      title: "Schedule An Interview",
    });
  }

  return res.redirect("/");
};

// creating new interview
module.exports.create = async (req, res) => {
  try {
    const { company, date } = req.body;

    await Interview.create(
      {
        company,
        date,
      },
      (err, Interview) => {
        if (err) {
          return res.redirect("back");
        }
        return res.redirect("back");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// Enrolling student 
module.exports.enrollInInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id);
    const { email, result } = req.body;

    if (interview) {
      let student = await Student.findOne({ email: email });
      if (student) {
      
        let alreadyEnrolled = await Interview.findOne({
          "students.student": student.id,
        });

        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
            );
            return res.redirect("back");
          }
        }

        let studentObj = {
          student: student.id,
          result: result,
        };

  
        await interview.updateOne({
          $push: { students: studentObj },
        });

        // updating interview of student
        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: result,
        };
        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        console.log(
          "success",
          `${student.name} enrolled in ${interview.company} interview!`
        );
        return res.redirect("back");
      }
      return res.redirect("back");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("error", "Error in enrolling interview!");
  }
};

// deallocating students from an interview
module.exports.deallocate = async (req, res) => {
  try {
    const { studentId, interviewId } = req.params;

   
    const interview = await Interview.findById(interviewId);

    if (interview) {
      
      await Interview.findOneAndUpdate(
        { _id: interviewId },
        { $pull: { students: { student: studentId } } }
      );

      // remove interview from student's schema using interview's company
      await Student.findOneAndUpdate(
        { _id: studentId },
        { $pull: { interviews: { company: interview.company } } }
      );
      return res.redirect("back");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("error", "Couldn't deallocate from interview");
  }
};
