import styled from "styled-components"
import React, { useEffect } from "react"

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: var(--mobile-page-height);

    @media screen and (min-width: 1081px) {
        height: var(--desktop-page-height);
    }
`

export default function Location(props) {
    const { kakao } = window
    console.log(props)

    useEffect(() => {
        var container = document.getElementById("map")
        var options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 3,
        }
        var map = new kakao.maps.Map(container, options) //지도를 생성
        var zoomControl = new kakao.maps.ZoomControl() //줌컨트롤 생성
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT) //줌컨트롤 위치 조정
        // 지도를 클릭한 위치에 표출할 마커입니다
        var marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter(),
        })
        // 지도에 마커를 표시합니다
        marker.setMap(map)
        //클릭이벤트 함수
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            var latlng = mouseEvent.latLng
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng)
            //클릭한 곳의 위치 경도를 콘솔로그 찍는 변수
            var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, "
            message += "경도는 " + latlng.getLng() + " 입니다"
            console.log(message)
        })

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude // 경도

                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message =
                        '<div style="padding:5px;">여기에 계신가요?!</div>' // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message)
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
    }, [kakao.maps.LatLng, kakao.maps.Marker, kakao.maps.event, kakao.maps.Map])

    return <ImgContainer id="map"></ImgContainer>
}
