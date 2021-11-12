const { post, user } = require("../../models")

module.exports = async (req, res) => {
    //res.send()
    //console.log("server/editpost.js::::::",req.body)
    
   const { user_id, post_id, post_photo, post_title, post_content, weather, wind, temp } = req.body;
   let posts = Number(post_id)
   //현재 유저
   //현재 보고있는 포스트의 글쓴이  
   //가 같지 않으면 수정이 안되게, 같으면 수정이 되게 

   //넘어오는 정보는 현재접속한유저의 정보, 현재 클릭한 포스트의 번호 

    const checkUser = await post.findOne({
        where: {
            user_id: user_id,
            id: posts
        }
    })
    //현재 접속한 유저가 포스트에서 찾은 유저 정보가 아니면 
    if(!checkUser){
      return res.status(401).send("게시물의 작성자가 아닙니다.")
    }
    //현재 접속한 유저가 포스트에서 찾은 유저 정보가 맞으면 
    else{
        if(!post_photo || !post_content || !post_content || !weather || !wind || !temp){
            res.status(401).send("제목,내용, 날씨 정보 등은 필수로 수정해주세요")
        }
        else{
            await post.update({
                post_photo: post_photo,
                post_title: post_title,
                post_content: post_content,
                weather: weather,
                wind: wind,
                temp: temp
            }, {
                where: {
                    // user_id: user_id,
                    id: post_id
                }
            })
            res.status(201).send("변경완료")
        }
    }
}