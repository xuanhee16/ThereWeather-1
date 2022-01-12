const { user } = require("../../models")

module.exports = async(req, res) => {
// res.send()
//console.log(req.body)
const { nickName, email } = req.body

  await user.findOne({
          where: {
            nickName: nickName,
            email: email,
          }
        })
        .then(res => res.dataValues)
        .then((res2) => {
            // console.log("res2",res2)
            const { user_id } = res2
            return{
                user_id: user_id
            }
        })
        .then((res3) => {
          res.send(res3) 
        })
}