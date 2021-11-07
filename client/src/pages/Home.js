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
`;

const LeftContainer1 = styled.div`
display: flex;
gap: 0.1rem;
flex-direction: row;
width: 50vw;
flex-wrap: wrap;
.weatherInfo {
    text-align: center;
  }
.codiInfo {
  text-align: center;
}
`;


const LeftNav1 = styled.nav`
    text-align: center;
    flex-basis: 310px;
    flex-grow: 1;
    margin: 5px;
    padding: 10px;
`

const LeftNav2 = styled(LeftNav1)``
const LeftNav3 = styled(LeftNav1)``

const RightContainer = styled.div`
  display: grid;
  height:100vh;
  width: 80vw;
  grid-template-rows: 0.5fr 2.3fr 2.3fr 2.3fr 2.3fr;
  grid-template-columns: 1fr 1fr;
  grid-area: 
  "nav nav"
  "main main"
  "main main"
  ;
  grid-gap:0.1rem;
  transition: all 0.01s ease-in-out;
  //(max-width: 1081px)
  @media (max-width: 600px) {
    grid-template-rows: 0.5fr 0.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "nav"
      "main"
  }
  .userPost {
    text-align: center;
  }
`;


const RightNav1 = styled.nav`
    margin-top: 0.8rem;
    text-align: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "nav nav";
    grid-column: 1 / 3;
    grid-row: 1 / 2;
`
// const RightNav2 = styled(RightNav1)``;

const url = process.env.REACT_APP_LOCAL_URL;

export default function Home() {
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
 

    return (
        <div className="homecontainer">
            {/* <Loading /> */}
            <HomeContainer>
                <LeftContainer1>
                    <LeftNav1>
                        00구 주민예보
                        <div className="weatherInfo"></div>
                    </LeftNav1>
                    <LeftNav2>
                        기상청 일기예보
                        <div className="weatherInfo">
                        <ul>
                          {/* {console.log(weatherData.item)}  */}
                          {/* weatherData -> {item: Array(30)}, weatherData.item -> [ baseDate: '20211106',baseTime: '2130',category: 'T1H', fcstDate: '20211107', fcstTime: '0300', fcstValue: '10', nx: 59, ny: 128, ... ] */}
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>날짜:{info.baseDate}</li> })[0] }
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>기준 예보시각:{info.baseTime}</li> })[0] }
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 기온:{info.fcstValue}</li> })[24] } {/* T1H */}
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 하늘상태:{info.fcstValue === 1 ? "맑음" : (info.fcstValue === 3 ? "구름많음" : "흐림") }</li> })[18] } {/* SKY */}
                         {/* { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 날씨상태:{info.fcstValue === 0 ? null : "해"}</li> })[6] } PTY */}
                         { weatherData && weatherData.item.map((info, idx) => { return <li kye={idx}>현재위치 날씨상태:{info.fcstValue === 0 ? (info.fcstValue === 1 ? "비" : "눈"): "해" }</li> })[6] } {/* PTY */}
                        </ul> 
                        </div>
                    </LeftNav2>
                    <LeftNav3>
                        00구 날씨 기반 추천 코디
                        <div className="codiInfo"></div>
                    </LeftNav3>
                </LeftContainer1>

                <RightContainer>
                    <RightNav1>00구 주민예보글</RightNav1>
                    {/* <RightNav2>오른쪽2</RightNav2> */}
                    <div className="userPost">1</div>
                    <div className="userPost">2</div>
                    <div className="userPost">3</div>
                    <div className="userPost">4</div>
                    <div className="userPost">5</div>
                    <div className="userPost">6</div>
                    <div className="userPost">7</div>
                    <div className="userPost">8</div>
                </RightContainer>
            </HomeContainer>
        </div>
    )
}
