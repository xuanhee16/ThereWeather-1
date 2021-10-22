import React, { useState, useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import MapBox from "./MapBox"

const BodyContainer = styled.div`
    border: 1px solid blue;

    width: 100%;
    // height: 900px;
`

export default function Body() {
    const { usernick } = useSelector((state) => state.itemReducer)
    console.log(usernick)

    return (
        <BodyContainer>
            {/* <MapBox></MapBox> */}
            {/* <div>{usernick.id}</div>
            <div>{usernick.userId}</div>
            <div>{usernick.password}</div> */}
        </BodyContainer>
    )
}
