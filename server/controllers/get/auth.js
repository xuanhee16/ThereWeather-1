const { isAuthorized } = require("../tokenFunc");
const { user } = require("../../models");

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    return res.json({ data: null, message: "유효하지 않은 토큰입니다." });
  }
  const { user_id, nickName } = accessTokenData;
  user
    .findOne({
      where: {
        user_id,
        nickName,
      },
    })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "토큰을 재발급 해주세요.",
        });
      }
      delete data.dataValues.password;
      return res.json({
        data: { userInfo: data.dataValues },
        message: "ok",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
