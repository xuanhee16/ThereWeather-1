import styled from "styled-components";

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1081px) {
    flex-direction: row;
    height: var(--desktop-page-height);
  }
`;

const HalfPage = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--mobile-page-height) - var(--mobile-menubar-height));

  & img {
    margin: 2rem;
    width: 70vw;
    height: auto;
  }

  & p {
    margin: 1rem;
  }

  @media screen and (min-width: 1081px) {
    height: var(--desktop-page-height);
    & img {
      margin: 2rem;
      width: 35vw;
      height: auto;
    }
  }
`;

export default function One() {
  return (
      <Contents className={["pageOne"]}>
        <HalfPage className="half-page">
          <p className="desc">
            일기 예보가 <br/>
            믿음직스럽지 못하시다구요?<br/>
          </p>
          <div className="picture-png left">
            <img src="img/firstpage/phone-and-human.png" alt="human with phone" />
          </div>
        </HalfPage>

        <HalfPage className="half-page">
          <p className="desc">
            동네 주민이 올린 하늘의 사진을 <br/>
            실시간으로 확인할 수 있어요.<br/>
          </p>
          <p className="desc">
            여러분도 하늘사진을 공유하고 <br/>
            동네 날씨예보관이 되어 보세요!
          </p>
          <div className="picture-png right">
            <img src="img/firstpage/town.png" alt="street" />
          </div>
        </HalfPage>
      </Contents>
  );
}