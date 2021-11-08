const { post } = require("../../models")

module.exports = async function(req, res)  {
    console.log('**readpost확인**');
    console.log('**readpost 쿼리 확인**', req.query.id);

    post.findOne({ where: { id: req.query.id } })
    .then(raw => raw.dataValues)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err);
        res.status(400).send('id가 올바르지 않습니다');
    })
}