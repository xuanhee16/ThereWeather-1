import React from "react"
// import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import MapBox from "../components/MapBox"

const Container = styled.div`
    // background-color: #f1319e;
    width: 100%;
    border: 1px solid pink;
    position: relative;

    @media screen and (min-width: 1081px) {
        // background-color: yellow;
        // max-width: 100%;
        width: 100%;
        position: relative;
    }
`

export default function Map() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
    // {/* <Container2 src="/img/fhd.png" /> */}

    return (
        <Container className="mapcontainer">
            <MapBox></MapBox>
        </Container>
    )
}
