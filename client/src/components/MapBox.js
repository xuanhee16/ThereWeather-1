import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeSearchword, changeCurLocation } from "../actions/index"
import $ from "jquery"
import axios from "axios"
import { Doughnut, Bar } from "react-chartjs-2"

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: var(--mobile-page-height);

    @media screen and (min-width: 1081px) {
        height: var(--desktop-page-height);
    }
`
const PostListModal = styled.div`
    border: 1px solid black;
    background-color: white;
    z-index: 999;
    position: absolute;
    right: 0;
    bottom: 70px;
    width: 50%;
    height: 70%;
    overflow: auto;
    @media screen and (min-width: 1081px) {
        border: 1px solid pink;
        background-color: white;
        z-index: 999;
        position: absolute;
        right: 0;
        bottom: 70px;
        width: 35.3%;
        height: 75%;
        overflow: auto;
    }
`
const GraphModal = styled.div`
    // border: 1px solid black;
    width: 50%;
    display: flex;

    @media screen and (min-width: 1081px) {
        border: 1px solid pink;
    }
`

const GraphTitle = styled.div`
    // border: 1px solid black;

    width: 100%;
    display: flex;
    flex-direction: row;

    @media screen and (min-width: 1081px) {
        border: 1px solid pink;
    }
`
const GraphTitleDiv = styled.div`
    // border: 1px solid black;
    // margin: 1px;
    width: 100%;

    @media screen and (min-width: 1081px) {
        border: 1px solid pink;
    }
`
const BarGraphFlex = styled.div`
    // border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    // @media screen and (min-width: 1081px) {
    //     border: 1px solid pink;
    // }
`
const BarGraphchild = styled.div`
    // border: 1px solid black;
    width: 100%;

    // @media screen and (min-width: 1081px) {
    //     border: 1px solid pink;
    // }
