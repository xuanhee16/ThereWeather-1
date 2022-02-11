const { post } = require("../../models");

module.exports = async (req, res) => {
  const { searchID, page, capa } = req.query;
  const userPostList = await post.findAll({
    where: {
      user_id: searchID,
    },
    order: [["createdAt", "ASC"]],
  });
  const userPost = userPostList.map((post) => post.dataValues);
  let userPostlength = [];
  for (let n = 1; n <= Math.ceil(userPost.length / capa); n++) {
    await userPostlength.push(n);
  }
  if (!userPost) {
    res.status(422).send("post 없음");
  } else {
    res.status(202).send({
      length: userPostlength,
      data: userPost.slice(page * capa - capa, page * capa),
    });
  }
};
