const Interview = require("../models/interview");
const Student = require("../models/student");

module.exports.dashboard = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      
      let students = await Student.find({}).populate("interviews");

      let interviews = await Interview.find({}).populate("students.student");

      return res.render("dashboard", {
        title: "Dashboard",
        all_students: students,
        all_interviews: interviews,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
