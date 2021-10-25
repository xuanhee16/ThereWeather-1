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
        var map = new kakao.maps.Map(container, options)
    }, [])

    return <ImgContainer id="map"></ImgContainer>
}
