const router = require("express").Router();
const { User, Posts, Comment } = require("../../models");
const withAuth = require("../../utlis/auth");

// create a new post ('/api/post')
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.id,
    });
    console.log("This is the new post", newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// edit post ('/api/post/:id')
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "This id has no post" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post ('/api/post/:id')
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { postId: req.params.id },
    });

    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: `No User Id ${req.session.Id} found with id = ${req.params.id}`,
      });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
