require("dotenv").config();
const { user } = require("../../models");
const { getAccessToken, getRefreshToken, sendToken } = require("../tokenFunc")
const axios = require("axios");
const kakao_id = process.env.KAKAO_ID;

// module.exports = async (req, res) => {
    // res.send()
    // console.log(req.query)
    // const { user_id, nickName, gender, user_Photo } = req.body;
    //  try{
    //   const kakakoUser = await user.findOne({
    //       where: {
    //         user_id
    //       }
    //   })
    //   if(kakakoUser){
    //     return res.status(201).send("카카오 로그인 성공!")
    //   }else{
    //     await user.create({
    //       user_id: user_id,
    //       nickName: nickName,
    //       gender: gender,
    //       user_Photo: user_Photo
    //     })
    //   }
    //  }
    //  catch(err){
    //    console.log(err)
    //  }

    // res.status(201).send("카카오 로그인 성공")
// }

module.exports = {
   
  login: async(req,res) =>{
    const code = req.query.code;
    try{
      await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_URI}&code=${code}`)
    }
    catch(err){
      console.log(err)
    }
  }
 
}