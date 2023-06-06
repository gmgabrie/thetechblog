const { Posts } = require("../models");

const postdata = [
  {
    title: "Commenting Code",
    content: "Be sure to add descriptive comments to your code.",
    user_id: 1,
  },
  {
    title: "Why is MVC so important?",
    content: "It allows developers to have a true separation of concerns.",
    user_id: 4,
  },
  {
    title: "Organization",
    content:
      "Define functions that do one mayor step each, instead of one giant script doing everything.",
    user_id: 3,
  },
];

const seedPosts = () => Posts.bulkCreate(postdata);

module.exports = seedPosts;
