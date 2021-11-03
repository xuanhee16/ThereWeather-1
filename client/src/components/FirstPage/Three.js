import styled from "styled-components";
import { HalfPage } from "./One";
import { TitleAndContents, ContentsUnderTitle } from "./Two";

export const TwoPictures = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 40vw;
  }

  @media screen and (min-width: 1081px) {
    & > img {
      width: 40%;
    }
  }
`;

export default function Three({ opacityOffsetTitle, opacityOffsetOne, opacityOffsetTwo }) {
  return (
    <TitleAndContents className={["landingPagePart", "three"]}>
      <h2 style={{ opacity: `${opacityOffsetTitle}`}}>
        step 2
      </h2>
      <ContentsUnderTitle className="contents">
        <HalfPage className="half-page" style={{ opacity: `${opacityOffsetOne}`}}>
          <p className="desc">
            자신이 있는 곳의 <br/>
            하늘 사진을 찍어서 <br/>
            예보글을 작성하세요.
          </p>
          <div className="picture-png left">
            <img src="img/firstpage/photos.png" alt="photos" />
          </div>
        </HalfPage>

        <HalfPage className="half-page" style={{ opacity: `${opacityOffsetTwo}`}}>
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
      </ContentsUnderTitle>
    </TitleAndContents>
  );
}