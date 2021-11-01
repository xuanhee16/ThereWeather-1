import styled from "styled-components";

export default function FirstPage() {
  return (
    <div>
      <section className="page" id="1">
        <div className="contents">
          <article className="half-page">
            <p className="desc">
              일기 예보가
              믿음직스럽지 못하시다구요?
            </p>
            <div className="picture-png left">
              <img src="img/firstpage/phone-and-human.png" alt="human with phone" />
            </div>
          </article>

          <article className="half-page">
            <p className="desc">
              동네 주민이 올린 하늘의 사진을
              실시간으로 확인할 수 있어요.
              여러분도 하늘사진을 공유하고
              동네 날씨예보관이 되어 보세요!
            </p>
            <div className="picture-png right">
              <img src="img/firstpage/town.png" alt="street" />
            </div>
          </article>
        </div>
      </section>

      <section className="page" id="2">
        <h2>step 1</h2>
        <div className="contents">
          <article className="half-page">
            <p className="desc">
              사는 곳이나
              여행지를 검색하세요.
            </p>
            <div className="picture-png left">
              <img src="img/firstpage/web_search.png"  alt="web surfing" />
            </div>
          </article>

          <article className="half-page">
            <div className="picture-png right">
              <img src="img/firstpage/adventure_map.png" alt="walking" />
            </div>
            <p className="desc">
              여행을 준비중이시라면
              여행지에 사는 사람이 올린
              사실적인 예보글을 토대로
              계획해보세요.
            </p>
          </article>
        </div>
      </section>

      <section className="page" id="3">
        <h2>step 2</h2>
        <div className="contents">
          <article className="half-page">
            <p className="desc">
              자신이 있는 곳의
              하늘 사진을 찍어서
              예보글을 작성하세요.
            </p>
            <div className="picture-png left">
              <img src="img/firstpage/photos.png" alt="photos" />
            </div>
          </article>

          <article className="half-page">
            <p className="desc">
              하늘 사진을 공유하여
              다른사람에게
              도움을 줄 수도 있어요.
            </p>
            <div className="picture-png right">
              <img src="img/firstpage/mobile.png" alt="touching mobile phone" id="step2-number2" />
              <img src="img/firstpage/after_the_rain.png" alt="holding umbrella" id="step2-number3" />
            </div>
          </article>
        </div>
      </section>

      <section className="page" id="last-page">
        <h2>step 3</h2>
        <div className="contents">
          <article className="half-page">
            <p className="desc">
              날씨에 따라 코디를
              추천하거나
              코디를 추천 받으세요.
            </p>
            <div className="picture-png left">
              <img src="img/firstpage/destination.png" alt="reading mobile phone map" />
            </div>
          </article>
          <article className="half-page">
            <div className="picture-png right">
              <img src="img/firstpage/publish_post.png" alt="publishing post" id="step3-number2" />
              <img src="img/firstpage/among_nature.png" alt="watching tree" id="step3-number3" />
            </div>
            <p className="desc">
              날씨에 따라 코디를 추천받거나,
              예보글을 작성하여
              적절한 코디를 추천할 수 있어요.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}