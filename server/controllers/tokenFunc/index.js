const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  //액세스 토큰 발급
  getAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, {
        expiresIn: "3h"
    });
  }, 
  
  //리프레시 토큰 발급 
  getRefreshToken: (data) => {
      return sign(data, process.env.REFRESH_SECRET, {
          expiresIn: "1days"
      })
  },

  //액세스, 리프레시 토큰 전달
  sendToken: (res, accessToken, refreshToken) => {
    return res.cookie("refreshToken", refreshToken, {
      httpOnly: true, sameSite: "None", secure: true
    })
    .status(200).json({ data: { accessToken, refreshToken }, message: "로그인 성공" })
  },

  //액세스 토큰 재전달 
  resendAccessToken: (res, accessToken, data) => {
    return res.json({ data: { accessToken, userInfo: data }, message: "access token 재발급 완료" })
  },
 
  //액세스 토큰 유효성검사, 해독
  checkAuthAccessToken: (req, res) => {
    const { authorization } = req.headers; //req.headers.cookie 
    const token = authorization && authorization.split(' ')[1] //다르게 잘라야될수도있음
    if(!token){ 
        return res.status(400).send("Access token을 찾을 수 없습니다.")
    }
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    try{
      return verify(token, process.env.ACCESS_SECRET);
    }catch(err) {
      return null;
    }
},

  //리프레시 토큰 유효성검사, 해독
  checkAuthRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  } 
}