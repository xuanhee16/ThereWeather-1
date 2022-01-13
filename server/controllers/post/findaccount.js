const { user } = require("../../models")

module.exports = async(req, res) => {
// res.send()
//console.log(req.body)
const { nickName, email } = req.body;

  await user.findOne({
          where: {
            nickName: nickName,
            email: email,
          }
        })
        .then(res => res.dataValues)
        .then((userinfo) => {
            // console.log("res2",res2)
            const { nickName, user_id } = userinfo
            return{
                nickName: nickName,
                user_id: user_id
            }
        })
        .then((userdata) => {
          res.send(userdata) 
        })
}