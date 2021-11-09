const { post } = require("../../models")
const { user } = require("../../models")
const { room } = require("../../models")
const { Op } = require("sequelize")

module.exports = {
    post: async (req, res) => {
        console.log(req.body)
        console.log("여긴 /chat/rooms")
        const roomfind = await room.findOne({
            where: {
                user_id: req.body.user_id,
                roomlist: req.body.roomlist,
            },
        })

        if (roomfind) {
            res.status(250).send("이미 존재함")
        } else {
            await room.create({
                user_id: req.body.user_id,
                roomlist: req.body.roomlist,
                chatcontent: "[]",
            })
            await room.create({
                user_id: req.body.opponent,
                roomlist: req.body.roomlist,
                chatcontent: "[]",
            })
            let roomlists = await room.findAll({
                where: {
                    user_id: req.body.user_id,
                },
            })
            let roomlistsmap = roomlists.map((el) => {
                delete el.dataValues.chatcontent
                delete el.dataValues.id
                delete el.dataValues.user_id
                delete el.dataValues.createdAt
                delete el.dataValues.updatedAt
                return el.dataValues.roomlist
            })
            res.send(roomlistsmap)
            // console.log(roomlistsmap)
        }
    },
    get: async (req, res) => {
        console.log(req.query)
        console.log("여긴 /chat/rooms 의 get")
        let roomlists = await room.findAll({
            where: {
                user_id: req.query.user_id,
            },
        })
        // console.log(roomlists)
        if (!roomlists) {
            res.send("일치하는 방이름 없음")
        } else {
            let roomlistsmap = roomlists.map((el) => {
                delete el.dataValues.chatcontent
                delete el.dataValues.id
                delete el.dataValues.user_id
                delete el.dataValues.createdAt
                delete el.dataValues.updatedAt
                return el.dataValues.roomlist
            })
            // console.log(roomlistsmap)
            res.send(roomlistsmap)
        }
    },
}
