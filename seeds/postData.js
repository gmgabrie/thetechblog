const { Posts } = require("../models");

const postdata = [
  {
    title: "Commenting Code",
    content: "Be sure to add descriptive comments to your code.",
  },
];

const seedPosts = () => Posts.bulkCreate(postdata);

module.exports = seedPosts;
