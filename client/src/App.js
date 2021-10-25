import "./App.css"
import {Switch, Route, Redirect} from "react-router-dom";
import Map from "./pages/Map"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import Body from "./components/Body"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"

{
    /* <Route exact path="/map"> */
}
{
    /* </Route> */
}
{
  /* <Route exact path="/login">
      <Login></Login>
    </Route> */
}

function App() {
  const isInput = true
  return (
    <div>
      <Header isInput={isInput}></Header>
        <Switch>
          {/* <Route exact path="/login">
              <Login></Login>
          </Route>
          */}
        <Route exact path="/map">
            <Map></Map>
        </Route> 

        {/* 로그인 상태인지 확인필요
        <Route exact path="/userInfo">
          <UserInfo/>
        </Route>
        <Route exact path="/more">
          <More />
        </Route> */}

        <Route exact path="/mypage">
          <MyPage />
        </Route> 

        </Switch>
      <MenuBar></MenuBar>
    </div>
  )
}

export default App
