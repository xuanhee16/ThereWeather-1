const { checkAuthAccessToken } = require("../tokenFunc");
const { user } = require("../../models");

module.exports = async (req, res) => {
    const accessTokenData = checkAuthAccessToken(req);
    if(!accessTokenData){
        return res.json({ data: null, message: "유효하지 않은 토큰입니다." })
    } 
    const { user_id, nickname } = accessTokenData;
    user.findOne({ 
        where: { 
            user_id, nickname
          } 
    })
    .then((data) => {
        if(!data){
            return res.json({ data: null, message: "토큰을 재발급 해주세요." })
        }
        //delete data.dataValues.password;
        return res.json({ data: { userInfo: data.dataValues }, message: "ok" })
    })
    // res.send()
    .catch((err) => {
        console.log(err)
    })
}
//패스워드 복호화 필요 