import styled from "styled-components"
import React, { useEffect } from "react"

const ImgContainer = styled.div`
    // min-width: 10000px;
    // position: relative;
    padding-top: 222%;

    @media screen and (min-width: 1081px) {
        // max-width: 1920px;
        // max-height: 1080px;
        // height: 1080px;
        // position: relative;
        padding-top: 56%;
    }
`

export default function Location(props) {
    const { kakao } = window
    console.log(props)

    // useEffect(() => {
    //     // <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=56da23e85568f5cc18b76765c5e2e6fb"></script>
    //     const script = document.createElement("script")
    //     script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=56da23e85568f5cc18b76765c5e2e6fb"
    //     script.async = true
    //     document.body.appendChild(script)
    //     return () => {
    //         document.body.removeChild(script)
    //     }
    // }, [])

    useEffect(() => {
        var container = document.getElementById("map")
        var options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 3,
        }
        var map = new kakao.maps.Map(container, options)

        //////////////
        // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            // 클릭한 위치에 마커를 표시합니다
            addMarker(mouseEvent.latLng)
        })

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = []

        // 마커 하나를 지도위에 표시합니다
        addMarker(new kakao.maps.LatLng(33.450701, 126.570667))

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: position,
            })

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map)

            // 생성된 마커를 배열에 추가합니다
            markers.push(marker)
            console.log(markers)
        }

        // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
        function setMarkers(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map)
            }
        }

        // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
        function showMarkers() {
            setMarkers(map)
        }

        // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
        function hideMarkers() {
            setMarkers(null)
        }
    }, [])

    return <ImgContainer id="map"></ImgContainer>
}
