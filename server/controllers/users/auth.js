const { user } = require("../../models");
const { emailauth } = require("../../models");
const { isAuthorized } = require("../tokenFunc/index");
require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  get: async (req, res) => {
    const data = isAuthorized(req);
    if (data) {
      res.status(213).send({ login: true, data: data });
    } else {
      res.status(420).send("토큰이 유효하지 않습니다.");
    }
  },

  post: async (req, res) => {
    let randomCode = String(Math.random().toString(36).slice(2)); // 랜덤문자생성

    var smtpConfig = {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPW,
      },
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "There Weather 인증 코드 메일",
      html: `<div>아래 코드를 회원가입 창에 기입 후 인증 버튼을 클릭하세요.</div>
            <div style={display:flex; justify-content: center;}>
            <div>${randomCode}</div>
            </div>
            `,
    };

    await emailauth.create({
      temporary_id: req.body.temporary_id,
      email: req.body.email,
      code: randomCode,
    });
    setTimeout(async () => {
      await emailauth.destroy({
        where: {
          temporary_id: req.body.temporary_id,
        },
      });
    }, 50000); //50초, 1분은(60*1000)

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "fail" });
      } else {
        res.status(200).json({ status: "success" });
      }
    });
  },

  put: async (req, res) => {
    let findCode = await emailauth.findOne({
      where: {
        temporary_id: req.body.temporary_id,
        email: req.body.email,
        code: req.body.code,
      },
    });

    if (findCode) {
      res.send(true);
    } else {
      res.send(false);
    }
  },
};
