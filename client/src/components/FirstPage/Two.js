import styled from "styled-components";
import { Contents, HalfPage } from "./One";

export const TitleAndContents = styled(Contents)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;

  & > h2 {
    padding: 3rem;
    font-size: 3rem;
    text-align: center;
  }

  @media screen and (min-width: 1081px) {
    height: var(--desktop-page-height);
    & >h2 {
      height: 12rem;
      padding: 5rem;
    }
  }
`;

export const ContentsUnderTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1081px) {
    flex-direction: row;
    height: calc(var(--desktop-page-height) - 12rem);
  }
`;

export default function Two() {
  return (
    <TitleAndContents className={["landingPagePart", "two"]}>
      <h2>step 1</h2>
      <ContentsUnderTitle className="contents">
        <HalfPage className="half-page">
          <p className="desc">
            사는 곳이나 <br/>
            여행지를 검색하세요.
          </p>
          <div className="picture-png left">
            <img src="img/firstpage/web_search.png"  alt="web surfing" />
          </div>
        </HalfPage>

        <HalfPage className="half-page">
          <div className="picture-png right">
            <img src="img/firstpage/adventure_map.png" alt="walking" />
          </div>
          <p className="desc">
            여행을 준비중이시라면 <br/>
            여행지에 사는 사람이 올린 <br/>
            사실적인 예보글을 토대로 <br/>
            계획해보세요.
        </p>
        </HalfPage>
      </ContentsUnderTitle>
    </TitleAndContents>
  );
}