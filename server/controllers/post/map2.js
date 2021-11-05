const { toXY } = require("./xyConvert")
const axios = require("axios")
// require("dotenv").config();
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")
const weather = require("./controllers/post/map.js")

module.exports = async (req, res) => {
  //res.send()

  await weather('x', 'y', (error, {weathers}={}) => {
    if(error){
        console.log("index:",error)
        res.send(error)
    }
    else{
        console.log("index:",weathers)
        res.send(weathers)
    }
})
}

  