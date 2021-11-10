import React, { useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { updateWeatherInfo } from "../actions/index"
// import Loading from "./Loading";

const HomeContainer = styled.div`
display: flex;
flex-direction: row;
background-color: var(--page-bg-color);
ul {
  list-style: none;
}

@media screen and (min-width: 1500px) {
  margin: 0 auto;
  width: 90%;
  border: 1px solid #aaa;
}
@media screen and (max-width: 1081px) {
  flex-direction: column;
  margin: 0 auto;
  padding: 0 2vw;
  border: 1px solid #aaa;
  width: 85%;
}
@media screen and (max-width: 900px) {
  width: 100%;
}
`;

// 왼족 container
const LeftContainer1 = styled.div`
display: flex;
gap: 0.1rem;
flex-direction: row;
width: 40vw;
flex-wrap: wrap;
.weatherInfo {
    text-align: center;
  }
.codiInfo {
  text-align: center;
}
@media screen and (max-width: 1081px) {
  /* border: 1px solid red; */
  margin: 0 auto;
  width: 100%;
}
`;

// 00구 주민예보
const LeftNav1 = styled.nav`
  text-align: center;
  flex-basis: 310px;
  flex-grow: 1;
  margin: 30px 5px 5px 5px;
  padding: 10px;
  line-height: 3vh;
  height: 25%;
  /* border: 1px solid blue; */
  background-color: #FFFFFF;
  p {
    font-size: 1.2rem;
    margin-bottom: 1vh;
  }
  @media screen and (max-width: 1081px) {
    margin-top: 5px;
  }

  @media screen and (max-width: 375px) {
    margin-top: 10px;
    line-height: 4vh;
  }
  `
// 기상청 일기예보
const LeftNav2 = styled.div`
  text-align: center;
  flex-basis: 310px;
  flex-grow: 1;
  margin: 5px;
  padding: 10px;
  line-height: 3vh;
  height: 25%;
  /* border: 1px solid blue; */
  background-color: #FFFFFF;
  p {
    font-size: 1.2rem;
    margin-bottom: 1vh;
  }
  @media screen and (max-width: 375px) {
    line-height: 4vh;
  }
`
// 00구 날씨 기반 추천 코디
const LeftNav3 = styled.div`
  text-align: center;
  flex-basis: 310px;
  flex-grow: 1;
  margin: 3px;
  padding: 10px;
  background-color: #FFFFFF;
  /* border: 1px solid pink; */
  height: 40%;
  p {
    font-size: 1.2rem;
    margin: 2vh 0;
  }
  .codiInfo{
    /* border: 1px solid hotpink; */
    height: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  @media screen and (max-width: 1081px) {
    height: 30vh;
    flex-basis: 100vh;
    flex-grow: 2;
  }
  @media screen and (max-width: 375px) {
    p {
      font-size: 1rem;
      margin: 1vh 0;
    }
  }

`
// 코디 이미지
const Codi = styled.img`
  width: 7rem;
  height: 7rem;
  @media screen and (max-width: 400px) {
    width: 5rem;
    height: 5rem;
  }
`

// 오른쪽 container
const RightContainer = styled.div`
  display: grid;
  height:100vh;
  width: 80vw;
  grid-template-rows: 0.5fr 2.3fr 2.3fr 2.3fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-area: 
  "nav nav"
  "main main"
  "main main"
  ;
  grid-gap:0.1rem;
  transition: all 0.01s ease-in-out;
  //(max-width: 1081px)
  
  @media (max-width: 600px) {
    .userPost:nth-last-child(1){
      display: none;
    }
    grid-template-rows: 0.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "nav"
      "main";
  }
  .userPost {
    text-align: center;
    border: 1px solid #aaa;
  }
  /* border: 1px solid purple; */
  @media screen and (max-width: 1081px) {
    margin: 0 auto;
    width: 100%;
  }
`;

// '00구 주민예보글'
const RightNav1 = styled.nav`
    margin-top: 0.8rem;
    text-align: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "nav nav";
    grid-column: 1 / 4;
    grid-row: 1 / 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 1vh;
    #location{
      font-size: 1.5rem;
      color: #8E8E8E;
    }
    #moreView{
      color: #336fc9;
    }
    @media screen and (max-width: 600px) {
      grid-column: 1 / 3;
      #location{
        font-size: 1rem;
      }
    }
`
// const RightNav2 = styled(RightNav1)``;

const url = process.env.REACT_APP_LOCAL_URL;

export default function Home() {
  // 날짜
    const dispatch = useDispatch()
    const { item } = useSelector((state) => state.itemReducer)
    console.log(item)
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
  
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude, // 위도
              lon = position.coords.longitude // 경도
          console.log(lat, lon) //브라우저에 찍힘        
          axios({
              url: url + "/map",
              method: "post",   
              data: { lat: lat, lon: lon },
              withCredentials: true
          })
          .then((res) => {
            //console.log(res.data)
            //console.log(res.data.item)
            setWeatherData(res.data)
            dispatch(updateWeatherInfo(res.data))    
          })
      })
    };
  }, [])

  {/* 최근게시물 test 중 */}
  useEffect(() => {
    axios({
      url: url + "/home",
      method: "get",
      ithCredentials: true
    }).then((res) => {
      console.log(res);
    })
  }, [])

    return (
        <div className="homecontainer">
            {/* <Loading /> */}
            <HomeContainer>
                <LeftContainer1>
                    <LeftNav1>
                        <p>{'00구'}주민예보</p>
                        <div className="weatherInfo">
                          <ul>
                            <li>날짜: {}</li>
                            <li>현재위치 체감온도: {}</li>
                            <li>현재위치 바람세기: {}</li>
                            <li>현재위치 날씨상태: {}</li>
                          </ul>
                        </div>
                    </LeftNav1>
                    <LeftNav2>
                        <p>기상청 일기예보</p>
                        <div className="weatherInfo">
                        <ul>
                          {/* {console.log(weatherData.item)}  */}
                          {/* weatherData -> {item: Array(30)}, weatherData.item -> [ baseDate: '20211106',baseTime: '2130',category: 'T1H', fcstDate: '20211107', fcstTime: '0300', fcstValue: '10', nx: 59, ny: 128, ... ] */}

                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>날짜:{info.baseDate}</li> })[0] }
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>기준 예보시각:{info.baseTime}</li> })[0] }
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 기온:{info.fcstValue}℃</li> })[24] } {/* T1H */}
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 바람세기:{info.fcstValue  < "9" ? "바람세기 약하거나 약간 강함" : info.fcstValue  < "14" ? "바람세기 강함" : "바람세기 매우 강함" }</li> })[54] } {/* WSD */}
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 날씨상태:{info.fcstValue === "0" ? "맑음" : info.fcstValue === "1" ? "비" : info.fcstValue === "3" ? "눈" : info.fcstValue === "5" ? "빗방울" : "눈날림" }</li> })[6] } {/* PTY */}

                        </ul> 
                        </div>
                    </LeftNav2>
                    <LeftNav3>
                        <p>{'00구 '}날씨 기반 추천 코디</p>
                        <div className="codiInfo">
                          <Codi src={`${process.env.PUBLIC_URL}img/codi/자켓.png`} alt="겉옷"></Codi>
                          <Codi src={`${process.env.PUBLIC_URL}img/codi/긴팔.png`} alt="상의"></Codi>
                          <Codi src={`${process.env.PUBLIC_URL}img/codi/긴바지.png`} alt="하의"></Codi>
                        </div>
                    </LeftNav3>
                </LeftContainer1>

                <RightContainer>
                    <RightNav1>
                      <span id="location">{'00구'} 주민예보글</span>
                    </RightNav1>
                    {/* <RightNav2>오른쪽2</RightNav2> */}
                    <div className="userPost">1</div>
                    <div className="userPost">2</div>
                    <div className="userPost">3</div>
                    <div className="userPost">4</div>
                    <div className="userPost">5</div>
                    <div className="userPost">6</div>
                    <div className="userPost">7</div>
                    <div className="userPost">8</div>
                    <div className="userPost">9</div>
                </RightContainer>
            </HomeContainer>
        </div>
    )
}
