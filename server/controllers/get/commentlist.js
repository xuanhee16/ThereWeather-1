// 댓글목록 불러오기
// 좋아요 횟수 불러오기
const { comment, like } = require("../../models")

module.exports = async(req, res) => {
  // console.log("commentlist query: ", req.query); // post_id
  let commentList = await comment.findAll({
    where: {
      post_id: req.query.post_id,
    }
  })

  res.send(commentList)
}