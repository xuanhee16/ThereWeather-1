const { toXY } = require("./xyConvert")
const axios = require("axios")
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")

module.exports = async (req, res) => {
    console.log("map2.js 서버")
    console.log(req.query)
    const { lat, lon } = req.query

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

    // //단기예보시간 - 예보시간은 각 3시간분
    //초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
    //base_date base_date	발표일자	8	1	20210628	‘21년 6월 28일발표
    //base_time base_time	발표시각	4	1	0500	05시 발표

    function getFormatTime() {
        //9시간에 해당하는 양-hoon
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000
        //현재시각과 9시를 더해서 한국시간을 만든다 -hoon
        const curHour = new Date() + KR_TIME_DIFF
        //pm 2시 49을 이런식으로 변경->1459
        let hourMin = Number(curHour.split(" ")[4].slice(0, 5).replace(":", ""))
        //각 시각 정각에서 15분 사이일경우 15분을 빼줌(데이터가 2시,5시,8... 기상청 데이터가 정각에 들어오기 때문에 데이터 안정성을 위해서)
        if (
            Number(String(hourMin)[2] + String(hourMin)[3]) >= 0 &&
            Number(String(hourMin)[2] + String(hourMin)[3]) <= 13
        ) {
            hourMin = String(hourMin) - 55
        }
        console.log(hourMin)
        return String(hourMin)
    }

    const toXYconvert = toXY(lat, lon)
    const url = aqiUrl.shortForecastUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)
    console.log(toXYconvert.lat)
    axios
        .get(url, {
            params: {
                serviceKey: ServiceKey,
                numOfRows: "14",
                pageNo: "1",
                dataType: "JSON",
                base_date: getCurrentDate(),
                base_time: getFormatTime(),
                nx: toXYconvert.x,
                ny: toXYconvert.y,
            },
        })
        .then((res2) => {
            // console.log(res2.data)
            //기상청api 불안정함- 헤더에 { resultCode: '00', resultMsg: 'NORMAL_SERVICE' } 확인되야 정상
            //에러코드 참고  -> https://www.nanumtip.com/qa/41692/
            //console.log(res2.data.response.body.items)
            if (res2.data.response.header.resultCode) {
                res.send({ fcstValue: 50 })
            } else if (res2.data.response.header.resultCode === "03") {
                res.send({ fcstValue: 50 })
            } else {
                res.send(res2.data.response.body.items.item[7])
            }
        })
}
