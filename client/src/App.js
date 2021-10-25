import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory, Router } from "react-router-dom"
import axios from "axios"
import "./App.css"
import styled from "styled-components"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import Map from "./pages/Map"
import Loading from "./pages/Loading"
import GlobalStyle from "./components/GlobalStyle"
// import Location from "./components/MapBox"

const Wrap = styled.div`
    border: 1px solid red;

    width: 100%;

        @media screen and (min-width: 1081px) {
        border: 1px solid black;
        width: 95%;
        margin: 0 auto;
    }
`
const Body = styled.div`
    // background-color: #3ae823;
    width: 100%;

        @media screen and (min-width: 1081px) {
        // background-color: green;
        position: relative;
        // border: 1px solid blue;

        width: 100%;
    }
`

export default function App() {
    const isInput = true
    return (
        <>
            <GlobalStyle />
            <Wrap>
                <Header isInput={isInput}></Header>
                <Body>
                    <Switch>
                        <Route exact path="/map">
                            <Map></Map>
                        </Route>
                        <Route exact path="/loading">
                            <Loading></Loading>
                        </Route>
                    </Switch>
                    <MenuBar></MenuBar>
                </Body>
            </Wrap>
        </>
    )
}
