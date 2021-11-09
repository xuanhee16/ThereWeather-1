const { post } = require("../../models")

module.exports = async (req, res) => {
    // 현재 위치 날씨 정보
    // 현재 위치 게시글 (최신순)
    // res.send()
    res.send(await post.findAll({ 
        limit : 9 , 
        order :  [['createdAt', 'DESC']]
    }))
}