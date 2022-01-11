const { post } = require("../../models");
const { user } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    console.log("여긴 /post/location");
    console.log(req.query);

    //포스트의 모든 정보를 긁어옵니다 - hoon
    let positions = "";
    if (req.query.weather === "") {
      const postAll = await post.findAll({
        where: {
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - 12 * 60 * 60 * 1000),
          },
        },
      });
      positions = postAll.map((el) => el.dataValues);
    } else {
      const postAll = await post.findAll({
        where: {
          weather: req.query.weather,
        },
      });
      positions = postAll.map((el) => el.dataValues);
    }
    //긁어온정보에서 dataValues의 값만 추출합니다.-hoon

    res.status(210).send({
      positions: positions,
    });
  },
};
