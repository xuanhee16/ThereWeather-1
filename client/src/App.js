import "./App.css"
import Map from "./pages/Map"
import Header from "./components/Header"
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
    const isInput = true
    return (
        <div>
            <Header isInput={isInput}></Header>
            <Map></Map>
            <MenuBar></MenuBar>
        </div>
    )
}

export default App
