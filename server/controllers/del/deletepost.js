const { isAuthorized } = require('../tokenFunc/index');
const { user, post } = require("../../models")
module.exports = async (req, res) => {
    // console.log("server/deletepost.js::::::",req.body) //
    const accessToken = isAuthorized(req);
    const { post_id } = req.body;
    if(!accessToken){
        return res.status(401).send("로그인 정보를 확인해주세요.")
    }
    // console.log("delete.js", accessToken)
    const { user_id } = accessToken;
    const checkUser = await post.findOne({
        where: {
            user_id: user_id,
            id: post_id
        }
    })
    if(!checkUser){
       return res.status(401).send("게시물을 삭제할 수 없습니다.")
    }
    else{
        post.destroy({
            where: {
                // id: id
                id: post_id
            }
        })
       return res.status(205).send("삭제 완료")
    }
}