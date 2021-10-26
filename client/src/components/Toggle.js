import { useState } from "react"
import styled from "styled-components"

const ToggleContainer = styled.div`
    // border: 1px solid red;
    position: relative;
    margin-top: 8rem;
    left: 47%;
    cursor: pointer;
    display: flex;

    > .toggle-container {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: skyblue;
        /* background-color: red; */
        margin-right: -10rem;
    }
    > .toggle-container.toggle--checked {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: pink;
    }

    > .toggle-circle {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        /* background-color: #ffffff; */
        background-color: blue;
        transition-duration: 0.5s;
    }

    > .toggle-circle.toggle--checked {
        position: absolute;
        top: 1px;
        left: 27px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        /* background-color: #ffffff; */
        background-color: red;
    }
`

const Desc = styled.div`
    text-align: center;
`

export const Toggle = () => {
    const [isOn, setisOn] = useState(false)

    const toggleHandler = () => {
        isOn === true ? setisOn(false) : setisOn(true)
        console.log(isOn)
    }

    return (
        <>
            <ToggleContainer onClick={toggleHandler}>
                <div className={isOn ? "toggle-container toggle--checked" : "toggle-container"} />
                <div className={isOn ? "toggle-circle toggle--checked" : "toggle-circle"} />
                <Desc>{isOn ? "여성" : "남성"}</Desc>
            </ToggleContainer>
        </>
    )
}
