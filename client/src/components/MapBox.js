import styled from "styled-components"
import React, { useEffect } from "react"

const ImgContainer = styled.div`
    // border: 2px solid red;
    width: 100%;
    height: 85vh;
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
        var map = new kakao.maps.Map(container, options)
    }, [])

    return <ImgContainer id="map"></ImgContainer>
}
