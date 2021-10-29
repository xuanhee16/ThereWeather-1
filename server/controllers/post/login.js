const { getAccessToken, getRefreshToken, sendToken } = require("../tokenFunc");
const { user } = require("../../models");
const { decrypto } = require("../get/setpw");

module.exports = async (req, res) => {
    const { user_id, password } = req.body;

    const userInfo = await user.findOne({
        where: {
            user_id
        }
    })
    
    //비밀번호 복호화 
    const dePw = decrypto(userInfo.password);
    //console.log(dePw)
      if(dePw !== password){
      return res.status(401).send("비밀번호를 확인해주세요.")
      }
      
    //비밀번호가 맞다면
      delete userInfo.dataValues.password;
      const accessToken = getAccessToken(userInfo.dataValues);
      const refreshToken = getRefreshToken(userInfo.dataValues);
      sendToken(res, accessToken, refreshToken);
}