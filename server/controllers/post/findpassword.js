const { user } = require("../../models")

module.exports = async(req, res) => {
    // res.send()
    //console.log("findpassword",req.body)
const { user_id, email } = req.body;

    await user.findOne({
        where: {
          user_id: user_id,
          email: email,
        }
      })
      .then(res => res.dataValues)
      .then((userinfo) => {
          //console.log("res2",userinfo)
          const { user_id, email } = userinfo
          if(user_id === user_id && email === email){
          // console.log("findpassword res")
          
          }

        //   return{
        //       email: email,
        //       user_id: user_id
        //   }
      })
}