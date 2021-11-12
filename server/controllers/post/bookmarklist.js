const { bookmark, post, user } = require("../../models")

module.exports = async(req, res) => {
  //res.send()
  console.log("server/bookmarklist.js::::", req.body) 
  const { user_id } = req.body; 

  if(!user_id){
    res.status(404).send("정보가 없습니다.")
  }
  else{
    const list = await bookmark.findAll({
      include: [{
              model: post, required: true
              // where: {
              //     // user_id: searchID, //본인 북마크만 보여줌 
              //     // id: posts //북마크 선택된 포스트 하나만 보여줌 
              //     user_id 
              // },
          }]
     
    })

    if(!list){
      res.status(404).send("북마크가 없습니다.")
    }
    else{
      let lists = list.map((el) => {
          //return el.dataValues;
          return el.dataValues.post.dataValues;
      })
  
      res.status(202).send(lists)
    }
  }
   
}