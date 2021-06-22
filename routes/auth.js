const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with Google
// GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth callback
// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
    // res.json({ message: "successful login" });
  }
);

// Logout
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: "logout successful" });
  }
});

module.exports = router;
