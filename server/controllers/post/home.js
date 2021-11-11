const { post } = require("../../models")
const sequelize = require("sequelize")
const Op = sequelize.Op;
module.exports = async (req, res) => {
    // console.log('home.js - req : ', req.body);

    // bottom,top,left,right를 받아옴
    post.findAll({ 
        where : {
            // xLocation: {[Op.like]: req.body.lat2 + "%"}, 
            // yLocation: {[Op.like]: req.body.lon2 + "%"}
            // Op.between left-right, bottom-top 사이의 위치들에 해당하는 post 조회
            
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