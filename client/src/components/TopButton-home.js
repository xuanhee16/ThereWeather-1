// 스크롤 탑 버튼
import React, { useEffect, useState } from "react"
import styled from "styled-components"

const Button = styled.div`
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    bottom: 0;
    transition: all 0.3s;
    display: none;
    right: 0;

    img {
        width: 3rem;
        height: 3rem;
        margin: 3rem;
        opacity: 0.7;
        background-color: var(--page-bg-color);
    }

    @media screen and (max-width: 1081px) {
        display: block;
        height: 200px;
    }
    @media screen and (max-width: 761px) {

    }
    @media screen and (max-width: 375px) {
    }
`

export default function TopButton() {
    // top button
    const [ScrollY, setScrollY] = useState(0)
    const [btnStatus, setBtnStatus] = useState(false) // 버튼 상태

    // console.log(window.pageYOffset)
    // console.log(btnStatus)

    const handleFollow = () => {
        setScrollY(window.scrollY)
        if (ScrollY > 200) {
            // 200 이상이면 버튼이 보임
            setBtnStatus(true)
        } else {
            // 200 이하일때 버튼이 사라짐
            setBtnStatus(false)
        }
    }

    // 클릭시 위로 올라감
    const scrollToTop = () => {
        // e.preventDefault() // 새로고침 방지
        window.scrollTo({ top: 0, behavior: "smooth" }) // 위로 올라감
        setScrollY(0) // 올라가면 다시 0으로 초기화
        setBtnStatus(false) // 버튼 다시 사라짐
    }

    useEffect(() => {
        window.addEventListener("scroll", handleFollow)
        return () => {
            window.removeEventListener("scroll", handleFollow)
        }
    })

    return (
        <Button>
            {btnStatus ? (
                <img
                    src={`${process.env.PUBLIC_URL}img/scroll-up.png`}
                    alt="top"
                    onClick={scrollToTop}
                />
            ) : null}
        </Button>
    )
}
