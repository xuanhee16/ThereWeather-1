const { user } = require("../../models")
const { isAuthorized } = require("../tokenFunc/index")

module.exports = {
    get: async (req, res) => {
        console.log("여긴 users/auth/")
        // console.log(req.headers.authorization)
        // console.log(isAuthorized(req))
        const data = isAuthorized(req)
        console.log(data)

        if (data) {
            res.status(213).send({ login: true, data: data })
        } else {
            res.status(420).send("토큰이 유효하지 않다")
        }
    },
}
