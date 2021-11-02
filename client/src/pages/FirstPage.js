import styled from "styled-components";
import One from "../components/FirstPage/One";
import Two from "../components/FirstPage/Two";

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
    </div>
  );
}

{/* 

      <OnePage className="page" id="2">
        <TitleAndContents>
          <h2>step 1</h2>
          <Contents className="contents">
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
          </Contents>
        </TitleAndContents>
      </OnePage>

      <OnePage className="page" id="3">
        <TitleAndContents>
          <h2>step 2</h2>
          <Contents className="contents">
            <HalfPage className="half-page">
              <p className="desc">
                자신이 있는 곳의 <br/>
                하늘 사진을 찍어서 <br/>
                예보글을 작성하세요.
              </p>
              <div className="picture-png left">
                <img src="img/firstpage/photos.png" alt="photos" />
              </div>
            </HalfPage>

            <HalfPage className="half-page">
              <p className="desc">
                하늘 사진을 공유하여 <br/>
                다른사람에게 <br/>
                도움을 줄 수도 있어요.
              </p>
              <TwoPictures className="picture-png right">
                <img src="img/firstpage/mobile.png" alt="touching mobile phone" id="step2-number2" />
                <img src="img/firstpage/after_the_rain.png" alt="holding umbrella" id="step2-number3" />
              </TwoPictures>
            </HalfPage>
          </Contents>
        </TitleAndContents>
      </OnePage>

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