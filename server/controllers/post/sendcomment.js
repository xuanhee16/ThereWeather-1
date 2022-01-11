const { comment } = require("../../models")

module.exports = async(req, res) => {
  console.log("sendcomment.js : ",req.body);
  const {post_id, comment_user_id, comment_content} = req.body;
  await comment.create({
    post_id: post_id,
    comment_user_id: comment_user_id,
    comment_content: comment_content,
  });

  res.status(205).send("OK");
}