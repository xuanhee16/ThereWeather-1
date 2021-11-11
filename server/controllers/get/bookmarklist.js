const { bookmark, post } = require("../../models")

module.exports = async(req, res) => {
  //res.send()
  console.log("server/bookmarklist.js::::",req.query) //{ searchPost: 'kimcoding1' }
  const { searchPost } = req.query; 
  if(!searchPost){
    res.status(404).send("정보가 없습니다.")
  }
  const list = await bookmark.findAll({
    include: [{
            model: post,
            where: {
                user_id: searchPost,
                // id: searchPost
            },
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