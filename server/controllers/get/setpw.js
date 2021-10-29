const crypto = require('crypto');
require("dotenv").config();

module.exports = {
//암호화 
encrypto: (data) => {
  const algorithm = 'aes-256-cbc'; //암호화에 사용할 알고리즘
  const key = crypto.scryptSync(process.env.PW_KEY, process.env.PW_SALT, 24); //암호화 및 복호화 생성 키 설정
  const iv = crypto.randomBytes(16); //초기화 백터 
    if(!data){  
      return '';
    }
    const cipher = crypto.createCipheriv(algorithm, key, iv); //cipher 객체 
    const result = cipher.update(data, "utf-8", "base64"); //인코딩 
    result += cipher.final("base64");
    return result; 
},

//복호화
decrypto: (data) => { 
  const algorithm = 'aes-256-cbc'; //암호화에 사용할 알고리즘
  const key = crypto.scryptSync(process.env.PW_KEY, process.env.PW_SALT, 24); //암호화 및 복호화 생성 키 설정
  const iv = crypto.randomBytes(16); //초기화 백터    
    if(!data){
      return '';
    }
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const result2 = decipher.update(data, "base64", "utf-8");
    result2 += decipher.final("utf-8");
}
}