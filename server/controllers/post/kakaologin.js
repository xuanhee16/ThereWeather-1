require("dotenv").config();
const { user } = require("../../models");
const { getAccessToken, getRefreshToken, sendToken } = require("../tokenFunc")
const axios = require("axios");
const kakao_id = process.env.KAKAO_ID;

module.exports = async (req, res) => {
    res.send()
}