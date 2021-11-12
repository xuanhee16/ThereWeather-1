const { user } = require("../../models")
const { isAuthorized } = require('../tokenFunc/index');

module.exports = async (req, res) => {
    //res.send()
    console.log("server/edituserinfo:::::::",req.body)
    // location: '부산 강서구 가덕해안로 3',
    // user_photo: 'http://localhost:80/img/imgfile1636647243142.jpeg'
    const accessToken = isAuthorized(req);
    // console.log(accessToken)
    const { user_id, nickName } = accessToken;
    const { user_Photo, location } = req.body; 
    user.update({
        user_Photo: user_Photo, 
        location: location
    },{
        where: {
            user_id: user_id, nickName: nickName
        }
    })
    res.status(200).send("수정 완료")
}