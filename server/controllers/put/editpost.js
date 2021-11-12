//const { user } = require("../../models")
const { post } = require("../../models")

module.exports = async (req, res) => {
    //res.send()
    console.log("server/editpost.js : ", req.body)
    const { user_id, post_id, post_photo, post_title, post_content, weather, wind, temp, outer_id, top_id, bottom_id } = req.body;
  
    if(!post_photo || !post_content || !post_content || !weather || !wind || !temp || !outer_id || !top_id || !bottom_id){
        res.status(401).send("제목,내용, 날씨 정보 등은 필수로 수정해주세요")
    }
    else{
        await post.update({
            post_photo: post_photo,
            post_title: post_title,
            post_content: post_content,
            weather: weather,
            wind: wind,
            temp: temp,
            outer_id: outer_id,
            top_id: top_id,
            bottom_id: bottom_id,
        }, {
            where: {
                // user_id: user_id,
                id: req.body.post_id
            }
        })
        res.status(201).send("변경완료")
    }
}