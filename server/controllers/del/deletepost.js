const { isAuthorized } = require('../tokenFunc/index');
const { user, post } = require("../../models")
module.exports = async (req, res) => {
    console.log(req)
    //const accessToken = isAuthorized(req);
    // if(!accessToken){
    //     return res.status(401).send("로그인 정보를 확인해주세요.")
    // }
    //console.log("delete.js", accessToken)

}