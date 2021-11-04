import { HalfPage, AnimatedP, AnimatedImg } from "./One";
import { TitleAndContents, ContentsUnderTitle, AnimatedTitle } from "./Two";
import { TwoPictures } from "./Three";

export default function Four ({
  delayOne, delayTwo, delayThree, delayFour, delayFive
}) {
  return (
    <TitleAndContents className={["landingPagePart", "four"]}>
      <AnimatedTitle delay={delayOne}>step 3</AnimatedTitle>
          <ContentsUnderTitle className="contents">
            <HalfPage className="half-page">
              <AnimatedP className="desc" delay={delayTwo}>
                날씨에 따라 코디를 <br/>
                추천하거나 <br/>
                코디를 추천 받으세요.
              </AnimatedP>
              <div className="picture-png left">
                <AnimatedImg
                  src="img/firstpage/destination.png"
                  alt="reading mobile phone map"
                  delay={delayThree}
                />
              </div>
            </HalfPage>
            <HalfPage className="half-page">
              <TwoPictures className="picture-png right">
                <AnimatedImg
                  src="img/firstpage/publish_post.png"
                  alt="publishing post"
                  delay={delayFour}
                />
                <AnimatedImg
                  src="img/firstpage/among_nature.png"
                  alt="watching tree"
                  delay={delayFour}
                />
              </TwoPictures>
              <AnimatedP className="desc" delay={delayFive}>
                날씨에 따라 코디를 추천받거나, <br/>
                예보글을 작성하여 <br/>
                적절한 코디를 추천할 수 있어요.
              </AnimatedP>
            </HalfPage>
          </ContentsUnderTitle>
    </TitleAndContents>
  );
}