`

let url = process.env.REACT_APP_LOCAL_URL
if (!url) url = "https://thereweather.space"

export default function Location(props) {
    const dispatch = useDispatch()
    const { searchWord } = useSelector((state) => state.itemReducer)
    const { kakao } = window
    const [weatherCount, setWeatherCount] = useState({
        sunny: 0,
        cloudy: 0,
        rainy: 0,
        snowy: 0,
    }) //그래프 통계용

    const [postList, setPostList] = useState([
        {
            bottom_id: "",
            createdAt: "Z",
            id: null,
            post_content: "",
            post_photo: "",
            post_title: "예보가 없는 지역 입니다.",
            temp: "",
            top_id: "",
            updatedAt: "",
            user_id: "",
            weather: "",
            wind: "",
            xLocation: null,
            yLocation: null,
        },
    ])

    console.log(searchWord)
    console.log(props)

    //현재 위치 test
    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude // 경도
                console.log(lat, lon) //브라우저에 찍힘
                axios({
                    url: url + "/map",
                    headers: {
                        accept: "application/json",
                    },
                    method: "post",
                    data: { lat: lat, lon: lon },
                    withCredentials: true,
                }).then((res) => console.log(res))
            })
        }
    }, [])

    //-----------------------------------------------------------------

    useEffect(() => {
        var container = document.getElementById("map")
        var options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 3,
        }
        var map = new kakao.maps.Map(container, options) //지도를 생성
        var zoomControl = new kakao.maps.ZoomControl() //줌컨트롤 생성
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT) //줌컨트롤 위치 조정
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">현재 나의 위치</div>' // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message)
                console.log(locPosition)

                console.log(lat) //위도
                console.log(lon) //경도
                dispatch(changeCurLocation(lat, lon))
            })
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = "geolocation을 사용할수 없어요.."

            displayMarker(locPosition, message)
        }
        // 지도에 마커와 인포윈도우를 표시하는 함수입니다

        function displayMarker(locPosition, message) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
            })

            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
            })

            // 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker)

            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition)
        }

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder()

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(searchWord, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x)

                // 결과값으로 받은 위치를 마커로 표시합니다
                // var marker = new kakao.maps.Marker({
                //     map: map,
                //     position: coords,
                // })
                // console.log(arguments)
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${arguments[0][0].road_address.address_name} 지역</div>`,
                // })
                // infowindow.open(map, marker)

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                dispatch(changeSearchword(searchWord))
                map.setCenter(coords)
            }
        })

        //클릭이벤트 함수
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            var latlng = mouseEvent.latLng
            // 마커 위치를 클릭한 위치로 옮깁니다
            // marker.setPosition(latlng)
            //클릭한 곳의 위치 경도를 콘솔로그 찍는 변수
            var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, "
            message += "경도는 " + latlng.getLng() + " 입니다"
            console.log(message)
        })
        //////////////////////////////////////////고정-hoon/////////////////////////////////////////

        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 9, // 클러스터 할 최소 지도 레벨
        })

        // 데이터를 가져오기 위해 jQuery를 사용합니다
        // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
        $.get(url + "/post/location", function (data) {
            // 데이터에서 좌표 값을 가지고 마커를 표시합니다
            // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
            console.log($(data.positions))
            var markers = $(data.positions).map(function (i, position) {
                return new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(
                        position.xLocation,
                        position.yLocation
                    ),
                })
            })
            console.log(markers)
            console.log($(data.positions)[0])
            $(data.positions).map((n, idx) => {
                console.log($(data.positions))
                // $(data.positions).map((el) => {
                //     console.log(el)
                //     if ($(data.positions)[el].weather === "sunny") {
                //         setWeatherCount({
                //             ...weatherCount,
                //             sunny: weatherCount.sunny + 1,
                //         })
                //     } else if ($(data.positions)[el].weather === "cloudy") {
                //         setWeatherCount({
                //             ...weatherCount,
                //             cloudy: weatherCount.cloudy + 1,
                //         })
                //     } else if ($(data.positions)[el].weather === "rainy") {
                //         setWeatherCount({
                //             ...weatherCount,
                //             rainy: weatherCount.rainy + 1,
                //         })
                //     } else if ($(data.positions)[el].weather === "snowy") {
                //         setWeatherCount({
                //             ...weatherCount,
                //             snowy: weatherCount.snowy + 1,
                //         })
                //     }
                // })

                var iwContent = `
                <container style="border:3px solid pink; padding:5px; height:20rem; width:15rem; display:flex; flex-direction: row;">
                    <box style="">
                        <h3>${$(data.positions)[n].post_title}</h3>
                            <box style="display:flex; flex-direction: row;">
                            
                        ${
                            $(data.positions)[n].weather === "sunny"
                                ? "<img src='img/icons-write/sunny.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "cloudy"
                                ? "<img src='img/icons-write/cloudy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "rainy"
                                ? "<img src='img/icons-write/rainy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "snowy"
                                ? "<img src='img/icons-write/snowy.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].wind === "breezy"
                                ? "<img src='img/icons-write/breezy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].wind === "windy"
                                ? "<img src='img/icons-write/windy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].wind === "strong"
                                ? "<img src='img/icons-write/strong.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].temp === "cold"
                                ? "<img src='img/icons-write/cold.png' style='width:2rem;'/>"
                                : $(data.positions)[n].temp === "hot"
                                ? "<img src='img/icons-write/hot.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].top_id === "tshirts"
                                ? "<img src='img/icons-write/tshirts.png' style='width:2rem;'/>"
                                : $(data.positions)[n].top_id === "shirts"
                                ? "<img src='img/icons-write/shirts.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].bottom_id === "shorts"
                                ? "<img src='img/icons-write/shorts.png' style='width:2rem;'/>"
                                : $(data.positions)[n].bottom_id === "pants"
                                ? "<img src='img/icons-write/pants.png' style='width:2rem;'/>"
                                : null
                        }
                        </box>
                        <img src=${
                            $(data.positions)[n].post_photo
                        } style="padding:5px; width:80%;"></img>
                        <div>${$(data.positions)[n].post_content}</div>
                    </box>
                </container>


                             `, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                    iwRemoveable = true // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: iwRemoveable,
                })
                kakao.maps.event.addListener(markers[n], "click", function () {
                    // 마커 위에 인포윈도우를 표시합니다
                    infowindow.open(map, markers[n])
                })
            })

            clusterer.addMarkers(markers)
        })

        let timer
        // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "idle", function () {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(function () {
                console.log("지도 위치가 변경 될 때마다 API요청")
                // setWeatherCount({
                //     sunny: 0,
                //     cloudy: 0,
                //     rainy: 0,
                //     snowy: 0,
                // })
                // 지도 영역정보를 얻어옵니다
                var bounds = map.getBounds()

                // 영역정보의 남서쪽 정보를 얻어옵니다
                var swLatlng = bounds.getSouthWest()

                // 영역정보의 북동쪽 정보를 얻어옵니다
                var neLatlng = bounds.getNorthEast()

                var message =
                    "영역좌표는 남서쪽 위도, 경도는  " +
                    swLatlng.toString() +
                    "이고 <br>"
                message +=
                    "북동쪽 위도, 경도는  " + neLatlng.toString() + "입니다 "

                // setTimeout(() => {
                console.log(message)
                console.log(swLatlng)
                console.log(neLatlng)
                axios({
                    url:
                        url +
                        `/post/list?top=${neLatlng.La}&bottom=${swLatlng.La}&left=${swLatlng.Ma}&right=${neLatlng.Ma}`,
                    // url: url + "/signup",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        // "Content-Type": "text/plain",
                    },
                    withCredentials: true,
                }).then((res) => {
                    console.log(res.data)
                    setPostList(res.data)
                    console.log(postList)
                    let sunny = 0
                    let cloudy = 0
                    let rainy = 0
                    let snowy = 0
                    for (let n = 0; n < res.data.length; n++) {
                        if (res.data[n].weather === "sunny") {
                            sunny = sunny + 1
                        } else if (res.data[n].weather === "cloudy") {
                            cloudy++
                        } else if (res.data[n].weather === "rainy") {
                            rainy++
                        } else if (res.data[n].weather === "snowy") {
                            snowy++
                        }
                    }
                    setWeatherCount({
                        sunny: sunny,
                        cloudy: cloudy,
                        rainy: rainy,
                        snowy: snowy,
                    })
                })
            }, 1000)
        })
    }, [
        kakao.maps.LatLng,
        kakao.maps.Marker,
        kakao.maps.event,
        kakao.maps.Map,
        searchWord,
    ])

    const Box = styled.div`
        // display: flex;
        // flex-direction: row;
        width: 50%;
        // height: 50%;
        @media screen and (min-width: 1081px) {
        }
    `
    const Box2 = styled.div`
        // display: flex;
        // flex-direction: row;
        // width: 10000px;

        @media screen and (min-width: 1081px) {
        }
    `
    const EmoticonBox = styled.div`
        display: flex;
        flex-direction: row;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostTitle = styled.div`
        // display: flex;
        // flex-direction: row;
        width: 50%;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostContent = styled.div`
        // display: flex;
        // flex-direction: row;
        width: 50%;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostBox = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostImg = styled.img`
        width: 100%;

        @media screen and (min-width: 1081px) {
        }
    `
    const IconImg = styled.img`
        width: 20%;

        @media screen and (min-width: 1081px) {
        }
    `
    console.log(weatherCount)
    const data = {
        labels: ["맑음", "구름", "비", "폭뢰"],
        datasets: [
            {
                data: [
                    weatherCount.sunny,
                    weatherCount.cloudy,
                    weatherCount.rainy,
                    weatherCount.snowy,
                ],
                backgroundColor: ["#FF6384", "gray", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "gray", "#36A2EB", "#FFCE56"],
            },
        ],
    }
    const data2 = {
        labels: ["사용자예보", "기상청"],
        datasets: [
            {
                label: "강수 확률",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [
                    ((weatherCount.rainy + weatherCount.snowy) /
                        (weatherCount.sunny +
                            weatherCount.cloudy +
                            weatherCount.rainy +
                            weatherCount.snowy)) *
                        100,
                    10,
                ],
            },
        ],
    }
    return (
        <>
            <ImgContainer id="map"></ImgContainer>
            <PostListModal>
                <GraphTitleDiv>현재지역</GraphTitleDiv>
                <GraphTitle>
                    <GraphTitleDiv>사용자 예보 날씨 비율</GraphTitleDiv>
                    <GraphTitleDiv>
                        사용자예보 vs 기상청예보 강수확률
                    </GraphTitleDiv>
                </GraphTitle>
                <GraphModal>
                    <Doughnut data={data} />
                    <BarGraphFlex>
                        <BarGraphchild>
                            <Bar data={data2} />
                        </BarGraphchild>
                    </BarGraphFlex>
                </GraphModal>
                {postList.map((post) => {
                    return (
                        <PostBox>
                            <Box>
                                <PostImg src={`${post.post_photo}`} />
                                <EmoticonBox>
                                    <IconImg
                                        src={`/img/icons-write/${post.weather}.png`}
                                    />
                                    <IconImg
                                        src={`/img/icons-write/${post.wind}.png`}
                                    />
                                    <IconImg
                                        src={`/img/icons-write/${post.temp}.png`}
                                    />
                                    <IconImg
                                        src={`/img/icons-write/${post.top_id}.png`}
                                    />
                                    <IconImg
                                        src={`/img/icons-write/${post.bottom_id}.png`}
                                    />
                                </EmoticonBox>
                            </Box>
                            <Box2>
                                <PostTitle>{`${post.post_title}`}</PostTitle>
                                <PostContent>{`${post.post_content}`}</PostContent>
                            </Box2>
                        </PostBox>
                    )
                })}
            </PostListModal>
        </>
    )
}

// useEffect(() => {
//     var container = document.getElementById("map")
//     var options = {
//         center: new kakao.maps.LatLng(37.5642135, 127.0016985),
//         level: 9,
//     }
//     var map = new kakao.maps.Map(container, options) //지도를 생성
//     var zoomControl = new kakao.maps.ZoomControl() //줌컨트롤 생성
//     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT) //줌컨트롤 위치 조정
//     // 지도를 클릭한 위치에 표출할 마커입니다
//     // var marker = new kakao.maps.Marker({
//     //     // 지도 중심좌표에 마커를 생성합니다
//     //     position: map.getCenter(),
//     // })
//     // 지도에 마커를 표시합니다
//     // marker.setMap(map)
//     //클릭이벤트 함수
//     kakao.maps.event.addListener(map, "click", function (mouseEvent) {
//         // 클릭한 위도, 경도 정보를 가져옵니다
//         var latlng = mouseEvent.latLng
//         // 마커 위치를 클릭한 위치로 옮깁니다
//         // marker.setPosition(latlng)
//         //클릭한 곳의 위치 경도를 콘솔로그 찍는 변수
//         var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, "
//         message += "경도는 " + latlng.getLng() + " 입니다"
//         console.log(message)
//     })

//     // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
//     if (navigator.geolocation) {
//         // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//         navigator.geolocation.getCurrentPosition(function (position) {
//             var lat = position.coords.latitude, // 위도
//                 lon = position.coords.longitude // 경도

//             var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//                 message = '<div style="padding:5px;">현재 나의 위치</div>' // 인포윈도우에 표시될 내용입니다

//             // 마커와 인포윈도우를 표시합니다
//             displayMarker(locPosition, message)
//             console.log(locPosition)

//             console.log(lat) //위도
//             console.log(lon) //경도
//             dispatch(changeCurLocation(lat, lon))
//         })
//     } else {
//         // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

//         var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
//             message = "geolocation을 사용할수 없어요.."

//         displayMarker(locPosition, message)
//     }

//     // 지도에 마커와 인포윈도우를 표시하는 함수입니다
//     function displayMarker(locPosition, message) {
//         // 마커를 생성합니다
//         var marker = new kakao.maps.Marker({
//             map: map,
//             position: locPosition,
//         })

//         var iwContent = message, // 인포윈도우에 표시할 내용
//             iwRemoveable = true

//         // 인포윈도우를 생성합니다
//         var infowindow = new kakao.maps.InfoWindow({
//             content: iwContent,
//             removable: iwRemoveable,
//         })

//         // 인포윈도우를 마커위에 표시합니다
//         infowindow.open(map, marker)

//         // 지도 중심좌표를 접속위치로 변경합니다
//         map.setCenter(locPosition)
//     }

//     // 주소-좌표 변환 객체를 생성합니다
//     var geocoder = new kakao.maps.services.Geocoder()

//     // 주소로 좌표를 검색합니다
//     geocoder.addressSearch(searchWord, function (result, status) {
//         // 정상적으로 검색이 완료됐으면
//         if (status === kakao.maps.services.Status.OK) {
//             var coords = new kakao.maps.LatLng(result[0].y, result[0].x)

//             // 결과값으로 받은 위치를 마커로 표시합니다
//             // var marker = new kakao.maps.Marker({
//             //     map: map,
//             //     position: coords,
//             // })
//             console.log(arguments)
//             // 인포윈도우로 장소에 대한 설명을 표시합니다
//             // var infowindow = new kakao.maps.InfoWindow({
//             //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${arguments[0][0].road_address.address_name} 지역</div>`,
//             // })
//             // infowindow.open(map, marker)

