import "./App.css"
import {Switch, Route, Redirect} from "react-router-dom";
import Map from "./pages/Map"
import Home from "./pages/Home"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"
import styled from "styled-components"
// import { faRoute } from "@fortawesome/free-solid-svg-icons"

const Body = styled.div`
//바디넣을 디자인 
`;


function App() {
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
        </Switch>
    <MenuBar></MenuBar>
    </>
    )
}

export default App
