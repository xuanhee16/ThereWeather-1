import "./App.css"
// import styled from "styled-components"
// import Map from "./pages/Map"
import Header from "./components/Header"
import Login from "./pages/Login"
import MenuBar from "./components/MenuBar"
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
	return (
		<div>
			<Header />
			{/* <Header isInput /> */}
			{/* <Map></Map> */}
			<Login />
			<MenuBar></MenuBar>
		</div>
	)
}

export default App
