import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changeUser } from "../actions/index"
import MapBox from "../components/MapBox"

const Container = styled.div``

export default function Map() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))

    return (
        <Container className="mapcontainer">
            <MapBox></MapBox>
        </Container>
    )
}
