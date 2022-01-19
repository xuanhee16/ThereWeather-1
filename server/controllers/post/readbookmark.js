const { bookmark } = require("../../models");

module.exports = async (req, res) => {
  //res.send()
  // console.log("readbookmark");
  // console.log(req.body);
  const { user_id, post_id } = req.body;
  const postbook = await bookmark.findOne({
    where: {
      user_id: user_id,
      post_id: post_id,
    },
  });
  if (!postbook) {
    res.send("북마크없음");
  } else {
    res.send(postbook);
  }
};
