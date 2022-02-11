const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunc/index");

module.exports = async (req, res) => {
  const accessToken = isAuthorized(req);
  const { user_id } = accessToken;
  const { user_photo, location } = req.body;

  await user.update(
    {
      user_Photo: user_photo,
      location: location,
    },
    {
      where: {
        user_id: user_id,
      },
    }
  );
  res.status(200).send("수정 완료");
};
