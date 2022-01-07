// const { user } = require("../../models");
// const { getAccessToken, sendToken } = require("../tokenFunc")
// const axios = require("axios");

// module.exports = async(req, res) => {
    // res.send()
    // console.log(req)
    // console.log(req.headers.authorization)

    // const access_token = req.headers.authorization;
    // if(!access_token){
    //     return res.status(401).send("카카오 인증 오류")
    // }else{
    //     sendToken(res, access_token)
    // }
// }

module.exports = async(req, res) => {
    return res.redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_URI}&&response_type=code`
        //   `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=900d07591842ea31ab64a97cb7d5f8be&redirect_uri=http://localhost:3000/kakaologin&response_type=code`

        );
}
