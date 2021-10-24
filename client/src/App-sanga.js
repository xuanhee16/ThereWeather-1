import "./App.css"
// import styled from "styled-components"
// import Map from "./pages/Map"
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
			{/* 로그인페이지 */}
			<Header isLogo/>
			<Login />
			<MenuBar />
			{/* 지도페이지 */}
			{/* <Header isInput /> */}
			{/* <Map></Map> */}
			{/* <MenuBar /> */}
		</div>
	)
}

export default App
