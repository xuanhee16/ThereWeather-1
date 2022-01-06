const { user } = require("../../models");
const { getAccessToken, sendToken } = require("../tokenFunc")
const axios = require("axios");

module.exports = async(req, res) => {
    // res.send()
    // console.log(req)
    // console.log(req.headers.authorization)

    const access_token = req.headers.authorization;
    if(!access_token){
        return res.status(401).send("카카오 인증 오류")
    }else{
        sendToken(res, access_token)
    }
}