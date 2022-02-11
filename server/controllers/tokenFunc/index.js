const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  //액세스 토큰 발급
  getAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET || "s1e0c2r6e0t", {
      expiresIn: "1h",
    });
  },

  //리프레시 토큰 발급
  getRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET || "s21u10g2a6r", {
      expiresIn: "1days",
    });
  },

  //액세스, 리프레시 토큰 전달
  sendToken: (res, accessToken, refreshToken) => {
    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({
        data: { accessToken, refreshToken },
        message: "로그인 성공",
      });
  },

  //액세스 토큰 재전달
  resendAccessToken: (res, accessToken, data) => {
    return res.json({
      data: { accessToken, userInfo: data },
      message: "access token 재발급 완료",
    });
  },

  //리프레시 토큰 유효성검사, 해독
  checkAuthRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET || "s21u10g2a6r");
    } catch (err) {
      return null;
    }
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return null;
    }
    const atoken = authorization.split(" ")[1];

    try {
      return verify(atoken, process.env.ACCESS_SECRET || "s1e0c2r6e0t");
    } catch (err) {
      return null;
    }
  },
};
