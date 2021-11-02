import styled from "styled-components";
import One from "../components/FirstPage/One";
import Two from "../components/FirstPage/Two";
import Three from "../components/FirstPage/Three";

const FirstPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background: linear-gradient(#FFFDF9, #FEF9EF, #FFF5DC, #D7F9FF, #AAF2FF);
`;

const OnePage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  // border: 1px solid red;

  & h2 {
    font-size: 3rem;
    margin: 1.5rem;
  }

  @media screen and (min-width: 1081px) {
    // height: var(--desktop-page-height);

    & h2 {
      font-size: 5rem;
      margin: 3rem;
    }
  }
`;

const TitleAndContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(var(--mobile-page-height) - var(--mobile-menubar-height));
  border: 1px solid blue;

  @media screen and (min-width: 1081px) {
    height: var(--desktop-page-height);
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1081px) {
    flex-direction: row;
    width: 80vw;
    height: 60vh;
    // border: 1px solid green;
  }
`;

const HalfPage = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--mobile-page-height) - var(--mobile-menubar-height));

  & p {
    white-space: pre-wrap;
    text-align: center;
    border: 1px solid pink;
  }

  & img {
    width: 40vw;
    height: auto;
  }

  @media screen and (min-width: 1081px) {
    width: 50vw;
    height: auto;

    & img {
      width: 20vw;
      height: auto;
    }

    & p {
      margin: 2rem auto;
      font-size: 2.5rem;
      line-height: 150%;
    }
  }
`;

const TwoPictures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1081px) {
    flex-direction: row;
  }
`;


export default function FirstPage() {
  return (
    <div className="firstPage">
      <One />
      <Two />
      <Three />
    </div>
  );
}

{/* 


      

      <OnePage className="page" id="last-page">
        <TitleAndContents>
          <h2>step 3</h2>
          <Contents className="contents">
            <HalfPage className="half-page">
              <p className="desc">
                날씨에 따라 코디를 <br/>
                추천하거나 <br/>
                코디를 추천 받으세요.
              </p>
              <div className="picture-png left">
                <img src="img/firstpage/destination.png" alt="reading mobile phone map" />
              </div>
            </HalfPage>
            <HalfPage className="half-page">
              <TwoPictures className="picture-png right">
                <img src="img/firstpage/publish_post.png" alt="publishing post" id="step3-number2" />
                <img src="img/firstpage/among_nature.png" alt="watching tree" id="step3-number3" />
              </TwoPictures>
              <p className="desc">
                날씨에 따라 코디를 추천받거나, <br/>
                예보글을 작성하여 <br/>
                적절한 코디를 추천할 수 있어요.
              </p>
            </HalfPage>
          </Contents>
        </TitleAndContents>
      </OnePage>
    </FirstPageContainer> 
  */}