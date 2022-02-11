const { user } = require("../../models");
const { encrypto } = require("../get/setpw");
const { isAuthorized } = require("../tokenFunc/index");

module.exports = async (req, res) => {
  const accessToken = isAuthorized(req);
  if (!accessToken) {
    return res.status(401).send("로그인 정보를 확인해주세요.");
  }
  const { user_id, nickName } = accessToken;
  const { password } = req.body;
  const enPw = encrypto(password);

  user.update(
    {
      password: enPw,
    },
    {
      where: {
        user_id: user_id,
        nickName: nickName,
      },
    }
  );
  res.status(200).send();
};
