import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
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
import Login from "./pages/Login"
import PasswordEdit from "./pages/PasswordEdit"
import SignUp from "./pages/SignUp"
import MyPost from "./pages/MyPost"
import Write from "./pages/Write"
import PostRead from "./pages/PostRead"
import PostEdit from "./pages/PostEdit"
import { changeIsLogin } from "./actions/index"
// import Loading from "./pages/Loading" // TODO PR할 때 지워주세요
import styled from "styled-components"

export default function App() {
    const dispatch = useDispatch()

    const isInput = true
    const { isLogin } = useSelector((state) => state.itemReducer)
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("ATOKEN")))
        //auth할차례
        axios({
            url: "http://localhost/users/auth",
            method: "get",
            headers: {
                authorization: `token ${JSON.parse(
                    localStorage.getItem("ATOKEN")
                )}`,
                accept: "application/json",
            },
        }).then((res) => {
            console.log(res.data)
            dispatch(changeIsLogin(res.data))
        })

    }, [dispatch])

    return (
        <>
            <Header isInput={isInput} />
            {/* TODO 로딩 테스트 시작 (PR할 때 지워주세요) */}
            {/* <Loading /> */}
            {/* 로딩 테스트 끝 (PR할 때 지워주세요) */}
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
                <Route exact path="/write">
                    <Write></Write>
                </Route>
                <Route exact path="/mypost">
                    <MyPost></MyPost>
                </Route>
                <Route exact path="/postread">
                    <PostRead></PostRead>
                </Route>
                <Route exact path="/writeorlogin">
                    {isLogin ? (
                        <Redirect to="/write" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route exact path="/bookmarkorlogin">
                    {isLogin ? (
                        <Redirect to="/bookmark" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route exact path="/homeorlogin">
                    {isLogin ? (
                        <Redirect to="/home" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route exact path="/moreoruserinfo">
                    {isLogin ? (
                        <Redirect to="/userinfo" />
                    ) : (
                        <Redirect to="/more" />
                    )}
                </Route>
                <Route exact path="/editpost">
                    <PostEdit></PostEdit>
                </Route>
                <Route exact path="/">
                    {isLogin ? <Redirect to="/home" /> : <Redirect to="/map" />}
                </Route>
            </Switch>
            <MenuBar></MenuBar>
        </>
    )
}
