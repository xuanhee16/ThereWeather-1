const { post } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  get: async (req, res) => {
    //카카오 데이터를 토대로 렌더링중인 동서남북 데이터를 받아와서, 구조분해할당-hoon
    const { bottom, top, left, right } = req.query;
    //findAll메시지로 현재 지도에 렌더링되고 있는, 포스트정보들을 시퀄라이즈모듈을 사용해서 위치 대소비교로 찾아온다.-hoon
    const locationPosts = await post.findAll({
      where: {
        xLocation: { [Op.between]: [left, right] },
        yLocation: { [Op.between]: [bottom, top] },
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 12 * 60 * 60 * 1000),
        },
      },
    });
    //찾아온 데이터를 입맛에 맞게 가공한다-hoon
    const locationPost = locationPosts
      .map((el) => {
        return el.dataValues;
      })
      .reverse();
    res.send(locationPost);
  },
};
