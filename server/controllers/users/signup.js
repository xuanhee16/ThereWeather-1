const { user } = require("../../models");
const { encrypto } = require("../get/setpw");

module.exports = {
  post: async (req, res) => {
    console.log("여긴 users/signup/");
    console.log(req.body);
    const { user_id, nickName, password, email } = req.body;

    const user_Id_FindOne = await user.findOne({
      where: {
        user_id,
      },
    });
    const nickName_FindOne = await user.findOne({
      where: {
        nickName,
      },
    });
    //email 중복검사 추가
    const email_FindOne = await user.findOne({
      where: {
        email,
      },
    });
    if (user_Id_FindOne) {
      //id중복
      res.status(211).send("id중복");
    } else if (nickName_FindOne) {
      //id중복
      res.status(212).send("닉네임중복");
    } else if (email_FindOne) {
      res.status(212).send("email중복");
    } else {
      //정상의경우
      const enPw = encrypto(password);
      await user.create({
        user_id: req.body.user_id,
        password: enPw,
        nickName: req.body.nickName,
        gender: req.body.gender,
        location: req.body.location,
        user_Photo: req.body.user_photo,
        email: req.body.email,
      });
      res.status(210).send("signup ok");
    }
  },
};
