const { like, comment } = require("../../models")

module.exports = async(req, res) => {
  // console.log("likecomment : ", req.body);
  const {user_id, post_id, comment_id, like_count} = req.body;
  console.log("likecommnet : ", req.body);

  const liked = await like.findOne({
    where: {
      user_id: user_id,
      post_id: post_id,
      comment_id: comment_id,
    }
  })

  if(liked){
    await liked.destroy()
    res.send("좋아요 해제")
  }else{
    // like 테이블에 좋아요 기록
    await like.create({
      user_id: user_id,
      post_id: post_id,
      comment_id:  comment_id
    })

    res.status(200).send({message: "ok"})
  }

  // comment table에 해당 댓글에 +1
  // let user = comment.findOne({
  //   where: {
  //     post_id: post_id,
  //     comment_id: comment_id
  //   }
  // })
  // console.log("user : ", user);

  // user.increment(
  //   'like_count',
  //   {by: 1}
  // )




  // 좋아요 클릭시 +1 -> like 테이블 like컬럼 + 1 -> 댓글목록에서 합계
  // 좋아요 해제시 -1 -> like 테이블 삭제 -> 댓글목록 합계에서 -1
  
  // 좋아요 클릭시 -> comment 테이블 like_count 컬럼 + 1
  // 좋아요 해제시 -> comment 테이블 like_count 컬럼 - 1
}
