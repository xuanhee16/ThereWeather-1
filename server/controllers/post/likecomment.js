const { like, comment } = require("../../models");
const user = require("../../models/user");

module.exports = async(req, res) => {
  // console.log("likecomment : ", req.body);
  const {user_id, post_id, comment_id, like_count} = req.body;

  const liked = await like.findOne({
    where: {
      user_id: user_id,
      post_id: post_id,
      comment_id: comment_id,
    }
  })

  //좋아요 해제 하면 그 수만 -1 
  if(liked){
      await liked.destroy()   
      const totalCount = await like.findAll({
        attributes: ['like_count'] - 1
      })
      // await liked.destroy()   
      // console.log(totalCount)
     res.send(totalCount)  
  }
  else{
    // like 테이블에 좋아요 기록
    const newLike = await like.create({
      user_id: user_id,
      post_id: post_id,
      comment_id: comment_id,
      like_count: like_count + 1
    })
    if(newLike){ //좋아요가 기록됐다면 갯수만 뽑기 
      const totalCount = await like.findAll({
        attributes: ['like_count']
      })
      // console.log(totalCount)
     res.send(totalCount)
    }
  }
}
