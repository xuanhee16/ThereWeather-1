const { like } = require("../../models")

module.exports = async(req, res) => {
    const { user_id, post_id, comment_id } = req.body;

    const checkLike = await like.findOne({
      where: {
        user_id: user_id,
        post_id: post_id,
        comment_id: comment_id,
      }
    })
  
      if(checkLike){ 
        const totalCount = await like.findAll({
          attributes: ['like_count']
        })
        // console.log(totalCount)
       res.send(totalCount)
      }
}
