const { user } = require("../../models")
const { isAuthorized } = require("../tokenFunc/index")

module.exports = {
    get: async (req, res) => {
        console.log("여긴 users/auth/")
        // console.log(req.headers.authorization)
        // console.log(isAuthorized(req))

        if (isAuthorized(req)) {
            res.status(213).send(true)
        } else {
            res.status(413).send("토큰이 유효하지 않다")
        }
    },
}
