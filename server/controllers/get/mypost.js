const { post } = require("../../models");

module.exports = async (req, res) => {
  //res.send()
  //console.log(req.query)//{ searchID: 'kimcoding1' }
  const { searchID, page, capa } = req.query;
  console.log(req.query);

  const userPostList = await post.findAll({
    where: {
      user_id: searchID,
    },
    // limit: 2,
    order: [["createdAt", "ASC"]],
  });
  // .then((userPost) => {
  //   console.log(userPost);
  const userPost = userPostList.map((post) => post.dataValues);
  let userPostlength = [];
  for (let n = 1; n <= Math.ceil(userPost.length / capa); n++) {
    await userPostlength.push(n);
  }
  //   userPost.slice(,)

  if (!userPost) {
    res.status(422).send("post 없음");
  } else {
    console.log({
      length: userPostlength,
      data: userPost.slice(page * capa - capa, page * capa),
    });
    res.status(202).send({
      length: userPostlength,
      data: userPost.slice(page * capa - capa, page * capa),
    });
  }
  // });
};
