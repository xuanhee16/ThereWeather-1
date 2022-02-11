const { bookmark } = require("../../models");

module.exports = async (req, res) => {
  const { user_id, post_id } = req.body;
  const mark = await bookmark.findOne({
    where: {
      user_id: user_id,
      post_id: post_id,
    },
  });
  let marked;
  //저장한 내역이 있으면 삭제
  if (mark) {
    await mark.destroy();
    res.send("북마크가 해제되었습니다.");
  }
  //저장한 내역이 없으면 저장
  else {
    marked = await bookmark.create({
      user_id: user_id,
      post_id: post_id,
    });
    marked = marked.get({ plain: true });
    res.send("북마크에 저장되었습니다.");
  }
};
