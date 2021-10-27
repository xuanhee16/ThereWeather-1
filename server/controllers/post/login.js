const { getAccessToken, getRefreshToken, sendRefreshToken, sendAccessToken } = require("../tokenFunc");
const { user } = require("../../models");

module.exports = async (req, res) => {
    const { user_id, password } = req.body;
    user.findOne({
        where: {
            user_id, password
        }
    })
    .then((data) => {
        if(!data){
            return res.json({ data: null, message: "로그인 정보가 유효하지 않습니다." })
        }
        delete data.dataValues.password;
        const accessToken = getAccessToken(data.dataValues);
        const refreshToken = getRefreshToken(data.dataValues);
        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);
    })
    .catch((err) => {
        console.log(err)
    })
    //res.send()
}