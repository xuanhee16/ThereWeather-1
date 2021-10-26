import React, { useState } from "react"
import { Switch, Route, Redirect, useHistory, Router } from "react-router-dom"
import axios from "axios"
import "./App.css"
import Map from "./pages/Map"
import Home from "./pages/Home"
import BookMark from "./pages/BookMark"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"
import Login from "./pages/Login" // 이상아
import PasswordEdit from "./pages/PasswordEdit"; // 이상아
import SignUp from "./pages/SignUp"
import styled from "styled-components"
import MyPost from "./pages/MyPost"
// import { faRoute } from "@fortawesome/free-solid-svg-icons"

// 테스트 시작
import Write from "./pages/Write"


export default function App() {
    // const isInput = true
    return (
        <>
            <Header isMobileLogo/>
            <Write />
            <MenuBar />
        </>
    )
}
// 테스트 끝


{/* <Header isInput={isInput} />
                <Switch>
                    <Route exact path="/map">
                        <Map></Map>
                    </Route>
                    <Route exact path="/home">
                        <Home></Home>
                    </Route>
                    <Route exact path="/bookmark">
                        <BookMark></BookMark>
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
                    <Route exact path="/editpassword">
                        <PasswordEdit></PasswordEdit>
                    </Route>
                </Switch>
            <MenuBar></MenuBar> */}