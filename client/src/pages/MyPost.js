import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Outer = styled.div`
  background-color: #FEF9EF;
  width: 100vw;
  height: 100vh;
  padding-top: 10vh;

  @media screen and (max-width: 1081px) {
    padding-top: 5vh;
  }

  ul{
    display:flex;
  }
  li {
    list-style: none;
  }
  button{
    color: red;
    font-size: 2rem;
  }

  ////////
  /* li{
    padding: 50px;
    font-size: 3rem;
  } */

`
// 스크롤시 메세지
const Waiting = styled.div`
  text-align: center;
  width: 100%;
  height: 100px;
  font-size: 2rem;
  color: blue;
`

// 내가 쓴 글 (grid)
const GridArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
	grid-template-rows: 300px 300px;
  grid-gap: 1.5rem;
  height: 70vh;

  .item{
    /* border: 1px solid blue; */
    display: flex;
  }
  .item:nth-child(odd){
    margin-left: 5vw;
  }
  .item:nth-child(even){
    margin-right: 5vw;
  }
  .item:hover{

  }

  @media screen and (min-width: 2100px){
    .item:nth-child(odd){
      margin-left: 10vw;
    }
    .item:nth-child(even){
      margin-right: 10vw;
    }
  }
  @media screen and (max-width: 1081px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 3fr 3fr 3fr;
    .item:nth-child(1){
      border: 1px solid blue;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    .item:nth-child(odd),
    .item:nth-child(even){
      margin: 0 2vw;
    }
  }
`
// 게시물 사진
const PostImg = styled.img`
  width: 50%;
  height: 100%;
  background-color: antiquewhite;
`
// 게시물 내용
const PostInfo = styled.div`
  /* background-color: grey; */
  width: 50%;
  padding: 4vh 2vw 2vh 2vw;
  font-size: 2rem;
  align-items: center;

  @media screen and (max-width: 1081px) {
    padding: 2vh 2vw 2vh 2vw;
  }
`

export default function MyPost() {
/* 무한스크롤 XX
  const useInfinite = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
      if(!isFetching) return;
      callback(() => {
        console.log("callBack");
      });
    }, [isFetching])

    function handleScroll(){
      if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      setIsFetching(true);
    }
    return [isFetching, setIsFetching]
  }

  const [listItems, setListItems] = useState(
    Array.from(Array(50).keys(), (n) => n + 1)  // 처음 요소 50개
  )
  const [isFetching, setIsFetching] = useInfinite(fetchMoreList);

  function fetchMoreList(){
    setTimeout(() => {
      setListItems((prevState) => [
        ...prevState,
        ...Array.from(Array(15).keys(), (n) => n + prevState.length + 1)  // 15개씩 늘어남
      ]);
      setIsFetching(false)
    }, 1000)
  }
*/

  return (
    <Outer>
      <GridArea>
        <div className="item">
          <PostImg/>
          <PostInfo>
            <p>{`10/19`}</p>
            <p>날씨 : {'맑음'}</p>
            <p>바람 : {'조금'}</p>
            <p>온도 : {'따뜻함'}</p>
          </PostInfo>
        </div>
      </GridArea>


      {/* <ul className="list-group mb-2">
        <GridArea>
          {listItems.map((listItem) => (
            // <li className="list-group-item" key={listItem}>
              <div className="item">
                <PostImg></PostImg>
                <PostInfo>
                  <p>{`10/19`}</p>
                  <p>날씨 : {'맑음'}</p>
                  <p>바람 : {'조금'}</p>
                  <p>온도 : {'따뜻함'}</p>
                </PostInfo>
              </div>
            // </li>
          ))}
        </GridArea>
      </ul>
      {isFetching && 
        <Waiting>Loading...</Waiting>
      } */}

      {/* 페이지네이션이나 무한스크롤 */}
    </Outer>
  )
}