import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changeUser } from "../actions/index"

const LoadingContainer = styled.div``

export default function Loading() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))

    return (
        <LoadingContainer className="mapcontainer">
            <div>Loading중...</div>
        </LoadingContainer>
    )
}
