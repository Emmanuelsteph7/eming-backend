const express = require("express");
const router = express.Router();

const Story = require("../models/Story");

// Get user data
// GET /getUser
router.get("/getUser", (req, res) => {
  res.json(req.user);
  // console.log(req.user);
  // console.log(req.session.passport.user);
});

router.post("/getUser", (req, res) => {
  console.log(req.user);
});

// Get stories
// GET /getStories
router.get("/getStories", async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.user.id,
    }).populate("user");

    res.json(stories);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
