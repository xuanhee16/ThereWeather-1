import styled from "styled-components";

const FirstPageContainer = styled.div`
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

  & > h2 {
    margin: 1rem;
  }
`;

const HalfPage = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--mobile-page-height) - 70px);
  border-bottom: 1px solid red;

  & p {
    margin: 1rem;
    white-space: pre-wrap;
    text-align: center;
  }

  & img {
    width: 150px;
    height: auto;
  }
`;

export default function FirstPage() {
  return (
    <FirstPageContainer className="firstPageContainer">
      <OnePage className="page" id="1">
        <div className="contents">
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
              여러분도 하늘사진을 공유하고 <br/>
              동네 날씨예보관이 되어 보세요!
            </p>
            <div className="picture-png right">
              <img src="img/firstpage/town.png" alt="street" />
            </div>
          </HalfPage>
        </div>
      </OnePage>

      <OnePage className="page" id="2">
        <h2>step 1</h2>
        <div className="contents">
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
        </div>
      </OnePage>

      <OnePage className="page" id="3">
        <h2>step 2</h2>
        <div className="contents">
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
            <div className="picture-png right">
              <img src="img/firstpage/mobile.png" alt="touching mobile phone" id="step2-number2" />
              <img src="img/firstpage/after_the_rain.png" alt="holding umbrella" id="step2-number3" />
            </div>
          </HalfPage>
        </div>
      </OnePage>

      <OnePage className="page" id="last-page">
        <h2>step 3</h2>
        <div className="contents">
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
            <div className="picture-png right">
              <img src="img/firstpage/publish_post.png" alt="publishing post" id="step3-number2" />
              <img src="img/firstpage/among_nature.png" alt="watching tree" id="step3-number3" />
            </div>
            <p className="desc">
              날씨에 따라 코디를 추천받거나, <br/>
              예보글을 작성하여 <br/>
              적절한 코디를 추천할 수 있어요.
            </p>
          </HalfPage>
        </div>
      </OnePage>
    </FirstPageContainer>
  );
}