const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// post a story
// POST /stories
router.post("/", async (req, res) => {
  try {
    // create is used to create a new object in a collection
    await Story.create(req.body);

    res.json({ successMsg: "Story created." });
  } catch (err) {
    console.error(err);
    res.json({
      errMsg: err,
    });
  }
});

// get public Stories
// GET /stories/public
router.get("/public", async (req, res) => {
  try {
    // find is used to search through the collection

    // populate is used to connect one collection and another. for
    // example, to connect the user for each story

    // sort({ field : criteria}). criteria can be asc, desc, ascending, descending, 1, or -1
    // desc - from newest to oldest
    // asc - from oldest to newest
    const publicStories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" });

    res.json(publicStories);
  } catch (err) {
    console.error(err);
    res.json({
      errMsg: err,
    });
  }
});

// get specific story
// GET /stories/edit/:id
router.get("/edit/:id", async (req, res) => {
  // console.log(req);
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    });

    if (!story) {
      res.json({ errorMsg: "Story does not exist." });
    }

    return res.json(story);
  } catch (err) {
    console.error(err);
    res.json({
      errMsg: err,
    });
  }
});

// edit specific story
// PUT /stories/edit/:id
router.put("/edit/:id", async (req, res) => {
  try {
    let updatedStory = await Story.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    console.log(updatedStory);
    res.json({ successMsg: "Story successfully updated" });

    // return res.json(story);
  } catch (err) {
    console.error(err);
    res.json({
      errMsg: err,
    });
  }
});

// delete specific story
// PUT /stories/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    let story = await Story.findByIdAndDelete(req.params.id);

    console.log(story);
    res.json({ successMsg: "Story successfully deleted" });

    // return res.json(story);
  } catch (err) {
    console.error(err);
    res.json({
      errMsg: err,
    });
  }
});

module.exports = router;
