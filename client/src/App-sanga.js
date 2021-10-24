import "./App.css"
// import styled from "styled-components"
import Map from "./pages/Map"
import Header from "./components/Header"
import Login from "./pages/Login"
import MenuBar from "./components/MenuBar"

/* // Route Starts
	{
		<Route exact path="/map">
	}
	{
		</Route>
	}
	{
		<Route exact path="/login">
			<Login></Login>
		</Route>
	}
*/ // Route Ends

function App() {
	return (
		<div>
			{/* 로그인 페이지, 로그아웃(로그인을 안 한) 상태 */}
			<Header isMobileLogo={true} isLogin={false} />
			<Login />
			<MenuBar />

			{/* 지도 페이지, 로그인한 경우 */}
			{/* <Header isInput={true} isLogin={true}/>
			<Map />
			<MenuBar /> */}
		</div>
	)
}

export default App
