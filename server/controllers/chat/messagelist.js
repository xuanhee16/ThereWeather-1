const { post } = require("../../models")
const { user } = require("../../models")
const { room } = require("../../models")
const { Op } = require("sequelize")

module.exports = {
    post: async (req, res) => {
        // console.log(req.body)
        // console.log("여긴 /chat/messagelist post")

        const updateContents = await room.update(
            { chatcontent: req.body.chatcontent },
            {
                where: {
                    roomlist: req.body.roomlist,
                },
            }
        )
        // console.log(updateContents)

        res.send("정상완료")
    },
    get: async (req, res) => {
        // console.log("req.query.roomlist= " + req.query.roomlist)
        // console.log("여긴 /chat/messagelist 의 get")

        let contentlists = await room.findAll({
            where: {
                roomlist: req.query.roomlist,
            },
        })

        if (!contentlists) {
            res.send([""])
        } else {
            let contentlist = contentlists.map((el) => {
                delete el.dataValues.id
                delete el.dataValues.user_id
                delete el.dataValues.roomlist
                delete el.dataValues.createdAt
                delete el.dataValues.updatedAt
                return el.dataValues.chatcontent
            })
            // console.log(contentlist[0])
            res.send(contentlist[0])
            // res.send()
        }

        // let roomlist = roomlists.dataValues

        // delete roomlists.dataValues.id
        // delete roomlist.user_id
        // delete roomlist.roomlist
        // delete roomlist.createdAt
        // delete roomlist.updatedAt

        // console.log(roomlists)

        // console.log(roomlists)
        // if (!roomlists) {
        //     res.send("일치하는 방이름 없음")
        // } else {
        //     let roomlistsmap = roomlists.map((el) => {
        //         delete el.dataValues.chatcontent
        //         delete el.dataValues.id
        //         delete el.dataValues.user_id
        //         delete el.dataValues.createdAt
        //         delete el.dataValues.updatedAt
        //         return el.dataValues.roomlist
        //     })
        //     // console.log(roomlistsmap)
        //     res.send(roomlistsmap)
        // }
    },
}
