const { user } = require("../../models")

module.exports = {
    post: async (req, res) => {
        console.log("여긴 users/signup/")
        console.log(req.body)

        //id중복검사와 닉네임 중복검사를 서버가 함.
        //id중복검사

        const user_Id_FindOne = await user.findOne({
            where: {
                user_Id: req.body.user_Id,
            },
        })
        const nickName_FindOne = await user.findOne({
            where: {
                nickName: req.body.nickName,
            },
        })

        if (user_Id_FindOne) {
            //id중복
            res.status(211).send("id중복")
        } else if (nickName_FindOne) {
            //id중복
            res.status(212).send("닉네임중복")
        } else {
            //정상의경우
            console.log("중복이 아닙니다.")
            await user.create({
                user_Id: req.body.user_Id,
                password: req.body.password,
                nickName: req.body.nickName,
                gender: req.body.gender,
                location: req.body.location,
                user_Photo: req.body.user_photo,
            })

            res.status(210).send("signup ok")
        }
    },
}
