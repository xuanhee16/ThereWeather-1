const axios = require("axios")
// require("dotenv").config();
const serviceKey = require('../../config/key')
const aqiUrl = require('../../config/url')
const moment = require("moment");
const { rawListeners } = require("npm");

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

//단기예보시간 - 현재시간으로 입력해둠 - 예보발표시간에 맞춰서 3시간씩 잘라야함
//초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
//초단기예보실황 - 예보시간 정각   
function getFormatTime(){ //'1640' 형식
//   let hourDate = new Date();
  let hourDate = new Date(Date.now() - (45 * 60 * 1000)) ; 
  let hour = hourDate.getHours();
  //let minutes = hourDate.getMinutes() ;
  hour = hour >= 10 ? hour : '0' + hour;
  //minutes = minutes >= 10 ? minutes : '0' + minutes; 
  //return hour + '' + minutes;
  return hour + '' + '30';
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
// function getWeatherDate() {
// //오늘 현재날짜 및 시간 - 날짜만 필요 
// let today = new Date();
// let year = today.getFullYear();
// let month = ('0' + (today.getMonth() + 1)).slice(-2);
// let day = ('0' + today.getDate()).slice(-2);
// let resultDate = year + month + day; 

// //오늘 현재시간 필요
// let hours = ('0' + today.getHours()).slice(-2);
// let minutes = ('0' + today.getMinutes()).slice(-2);
// let resultHours = hours + minutes;

// let baseTime = "0200"
// if(moment(resultHours,"HHMM").isBetween("1200", "0211")){
//   let baseDate = resultDate;
//   baseDate = new Date(new Date().setDate(new Date().getDate() - 1)) //어제날짜 
//   baseTime = "2300";
// }
// else if(moment(resultHours,"HHMM").isBetween("0211", "0511")){
//   baseTime = "0200"
// }
// else if(moment(resultHours,"HHMM").isBetween("0511", "0811")){
//   baseTime = "0500"
// }
// else if(moment(resultHours,"HHMM").isBetween("0811", "1111")){
//     baseTime = "0800"
// }
// else if(moment(resultHours,"HHMM").isBetween("1111", "1411")){
//     baseTime = "1100"
// }
// else if(moment(resultHours,"HHMM").isBetween("1411", "1711")){
//     baseTime = "1400"
// }
// else if(moment(resultHours,"HHMM").isBetween("1711", "2011")){
//     baseTime = "1700"
// }
// else if(moment(resultHours,"HHMM").isBetween("2011", "2311")){
//     baseTime = "2000"
// }
// else{
//     baseTime = "2300"
// }
// }
//console.log(getWeatherDate())

//-------------------------------------
// //x,y좌표 - 위치변환할 때 
// let RE = 6371.00877; // 지구 반경(km)
// let GRID = 5.0; // 격자 간격(km)
// let SLAT1 = 30.0; // 투영 위도1(degree)
// let SLAT2 = 60.0; // 투영 위도2(degree)
// let OLON = 126.0; // 기준점 경도(degree)
// let OLAT = 38.0; // 기준점 위도(degree)
// let XO = 43; // 기준점 X좌표(GRID)
// let YO = 136; // 기1준점 Y좌표(GRID)

// // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
// function dfs_xy_conv(code, v1, v2) {
//     let DEGRAD = Math.PI / 180.0;
//     let RADDEG = 180.0 / Math.PI;

//     let re = RE / GRID;
//     let slat1 = SLAT1 * DEGRAD;
//     let slat2 = SLAT2 * DEGRAD;
//     let olon = OLON * DEGRAD;
//     let olat = OLAT * DEGRAD;

//     let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
//     sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
//     let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
//     sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
//     let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
//     ro = re * sf / Math.pow(ro, sn);
//     let rs = {};
//     if (code == "toXY") {
//         rs['lat'] = v1;
//         rs['lng'] = v2;
//         let ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
//         ra = re * sf / Math.pow(ra, sn);
//         let theta = v2 * DEGRAD - olon;
//         if (theta > Math.PI) theta -= 2.0 * Math.PI;
//         if (theta < -Math.PI) theta += 2.0 * Math.PI;
//         theta *= sn;
//         rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
//         rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
//     }
//     else {
//         rs['x'] = v1;
//         rs['y'] = v2;
//         let xn = v1 - XO;
//         let yn = ro - v2 + YO;
//         ra = Math.sqrt(xn * xn + yn * yn);
//         if (sn < 0.0) - ra;
//         let alat = Math.pow((re * sf / ra), (1.0 / sn));
//         alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

//         if (Math.abs(xn) <= 0.0) {
//             theta = 0.0;
//         }
//         else {
//             if (Math.abs(yn) <= 0.0) {
//                 theta = Math.PI * 0.5;
//                 if (xn < 0.0) - theta;
//             }
//             else theta = Math.atan2(xn, yn);
//         }
//         let alon = theta / sn + olon;
//         rs['lat'] = alat * RADDEG;
//         rs['lng'] = alon * RADDEG;
//     }
//     return rs;
// }

// let rs = dfs_xy_conv("toLL","60","127"); //위도 경도 
// console.log(rs.lat, rs.lng);//위도 경도 

  



//카테고리 
 //받아올수있는 정보 경도,위도,현재날짜,카테고리(디폴트 LGT)

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
                numOfRows: '30',
                pageNo: '1',
                dataType: 'JSON',
                base_date: getCurrentDate(),
                base_time: getFormatTime(),
                nx: '60', 
                ny: '127',
            }
        })
        // console.log(response.data.response.body.items)
        // console.log(response.data.response.body.items.item.filter((object) => {
        //   return object['category'] === "SKY"
        // })[0].fcstValue) //ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ만세만세 

   

        const { nx, ny, fcstDate, fcstTime } = response.data.response.body.items.item[0]
        //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
        //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
        const weatherInfo = {
          xLocation: nx, 
          yLocation: ny,
          date: fcstDate,
          time: fcstTime,
          cloudy: response.data.response.body.items.item.filter((object) => {
            return object['category'] === "SKY"
          })[0].fcstValue,
          temp: response.data.response.body.items.item.filter((object) => {
            return object['category'] === "T1H"
          })[0].fcstValue,
          weatherType: response.data.response.body.items.item.filter((object) => {
            return object['category'] === "PTY"
          })[0].fcstValue,
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