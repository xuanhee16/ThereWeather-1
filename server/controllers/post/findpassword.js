const { user } = require("../../models")
const { encrypto } = require("../get/setpw")

module.exports = async(req, res) => {
    // res.send()
  console.log("findpassword",req.body)
  const { user_id, email, password } = req.body;

    const checkUser = await user.findOne({
      where: {
        user_id: user_id,
        email: email,
      }
    })
    if(!checkUser){
      res.status(401).send("정보가 틀립니다.")
    }
    else{
      const enPw = encrypto(password);
      console.log("encrypto:::",enPw)
      await user.update({
        password: enPw
      },
      { 
        where: { user_id: user_id, email: email }
       }
      )}
      res.status(201).send("success")
}