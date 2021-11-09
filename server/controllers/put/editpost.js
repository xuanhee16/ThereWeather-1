//const { user } = require("../../models")
const { post } = require("../../models")

module.exports = async (req, res) => {
    //res.send()
    console.log("server/editpost.js",req.body)
    const { user_id, post_photo, post_title, post_content, weather, wind, temp, top_id, bottom_id } = req.body;
    // if(req.file){
    //     res.send({ fileName: req.file.filename })
    // }
    // 
    if(!post_content || !post_content || !weather || !wind || !temp){
        res.status(401).send("제목,내용, 날씨 정보 등은 필수로 수정해주세요")
    }
    else{
        await post.update({
            post_title: post_title,
            post_content: post_content,
            weather: weather,
            wind: wind,
            temp: temp
        }, {
            where: {
                user_id: user_id,
            }
        })
        res.status(201).send("변경완료")
    }
}