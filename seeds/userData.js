const { User } = require("../models");

const userData = [
  {
    username: "gmgabrie",
    email: "ggabriel420@gmail.com",
    password: "password",
  },
  {
    username: "testuser",
    email: "testuser@test.com",
    password: "password",
  },
  {
    username: "sgabriel",
    email: "selenaholston@mac.com",
    password: "password",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
