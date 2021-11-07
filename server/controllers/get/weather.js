const axios = require("axios")
// require("dotenv").config();
const serviceKey = require("../../config/key")
const aqiUrl = require("../../config/url")
//const {toXYconvert} = require("../post/map")
//console.log("WEAHTER:",toXYconvert)
//const map = require("../post/map")
// console.log("weather.js:", map.map())
// const { toXY } = require("./xyConvert")
// console.log(toXY())

// module.exports = async (req, res) => {
//   res.send()
// }


//예보날짜
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
    //'1640' 형식
    //   let hourDate = new Date();
    let hourDate = new Date(Date.now() - 45 * 60 * 1000)
    let hour = hourDate.getHours()
    //let minutes = hourDate.getMinutes() ;
    hour = hour >= 10 ? hour : "0" + hour
    //minutes = minutes >= 10 ? minutes : '0' + minutes;
    //return hour + '' + minutes;
    return hour + "" + "30"
}

//카테고리
//받아올수있는 정보 경도,위도,현재날짜,카테고리(디폴트 LGT)
const weather = async (nx, ny, callback) => {
    // const url = process.env.REACT_APP_potalUrl
    // const ServiceKey = process.env.REACT_APP_ServiceKey
    const url = aqiUrl.dataUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)

    try {
        const response = await axios.get(url, {
            params: {
                ServiceKey: ServiceKey,
                numOfRows: "30",
                pageNo: "1",
                dataType: "JSON",
                base_date: getCurrentDate(),
                base_time: getFormatTime(),
                nx: nx,
                ny: ny,
            },
        })
        console.log(response.data.response.body.items)
        // console.log(response.data.response.body.items.item.filter((object) => {
        //   return object['category'] === "SKY"
        // })[0].fcstValue)

        // const { nx, ny, fcstDate, fcstTime } =
        //     response.data.response.body.items.item[0]
        // //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
        // //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
        // const weatherInfo = {
        //     xLocation: nx,
        //     yLocation: ny,
        //     date: fcstDate,
        //     time: fcstTime,
        //     cloudy: response.data.response.body.items.item.filter((object) => {
        //         return object["category"] === "SKY"
        //     })[0].fcstValue,
        //     temp: response.data.response.body.items.item.filter((object) => {
        //         return object["category"] === "T1H"
        //     })[0].fcstValue,
        //     weatherType: response.data.response.body.items.item.filter(
        //         (object) => {
        //             return object["category"] === "PTY"
        //         }
        //     )[0].fcstValue,
        // }
        // //console.log(weatherInfo)
        // //{"weatherInfo":{"xLocation":50,"yLocation":127,"date":"20211102","weatherType":"TMP","weatherValue":"11"}}
        // //callback(undefined, {weatherInfo})
        // callback({ weatherInfo }, undefined)
    } catch (err) {
        console.log(err)
    }
}

module.exports = weather
