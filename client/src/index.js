import React from "react"
import ReactDOM from "react-dom"
import App from "./App-sanga" // 이상아
import store from "./store/store"
import { Provider } from "react-redux"
import "./index.css" // 이상아

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
