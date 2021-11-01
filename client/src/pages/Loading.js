import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changeUser } from "../actions/index"
import LoadingSpinner from "../components/LoadingSpinner"

const LoadingContainer = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	margin-top: calc(var(--mobile-header-height) / 2);
	width: 100vw;
	min-height: var(--mobile-page-height);
	background-color: #f8f9f94d; // 밝은 회색, opacity 0.3

	@media screen and (min-width: 1081px) {
		min-height: var(--desktop-page-height);
		margin-top: 0;
		margin-top: calc(var(--desktop-header-height) * 2);
	}
`

export default function Loading() {
	// const dispatch = useDispatch()
	// const { userInfo } = useSelector((state) => state.itemReducer)
	// dispatch(changeUser(axiosData))

	return (
		<LoadingContainer className="loadingContainer">
			<LoadingSpinner duration={'1.5s'} size={'80px'} />
		</LoadingContainer>
	)
}
