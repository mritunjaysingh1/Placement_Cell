const express = require("express");
const passport = require("passport");
const { dashboard } = require("../controllers/dashBoardController");
const { downloadCSVReport } = require("../controllers/reportController");

// requiring files
const {
  profile,
  updateUser,
  signIn,
  signUp,
  create,
  createSession,
  destroySession,
} = require("../controllers/userController");
const router = express.Router();

router.get("/profile", passport.checkAuthentication, profile);

//update user profile
router.post("/update", passport.checkAuthentication, updateUser);

// route for dashboard
router.get("/dashboard", dashboard);

router.get("/", signIn);

router.get("/sign-up", signUp);

router.post("/create", create);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  createSession
);

router.get("/sign-out", destroySession);

router.get("/download", downloadCSVReport);

module.exports = router;
