const { post } = require("../../models")
const sequelize = require("sequelize")
const Op = sequelize.Op;
module.exports = async (req, res) => {
    // 현재 위치 날씨 정보
    // 현재 위치 게시글 (최신순)
    // console.log('home.js - req : ', req.body);

    post.findAll({ 
        where : {
            xLocation: {[Op.like]: req.body.lat2 + "%"}, 
            yLocation: {[Op.like]: req.body.lon2 + "%"}
        },
        limit : 9 , 
        order :  [['createdAt', 'DESC']]
    })
    .then((currentPost) => {
        console.log('currentPost 들어온 데이터 : ', currentPost);
        if(!currentPost){
            res.status(422).send("post 없음")
        }else{
            res.status(202).send(currentPost.map((el) => {
                return el.dataValues
            }))
        }
    })
}