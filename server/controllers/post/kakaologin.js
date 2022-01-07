// require("dotenv").config();
const { user } = require("../../models");
const { getAccessToken, sendToken } = require("../tokenFunc")
// const axios = require("axios");

module.exports = async (req, res) => {
    // res.send()
    // console.log(req.headers.authorization)
    // console.log(req.body)
    //클라이언트에서 카카오 로그인 팝업 띄워서 동의화면 체크후 
    //success 콜백함수로 카카오 사용자 토큰 받음
    //백엔드로 토큰을 넘겨서 다시 사이트 토큰 발급 후(+해당하는 id가 없으면 디비에 저장) 
    //클라이언트로 다시 넘겨서 로컬스토리지에 저장하고 history.push로 사이트 이동시키기 
    const { user_id, nickName, gender, user_Photo } = req.body;
     try{
      const [userInfo, created] = await user.findOrCreate({
        where: {
          user_id: user_id
        },
        defaults: {
          user_id: user_id,
          nickName: nickName,
          gender: gender,
          user_Photo: user_Photo
        }
      })
      delete userInfo.dataValues.password
      const accessToken = getAccessToken(userInfo.dataValues)
      sendToken(res, accessToken)
     }
     catch(err){
       console.log(err)
     }

    //res.status(201).send("카카오 로그인 성공")
}