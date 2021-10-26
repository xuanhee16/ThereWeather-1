import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory, Router } from "react-router-dom"
import axios from "axios"
import "./App.css"
import Map from "./pages/Map"
import Home from "./pages/Home"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import styled from "styled-components"

const Body = styled.div`
    // background-color: #3ae823;
    width: 100%;
    //아래가 pc
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
            <Header isInput={isInput} />
            <Body>
                <Switch>
                    <Route exact path="/map">
                        <Map></Map>
                    </Route>
                    <Route exact path="/home">
                        <Home></Home>
                    </Route>
                    <Route exact path="/userinfo">
                        <UserInfo></UserInfo>
                    </Route>
                    <Route exact path="/more">
                        <More></More>
                    </Route>
                    <Route exact path="/mypage">
                        <MyPage></MyPage>
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp></SignUp>
                    </Route>
                </Switch>
            </Body>
            <MenuBar></MenuBar>
        </>
    )
}
