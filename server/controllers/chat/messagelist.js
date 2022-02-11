const { post } = require("../../models");
const { user } = require("../../models");
const { room } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  post: async (req, res) => {
    //show
    let chatcontentList = await room.findAll({
      where: {
        // user_id: req.body.user_id,
        // receiver_id: req.body.receiver_id,
        roomName: req.body.roomName,
        // chatcontent: req.body.chatcontent,
      },
    });
    // console.log(updateContents)

    res.send(chatcontentList);
  },
  put: async (req, res) => {
    //post
    await room.create({
      user_id: req.body.user_id,
      receiver_id: req.body.receiver_id,
      roomName: req.body.roomName,
      chatcontent: req.body.chatcontent,
    });
    res.send("정상완료");
  },
};
