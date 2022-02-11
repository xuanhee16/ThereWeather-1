const { user } = require("../../models");
const { encrypto } = require("../get/setpw");

module.exports = {
  post: async (req, res) => {
    const { user_id } = req.body;
    const user_Id_FindOne = await user.findOne({
      where: {
        user_id,
      },
    });

    if (user_Id_FindOne) {
      //id중복
      res.status(211).send("id중복");
    } else {
      //id중복아님
      res.status(212).send("id사용가능");
    }
  },
};
