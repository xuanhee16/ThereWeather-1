const axios = require("axios")
// require("dotenv").config();
const serviceKey = require('../../config/key')
const aqiUrl = require('../../config/url')

function getCurrentDate(){ //'20211102' 형식 
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  return year + month + day ;
}

function getFormatTime(){ //'1640' 형식
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  hour = hour >= 10 ? hour : '0' + hour;
  minutes = minutes >= 10 ? minutes : '0' + minutes; 
  return hour + '' + minutes;
}

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
        console.log(response.data)  
        
        // console.log(response.data.response.body.items.item.filter((object) => {
        //   return object['category'] === "SKY"
        // })[0].fcstValue) //왜안보여줘ㅠ
        //받아올수있는 정보 경도,위도,현재날짜,카테고리(POP 강수확률, PTY 강수형태, SKY 하늘상태, TMP 1시간 기온, TMN 일 최저기온, TMX 일 최고기온 => 디폴트 TMP)
        // const { nx, ny, fcstDate, category, fcstValue } = response.data.response.body.items.item[0]
        // const weatherInfo = {
        //   xLocation: nx, 
        //   yLocation: ny,
        //   date: fcstDate,
        //   weatherType: category,
        //   weatherValue: fcstValue
        // }
        // console.log(weatherInfo)
        // //{"weatherInfo":{"xLocation":50,"yLocation":127,"date":"20211102","weatherType":"TMP","weatherValue":"11"}}
        // // callback(undefined, {weatherInfo})
        // callback({weatherInfo})
      }
    catch(err){
        console.log(err)
    }
}

module.exports = weather;