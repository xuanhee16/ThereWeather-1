import styled from "styled-components"

export default function MyPage() {
  const Outer = styled.div`
    /* margin: 0 auto; */
    /* border: 1px solid red; */
    background-color: #FEF9EF;
    width: 100vw;
    height: 100vh;

    display: flex;

    @media screen and (max-width: 1081px) {
      flex-direction: column;
    }
  `
  /* 프로필 정보 */
  const ProfileArea = styled.div`
    width: 30%;
    padding: 20vh 1vw 1vh 1vw;
    text-align: center;
    p {
      font-size: 2rem;
    }
    
    @media screen and (max-width: 1081px) {
      margin: 0 auto;
      width: 50%;
      padding: 3vh 0 0 0;
      p {
        font-size: 2.5rem;
        margin: 1vh;
      }
    }

  `
  /* 프로필 사진 */
  const ProfileImg = styled.img`
    border: 1px solid red;
    width: 120px;
    height: 120px;
    padding: 10px 10px;
    border-radius: 50%;
    background-color: #FFFFFF;
  `

  /* 비밀번호수정, 탈퇴 */
  const ButtonArea = styled.div`
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-decoration: none;
    font-size: 1.2rem;

    @media screen and (max-width: 1081px) {
      align-items: center;
      
      height: 3vh;
    }
  `


  // 내가 쓴 예보 (grid)
  const GridArea = styled.div`  
    /* background-color: greenyellow; */
    width: 100vw;
    padding: 2vh 2vw 2vh 7vw;

    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-template-rows: 200px 400px 400px;

    row-gap: 10px;    /* row의 간격을 10px로 */
    column-gap: 20px;   /* column의 간격을 20px로 */

    .item:nth-child(1) {
      background-color: #FEF9EF;
      border: none;
      grid-column: 1 / 4;
      grid-row: 1 / 2;
    }

    div{
      border: 1px solid black;
    }
    .more {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    p{
      font-size: 2rem;
      margin: 0
    }
    a{
      font-size: 1.2rem;
      text-decoration: none
    }

    @media screen and (max-width: 1081px) {
      margin: 0 auto;
      padding: 0;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 100px 400px 400px;
      p{
        font-size: 3rem;
      }
      a{
        font-size: 2rem;
      }

    }

  `

  return (
    <Outer>
      <ProfileArea>
        <ProfileImg src='img/default-user.png'/>
        <p>{'김코딩'}</p>
        <p>성별 : {'남성'}</p>
        <p>나의 위치 : {'서울시 종로구'}</p>
        <ButtonArea>
          <a>비밀번호 수정</a>
          <a>회원탈퇴</a>
        </ButtonArea>
      </ProfileArea>

      <GridArea>
        <div class="item more">
          <p>내가 쓴 예보</p>
          <a href="">더 보기</a>
        </div>
        <div class="item">B</div>
        <div class="item">A</div>
        <div class="item">B</div>
        <div class="item">C</div>
        <div class="item">D</div>
        <div class="item">E</div>
      </GridArea>
    </Outer>
  )


}