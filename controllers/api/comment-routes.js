const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utlis/auth");

// get comments ('api/comment')
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    if (dbCommentData.length === 0) {
      res.status(404).json({ message: "No comments found" });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all the comments from 1 post
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    if (commentData.length === 0) {
      res.status(404).json({ message: `No comments found` });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment: req.body.comment,
      postId: req.body.postId,
      user_id: req.session.userId,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;
