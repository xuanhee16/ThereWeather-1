const { sign, verify } = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
  //액세스 토큰 발급
  getAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, {
        expiresIn: "3h"
    });
  }, 
  
  //리프레시 토큰 발급 
  getRefreshToken: (data) => {
      return jwt.sign(data, process.env.REFRESH_SECRET, {
          expiresIn: "1days"
      })
  },

  //리프레시 토큰 보내기 
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      sameSite: "None", httpOnly: true, secure: ture
      })
    },
  
  //액세스 토큰 보내기   
  sendAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken }, message: "ok" })
  },

  //액세스 토큰 유효성검사, 해독
  checkAuthAccessToken: (req) => {
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
  checkAuthRefreshToken: (req) => {
    const { refreshToken } = req.cookies;
    if(!refreshToken){
      return res.status(400).send("Refresh token을 찾을 수 없습니다.")
      }
    try{
      return verify(refreshToken, process.env.REFRESH_SECRET);   
    }catch(err) {
      return null;
    }
  } 
    //res.send()
}