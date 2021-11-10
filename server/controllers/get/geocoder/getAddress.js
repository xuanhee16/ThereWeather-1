require("dotenv").config();
const axios = require('axios');

module.exports = async function(xLocation, yLocation) {
  try {
    return (
      axios({
        method: 'get',
        url: `http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${yLocation},${xLocation}&format=json&type=both&zipcode=false&simple=true&key=${process.env.GEOCODER_AUTH_KEY}`
      })
      .then(res => {
        return res.data.response.result[1].structure;
      })
      .catch(err => {
        return 'bad request';
      })
    );
  } catch {
    return 'bad request'
  }
}