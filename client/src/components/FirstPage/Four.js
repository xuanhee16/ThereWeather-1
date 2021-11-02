import { HalfPage } from "./One";
import { TitleAndContents, ContentsUnderTitle } from "./Two";
import { TwoPictures } from "./Three";

export default function Four () {
  return (
    <TitleAndContents className={["landingPagePart", "four"]}>
      <h2>step 3</h2>
          <ContentsUnderTitle className="contents">
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
          </ContentsUnderTitle>
    </TitleAndContents>
  );
}
