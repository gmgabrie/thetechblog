const User = require("./User");
const Comment = require("./Comment");
const Posts = require("./Posts");

User.hasMany(Posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

Comment.belongsTo(Posts, {
  foreignKey: "user_id",
});

Posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Posts.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

module.exports = { User, Comment, Posts };
