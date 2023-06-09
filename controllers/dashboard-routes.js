const router = require("express").Router();
const { User, Posts, Comment } = require("../models");
const withAuth = require("../utlis/auth");
const sequelize = require("../config/connection");

// User's all posts ('/dashboard')
router.get("/", withAuth, (req, res) => {
  Posts.findAll({
    where: {
      user_id: req.session.userId,
    },
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "postId", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((posts) => posts.get({ plain: true }));
      res.render("dashboard", {
        posts,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get one post to edit ('dashboard/edit/:id')
router.get("/edit/:id", withAuth, (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "postId", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "This id has no post." });
        return;
      }
      const posts = dbPostData.get({ plain: true });
      res.render("editpost", {
        posts,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  Get new post ('/dashboard/new)
router.get("/newpost", withAuth, (req, res) => {
  res.render("newpost", {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

module.exports = router;
