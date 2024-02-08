const express = require("express");
const {
  addInterview,
  create,
  enrollInInterview,
  deallocate,
} = require("../controllers/interviewController");
const router = express.Router();

router.get("/add-interview", addInterview);

router.post("/create", create);

router.post("/enroll-in-interview/:id", enrollInInterview);

router.get("/deallocate/:studentId/:interviewId", deallocate);

module.exports = router;
