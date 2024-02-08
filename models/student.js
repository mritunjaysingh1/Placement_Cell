const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    DSA_marks: {
      type: Number,
      required: true,
    },
    WEB_D_marks: {
      type: Number,
      required: true,
    },
    React_marks: {
      type: Number,
      required: true,
    },
    placementStatus: {
      type: String,
      enum: ["Placed", "Not placed"],
      required: true,
    },
    interviews: [
      {
        company: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
