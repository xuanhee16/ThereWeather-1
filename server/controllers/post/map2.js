const { toXY } = require("./xyConvert");
const axios = require("axios");
const serviceKey = require("../../config/key");
const aqiUrl = require("../../config/url");

module.exports = async (req, res) => {
  const { lat, lon } = req.query;
  function getCurrentDate() {
    //'20211102' 형식
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    let day = date.getDate();
    day = day < 10 ? "0" + day.toString() : day.toString();
    return year + month + day;
  }

  //초단기예보시간 - 예보시간은 각 30분, api제공시간은 45분
  function getFormatTime() {
    let hourDate = new Date(Date.now() - 45 * 60 * 1000);
    let hour = hourDate.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    return hour + "" + "30";
  }

  const toXYconvert = toXY(lat, lon);
  const url = aqiUrl.shortForecastUrl;
  const ServiceKey = decodeURIComponent(serviceKey.publicPortalkey);

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
      console.log(res2.data);
      //기상청api 불안정함- 헤더에 { resultCode: '00', resultMsg: 'NORMAL_SERVICE' } 확인되야 정상
      //에러코드 참고  -> https://www.nanumtip.com/qa/41692/
      //console.log(res2.data.response.body.items)
      console.log(res2.data.response);

      if (res2.data.response === undefined) {
        console.log("데이터없음1");
        res.send({ fcstValue: "53" });
      } else if (res2.data.response.body === undefined) {
        console.log("데이터없음2");
        res.send({ fcstValue: "52" });
      } else if (res2.data.response.header.resultCode === "00") {
        console.log("데이터있음");
        console.log(res2.data.response.body.items.item[7]);
        res.send(res2.data.response.body.items.item[7]);
      } else {
        console.log("데이터없음3");
        res.send({ fcstValue: "51" });
      }
    });
};
