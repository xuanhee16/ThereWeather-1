const { toXY } = require("../post/xyConvert")

module.exports = async (req, res) => {
  // res.send()

  // console.log(req.body) //{ lat: 37.6112999, lon: 126.9213627 }
  const { lat, lon } = req.body;
  //console.log("여기 map이여",toXY(lat, lon)) //{ lat: 37.6112999, lon: 126.9213627, x: 59, y: 128 }
  const toXYconvert = toXY(lat, lon);
  console.log(toXYconvert.x) //59
  console.log(toXYconvert.y) //128
}

// async function map(req, res){ 
//   //console.log(req.body)
//   const { lat, lon } = req.body;
//   return toXY(lat, lon)
// }

// module.exports = map;

// module.exports = {
//   map: async(req, res) => {
//   //console.log(req.body)
//   const { lat, lon } = req.body;
//   const toXYconvert = toXY(lat, lon);
//   console.log(toXYconvert.x) //59
//   console.log(toXYconvert.y) //128
//   }
// }

// const map = async(req, res) => {
//    console.log(req.body)
//   const { lat, lon } = req.body;
//   const toXYconvert = toXY(lat, lon);
// }

// module.exports = { map };
  

  