//             // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//             dispatch(changeSearchword(searchWord))
//             map.setCenter(coords)
//         }
//     })
//     // 마커찍기
//     // var positions = [
//     //     {
//     //         title: "남산 등산 시작 하는 사람",
//     //         latlng: new kakao.maps.LatLng(
//     //             37.54985519962201,
//     //             126.98760278488614
//     //         ),
//     //     },
//     //     {
//     //         title: "남산 중턱에 있는 사람",
//     //         latlng: new kakao.maps.LatLng(
//     //             37.55097273746865,
//     //             126.990895747622
//     //         ),
//     //     },
//     //     {
//     //         title: "남산 동쪽에 있는 사람",
//     //         latlng: new kakao.maps.LatLng(
//     //             37.54959434528029,
//     //             126.99286497772725
//     //         ),
//     //     },
//     //     {
//     //         title: "남산 정상 도착한 사람",
//     //         latlng: new kakao.maps.LatLng(
//     //             37.548621124373355,
//     //             126.99080550321914
//     //         ),
//     //     },
//     // ]
//     // var imageSrc =
//     //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
//     // for (var i = 0; i < positions.length; i++) {
//     //     // 마커 이미지의 이미지 크기 입니다
//     //     var imageSize = new kakao.maps.Size(24, 35)

