const { user } = require("../../models");
const { encrypto } = require("../get/setpw");

module.exports = async(req, res) => {
    // console.log("회원가입 콘솔")
    // console.log(req.body)
    // res.send()

    const { user_id, password, nickName, gender, location, user_photo } = req.body;
    if(!user_id || !password || !nickName || !gender || !location || !user_photo){
        return res.status(401).send("정보를 모두 입력해주세요.")
    }
    
    const enPw = encrypto(password);
    const signupUser = await user.create({
        user_id, password: enPw, nickName, gender, location, user_photo
    })
    
    if(!signupUser){
      return res.status(401).send("회원가입 실패")
    }
    return res.status(201).send("회원가입 성공")

  //res.send()
}
