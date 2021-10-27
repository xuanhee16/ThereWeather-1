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
import MyPost from "./pages/MyPost"
<<<<<<< HEAD
import Write from "./pages/Write"
=======
import PostRead from "./pages/PostRead"
import styled from "styled-components"
>>>>>>> 602753d42a123382a6a49a9004c5a61490f0b4cf
// import { faRoute } from "@fortawesome/free-solid-svg-icons"



export default function App() {
    const isInput = true
    return (
        <>
            <Header isInput={isInput} />
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
<<<<<<< HEAD
                    <Route exact path="/write">
                        <Write></Write>
=======
                    <Route exact path="/mypost">
                        <MyPost></MyPost>
                    </Route>
                    <Route exact path="/postread">
                        <PostRead></PostRead>
>>>>>>> 602753d42a123382a6a49a9004c5a61490f0b4cf
                    </Route>
                </Switch>
            <MenuBar></MenuBar>
        </>
    )
}