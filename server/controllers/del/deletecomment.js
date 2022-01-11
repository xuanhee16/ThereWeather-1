const { isAuthorized } = require('../tokenFunc/index');
const { comment, user } = require("../../models")

module.exports = async(req, res) => {
  const accessToken = isAuthorized(req);
  const { comment_id } = req.body; // 댓글아이디
  const { user_id } = accessToken

  if(!accessToken) {
    return res.status(401).send("로그인 정보를 확인해주세요.")
  }
  const checkUser = await user.findOne({
    where: {
      user_id: user_id
    }
  })
  
  if(!checkUser){
    res.send("댓글 작성자가 아닙니다.")
  }else{
    comment.destroy({
      where: {
        id: comment_id,
      },
    })
  }
  
  res.send("삭제 완료")
}
