const axios = require("axios")
// require("dotenv").config();
const serviceKey = require('../../config/key')
const aqiUrl = require('../../config/url')
const moment = require("moment")

//예보날짜 
function getCurrentDate(){ //'20211102' 형식 
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  return year + month + day ;
}

//예보시간 - 현재시간으로 입력해둠 - 예보발표시간에 맞춰서 3시간씩 잘라야함
function getFormatTime(){ //'1640' 형식
 let hourDate = new Date();
  let hour = hourDate.getHours();
  let minutes = hourDate.getMinutes() ;
  hour = hour >= 10 ? hour : '0' + hour;
  minutes = minutes >= 10 ? minutes : '0' + minutes; 
  return hour + '' + minutes;
}

//base_tim:0200 0500 0800 1100 1400 1700 2000 2300
//api제공시간: 각 10분
// 0-2시 사이 어제날짜로 바껴야함 
// 2시 11분 - 5시 10분 사이 
// 5시 11분 - 8시 10분 사이 
// 8시 11분 - 11시 10분 사이 
// 11시 11분 - 14시 10분 사이 
// 14시 11분 - 17시 10분 사이 
// 17시 11분 - 20시 10분 사이 
// 20시 11분 - 23시 10분 사이 
// 23시 11분 - 23시 59분 
function getWeatherDate() {
//오늘 현재날짜 및 시간 - 날짜만 필요 
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let resultDate = year + month + day; 

//오늘 현재시간 필요
let hours = ('0' + today.getHours()).slice(-2);
let minutes = ('0' + today.getMinutes()).slice(-2);
let resultHours = hours + minutes;



let baseTime = "0200"
if(moment(resultHours,"HHMM").isBetween("1200", "0211")){
  let baseDate = resultDate;
  baseDate = new Date(new Date().setDate(new Date().getDate() - 1)) //어제날짜 
  baseTime = "2300";
}
else if(moment(resultHours,"HHMM").isBetween("0211", "0511")){
  baseTime = "0200"
}
else if(moment(resultHours,"HHMM").isBetween("0511", "0811")){
  baseTime = "0500"
}
else if(moment(resultHours,"HHMM").isBetween("0811", "1111")){
    baseTime = "0800"
}
else if(moment(resultHours,"HHMM").isBetween("1111", "1411")){
    baseTime = "1100"
}
else if(moment(resultHours,"HHMM").isBetween("1411", "1711")){
    baseTime = "1400"
}
else if(moment(resultHours,"HHMM").isBetween("1711", "2011")){
    baseTime = "1700"
}
else if(moment(resultHours,"HHMM").isBetween("2011", "2311")){
    baseTime = "2000"
}
else{
    baseTime = "2300"
}
}
console.log(getWeatherDate())


//카테고리 
 //받아올수있는 정보 경도,위도,현재날짜,카테고리(POP 강수확률, PTY 강수형태, SKY 하늘상태, TMP 1시간 기온, TMN 일 최저기온, TMX 일 최고기온 => 디폴트 TMP)
// function makeResponse(type, cb){
//     let pop, pty, tmp, tmn, tmx, sky;
//     type.response.body.items.item.forEach(function(el) {
//         if(el.category === "POP"){
//             pop = el.fcstValue;
//         }
//         else if(el.category === "PTY"){
//             pty === el.fcstValue;
//         }
//         else if(el.category === "TMP"){
//             tmp === el.fcstValue;
//         }
//         else if(el.category === "TMN"){
//             tmn === el.fcstValue;
//         }
//         else if(el.category === "TMX"){
//             tmx === el.fcstValue;
//         }
//         else if(el.category === "SKY"){
//             sky === el.fcstValue;
//         }
//     });
//     //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
//     if(pty === 0){
//         pty = "sun"
//     }
//     else if(pty === 1){
//         pty = "rain"
//     }
//     else if(pty === 2){
//         pty = "rain/snow"
//     }
//     else if(pty === 3){
//         pty = "snow"
//     }
//     else if(pty === 4){
//         pty = "shower"
//     }
//     //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
//     else if(sky === 1){
//         sky = "맑음"
//     }
//     else if(sky === 3){
//         sky = "구름많음"
//     }
//     else if(sky === 4){
//         sky = "흐림"
//     }
//     return ({ temp: tmp, pty: pty  }) 
// }


const weather = async(nx, ny, callback) => {    
    // const url = process.env.REACT_APP_potalUrl
    // const ServiceKey = process.env.REACT_APP_ServiceKey
    const url = aqiUrl.dataUrl
    const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey)

    try  {
        const response= await axios.get(url, 
          {
            params: 
            { 
                ServiceKey: ServiceKey,
                numOfRows: '1',
                pageNo: '1',
                dataType: 'JSON',
                base_date: getCurrentDate(),
                base_time: getFormatTime(),
                nx: '60', 
                ny: '127',
            }
        })
        //console.log(response.data)
        // console.log(response.data.response.body.items.item.filter((object) => {
        //   return object['category'] === "SKY"
        // })[0].fcstValue) //왜안보여줘ㅠ

        const { nx, ny, fcstDate, category, fcstValue } = response.data.response.body.items.item[0]
        const weatherInfo = {
          xLocation: nx, 
          yLocation: ny,
          date: fcstDate,
          weatherType: category,
          weatherValue: fcstValue
        }
        //console.log(weatherInfo)
        //{"weatherInfo":{"xLocation":50,"yLocation":127,"date":"20211102","weatherType":"TMP","weatherValue":"11"}}
        // callback(undefined, {weatherInfo})
        callback({weatherInfo}, undefined)
      }
    catch(err){
        console.log(err)
    }
}

module.exports = weather;