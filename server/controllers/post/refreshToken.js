const { getAccessToken, checkAuthRefreshToken, resendAccessToken } = require("../tokenFunc");
  const { user } = require("../../models");
  
  module.exports = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      return res.status(403).json({ data:null, message: "refreshToken이 유효하지 않습니다." });
    }
  
    const refreshTokenData = checkAuthRefreshToken(refreshToken);
    if (!refreshTokenData) {
      return res.status(400).json({ data:null, message: "재로그인을 해주세요." });
    }
  
    const { user_id, nickName } = refreshTokenData;
      user.findOne({
        where: {
          user_id, nickName
        }
      })
      .then((data) => {
        if (!data) {
          return res.status(400).json({
            data: null,
            message: "refresh token has been tempered",
          });
        }
        delete data.dataValues.password;
  
        const newAccessToken = getAccessToken(data.dataValues);
        resendAccessToken(res, newAccessToken, data.dataValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };