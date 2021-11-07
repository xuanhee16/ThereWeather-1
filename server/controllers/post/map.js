const { toXY } = require("../post/xyConvert")
const axios = require("axios")
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")

module.exports = async (req, res) => {
    console.log("map.js 서버")

    function getCurrentDate() {
        //'20211102' 형식
        let date = new Date()
        let year = date.getFullYear().toString()
        let month = date.getMonth() + 1
        month = month < 10 ? "0" + month.toString() : month.toString()
        let day = date.getDate()
        day = day < 10 ? "0" + day.toString() : day.toString()
        return year + month + day
    }
    //단기예보시간 - 현재시간으로 입력해둠 - 예보발표시간에 맞춰서 3시간씩 잘라야함
    //초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
    //초단기예보실황 - 예보시간 정각
    function getFormatTime() {
        let hourDate = new Date(Date.now() - 45 * 60 * 1000)
        let hour = hourDate.getHours()
        hour = hour >= 10 ? hour : "0" + hour
        return hour + "" + "30"
    }
    const { lat, lon } = req.body
    const toXYconvert = toXY(lat, lon)
    const url = aqiUrl.dataUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)
    axios
        .get(url, {
            params: {
                ServiceKey: ServiceKey,
                numOfRows: "30",
                pageNo: "1",
                dataType: "JSON",
                base_date: getCurrentDate(),
                base_time: getFormatTime(),
                nx: toXYconvert.x,
                ny: toXYconvert.y,
            },
        })
        .then((res2) => {
            console.log(res2.data.response.body)
            res.send(res2.data.response.body.items)
        })
}