//     //     // 마커 이미지를 생성합니다
//     //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

//     //     // 마커를 생성합니다
//     //     var marker = new kakao.maps.Marker({
//     //         map: map, // 마커를 표시할 지도
//     //         position: positions[i].latlng, // 마커를 표시할 위치
//     //         title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//     //         image: markerImage, // 마커 이미지
//     //     })
//     // }
//     // 마커 클러스터러를 생성합니다
//     var clusterer = new kakao.maps.MarkerClusterer({
//         map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
//         averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
//         minLevel: 9, // 클러스터 할 최소 지도 레벨
//     })

//     // 데이터를 가져오기 위해 jQuery를 사용합니다
//     // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
//     $.get(url + "/post/location", function (data) {
//         // 데이터에서 좌표 값을 가지고 마커를 표시합니다
//         // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
//         // // console.log($(data.positions))
//         // var markers = $(data.positions).map((i, position) => {
//         //     return new kakao.maps.Marker({
//         //         position: new kakao.maps.LatLng(position.lat, position.lng),
//         //     })
//         // })
//         // console.log(markers)
//         // // 클러스터러에 마커들을 추가합니다
//         // clusterer.addMarkers(markers)
//         //////////////////////////////////////////////////////////
//         ////////////////////////////////////////////////////
//     })
// }, [
//     kakao.maps.LatLng,
//     kakao.maps.Marker,
//     kakao.maps.event,
//     kakao.maps.Map,
//     searchWord,
// ])
