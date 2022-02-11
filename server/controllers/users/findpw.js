require("dotenv").config();
const { user, emailauth } = require("../../models");
const nodemailer = require("nodemailer");

module.exports = {
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

    //유저가 입력한 아이디와 이메일이 디비에 존재하는지 체크
    await user
      .findOne({
        where: {
          user_id: req.body.temporary_id,
          email: req.body.email,
        },
      })
      .then((res) => res.dataValues)
      .then(async (userinfo) => {
        const { user_id, email } = userinfo;
        if (!userinfo) {
          return res.send("no results");
        } else {
          await emailauth
            .create({
              temporary_id: req.body.temporary_id,
              email: req.body.email,
              code: randomCode,
            })
            .then((userdata) => {
              res.send({ user_id, email });
            });
          setTimeout(() => {
            emailauth.destroy({
              where: {
                temporary_id: req.body.temporary_id,
              },
            });
          }, 50000); //50초, 1분은(60*1000)
        }
      });

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: "fail" });
      } else {
        res.status(200).json({ status: "success" });
      }
    });
  },
};
