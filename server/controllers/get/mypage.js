const { post } = require("../../models")

module.exports = async (req, res) => { 
    //res.send()

    // const a = await post.findAll({ limit : 3 })
    // console.log(a);
    //res.send(await post.findAll({ limit : 6 , order :  [['createdAt', 'DESC']]}))
    
    res.send(await post.findAll({}))
}