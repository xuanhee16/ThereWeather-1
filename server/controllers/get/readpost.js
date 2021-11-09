const { post, user } = require("../../models")

module.exports = async function(req, res)  {
    console.log('**readpost 쿼리 확인**', req.query.id);

    post.findOne({ where: { id: req.query.id } })
    .then(raw => raw.dataValues)
    .then(postData => {
        const userId = postData.user_id;
            // 포스트 데이터에서 작성자 아이디 뽑아내기
        user.findOne({ where: { user_id : userId } })
            // 작성자 아이디로 회원 정보 찾기
        .then(userinfo => {
            const { nickName, user_Photo } = userinfo.dataValues;
            return { nickName: nickName, user_Photo: user_Photo };
            // 회원정보에서 닉네임과 사용자 프로필 사진을 골라 객체를 들어 반환
            // 아래로 전달
        })
        .then(selectedInfo => {
            console.log({...postData, ...selectedInfo});
            res.send({...postData, ...selectedInfo});
            // 포스트데이터 + 닉네임 + 프사 주소 합쳐서 send
        })
        .catch(err => {
            // 에러 핸들링
            console.log(err);
            res.status(400).send("bad request");
        })
    })
    .catch(err => {
        // 에러 핸들링
        console.log(err);
        res.status(400).send("bad request");
    })
}