const { comment } = require("../../models");

module.exports = async (req, res) => {
  console.log("commentlist query: ", req.query);
  let commentList = await comment.findAll({
    where: {
      post_id: req.query.post_id,
    },
  });

  res.send(commentList);
};
