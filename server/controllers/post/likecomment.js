const { like } = require("../../models");

module.exports = async (req, res) => {
  const { user_id, post_id, comment_id } = req.body;

  const liked = await like.findOne({
    where: {
      user_id: user_id,
      comment_id: comment_id,
      post_id: post_id,
    },
  });

  if (liked) {
    //이미 좋아요가 있으면 해제
    await liked.destroy();
    res.send("좋아요 해제");
  } else {
    //좋아요가 없으면 눌림
    await like.create({
      user_id: user_id,
      comment_id: comment_id,
      post_id: post_id,
    });
    res.send("좋아요 누름");
  }
};
