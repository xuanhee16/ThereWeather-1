import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.2fr 2.5fr 0.2fr 2.5fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
  "nav nav nav nav"
  "main main main main"
  "nav nav nav nav"
  "main main main main";
  text-align: center;
  grid-gap: 0.1rem;
  transition: all 0.01s ease-in-out;
  @media (max-width: 600px) {
  //미디어 쿼리는 특정 조건이 true인 경우에만 
  //CSS 속성 블록을 적용하도록 @media 규칙을 사용한다
  width:60;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.2fr 0.2fr 5fr 5fr 0.2fr 0.2fr 5fr 5fr;
  grid-template-areas:
    "nav"
    "main"
  }
`;

const NavBar1 = styled.nav`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: 
  "nav nav nav nav";
  background-color:#279c6f;
`;
const NavBar2 = styled(NavBar1)``;
const NavBar3 = styled(NavBar1)``;
const NavBar4 = styled(NavBar1)``; 


const Main1 = styled.main`
 grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "main main main main main main";
  background: #FEF9EF;
  color: black;
  /* grid-area: main; */
  padding-top: 1.2rem;
`;
const Main2 = styled(Main1)``;
const Main3 = styled(Main1)``;
const Main4 = styled(Main1)``;
const Main5 = styled(Main1)``;
const Main6 = styled(Main1)``;
const Main7 = styled(Main1)``;
const Main8 = styled(Main1)``;

const MidleNav5 = styled.nav`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: "nav nav nav nav";
  background: #279c6f;
  color: black;
  /* grid-area: nav; */
  /* grid-column: 1 / 3;
  grid-row: 3 / 4; */
`;
const MidleNav6 = styled(MidleNav5)``;
// const MidleNav6 = styled.nav`
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   grid-template-areas: "nav nav nav nav";
//   background: #FEF9EF;
//   color: black;
// `;
const MidleNav7 = styled(MidleNav5)``;
const MidleNav8 = styled(MidleNav5)``;

// //00구 주민예보 날씨 아이콘 
// const Post1 = styled.main`
//   /* grid-area: div; */
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
//   grid-template-areas: 
//   "div div div div div";
//   grid-column: 1 / 2;
//   grid-row: 2 / 3;
//   background-color:#faf1c5;
// `;
// //기상청일기예보
// const Post2 = styled.div`
//   grid-column: 2 / 3;
//   grid-row: 2 / 3;
//   background-color:#faf1c5;
// `;
// const Post3 = styled.div`
//   grid-column: 3 / 4;
//   grid-row: 2 / 3;
//   background-color:#fae687;
// `;





export default function Home() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))

    return (
        <div className="homecontainer">
        <Container>
            <NavBar1>00구 주민예보</NavBar1>
            <NavBar2>기상청 일기예보</NavBar2>
            <NavBar3>00구 주민예보글</NavBar3>
            <NavBar4></NavBar4>

            <Main1>00구 주민예보 날씨 아이콘</Main1>
            <Main2>기상청 일기예보</Main2>
            <Main3>main1</Main3>
            <Main4>main2</Main4> 
            <MidleNav5>5</MidleNav5>
            <MidleNav6>6</MidleNav6>
            <MidleNav7>7</MidleNav7>
            <MidleNav8>8</MidleNav8>
            <Main5>코디1</Main5> 
            <Main6>코디2</Main6> 
            <Main7>main3</Main7> 
            <Main8>main4</Main8> 
        </Container>
        </div>
    )
}