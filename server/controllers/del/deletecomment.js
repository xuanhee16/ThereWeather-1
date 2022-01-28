const { isAuthorized } = require("../tokenFunc");
const { comment, user } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.body);
  const accessToken = isAuthorized(req);
  const { user_id } = accessToken;
  const { comment_id, comment_user_id } = req.body;
  console.log(accessToken.user_id);

  if (!accessToken) {
    return res.status(401).send("로그인 정보를 확인해주세요.");
  } else {
    const checkUser = await comment.findOne({
      where: {
        comment_user_id: user_id,
        id: comment_id,
      },
    });
    if (!checkUser) {
      res.send("댓글 작성자가 아닙니다.");
    } else {
      comment.destroy({
        where: {
          id: comment_id,
          comment_user_id: comment_user_id,
        },
      });
      res.send("댓글을 삭제하였습니다.");
    }
  }
};
