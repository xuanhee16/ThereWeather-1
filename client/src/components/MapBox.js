import styled from "styled-components"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeSearchword, changeCurLocation } from "../actions/index"

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: var(--mobile-page-height);

    @media screen and (min-width: 1081px) {
        height: var(--desktop-page-height);
    }
`

export default function Location(props) {
    const dispatch = useDispatch()
    const { searchWord } = useSelector((state) => state.itemReducer)
    const { kakao } = window

    console.log(searchWord)
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
        // var marker = new kakao.maps.Marker({
        //     // 지도 중심좌표에 마커를 생성합니다
        //     position: map.getCenter(),
        // })
        // 지도에 마커를 표시합니다
        // marker.setMap(map)
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
                console.log(arguments)
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
    }, [
        kakao.maps.LatLng,
        kakao.maps.Marker,
        kakao.maps.event,
        kakao.maps.Map,
        searchWord,
    ])

    return <ImgContainer id="map"></ImgContainer>
}
