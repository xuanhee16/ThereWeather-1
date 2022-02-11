const { user } = require("../../models");

module.exports = async (req, res) => {
  const { nickName, email } = req.body;
  await user
    .findOne({
      where: {
        nickName: nickName,
        email: email,
      },
    })
    .then((res) => res.dataValues)
    .then((userinfo) => {
      const { nickName, user_id } = userinfo;
      return {
        nickName: nickName,
        user_id: user_id,
      };
    })
    .then((userdata) => {
      res.send(userdata);
    });
};
