// 렌더링 테스트용 파일

import "./App.css"
import {Switch, Route, Redirect} from "react-router-dom";
import Map from "./pages/Map"
import Home from "./pages/Home"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import Login from "./pages/Login"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"
import styled from "styled-components"
// import { faRoute } from "@fortawesome/free-solid-svg-icons"
import PasswordEdit from "./pages/PasswordEdit";

const Body = styled.div`
//바디넣을 디자인 
`;

function App() {
  return (
    <div className="App">
      <Header isLogin isMobileLogo />
      <Login />
      <PasswordEdit />
      <MenuBar />
    </div>
  );
}

export default App

// function App() {
  //     const isInput = true
  //     return (
  //     <>
  //       <Header isInput={isInput} />
  //         <Switch>
  //             <Route exact path="/map">
  //               <Map></Map>  
  //             </Route>  
  //             <Route exact path="/home">
  //               <Home></Home>  
  //             </Route> 
  //         </Switch>
  //     <MenuBar></MenuBar>
  //     </>
  //     )
  // }