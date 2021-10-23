import styled from "styled-components"
import React, { useEffect } from "react"

const ImgContainer = styled.div`
    // min-width: 10000px;
    // position: relative;
    padding-top: 222%;

    //아래가pc
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
