import styled from "styled-components"
import { useState, useEffect } from "react"
import { SunFill, CloudyFill, CloudRainFill, Snow, Thermometer, ThermometerHalf, ThermometerHigh } from "@styled-icons/bootstrap"

/*
import { Wind as Breeze } from "@styled-icons/feather"
import { Wind } from "@styled-icons/boxicons-regular"
import { Wind as StrongWind } from "@styled-icons/fa-solid"
*/

/* TODO
  [] 업로드된 이미지의 크기 정리를 어떻게 할지
    - 가로, 세로 비율 유지 방법
  [] 날씨 버튼
    - 버튼 아이콘, 스타일
      - [ ] background-color, padding, height, width
      - [ ] button type
    - 필터링을 위한 post 요청
      - [x] 버튼에 name 주기, name을 모으는 state 변수 (배열)
      - [] 등록버튼 누를 때 post 요청에 실어 보낼 수 있을듯
      - [] 선택된 버튼의 스타일 바꾸기
        - 현재 상황 : 선택된 요소에만 클래스 적용할 방법을 고민중
  [x] 인풋 텍스트 내부의 텍스트 정렬 방법 -> textarea 사용
*/

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    min-height: var(--mobile-page-height);
    padding: 3rem;
    background-color: var(--page-bg-color);

    @media screen and (min-width: 1081px) {
        flex-direction: row;
        min-height: calc(100vh - 125px);
        padding: 2rem;
    }
`

const Button = styled.button`
    border: 1px solid black;
    background-color: var(--button-bg-normal);
    font-size: 1.5rem;
    padding: 0.5rem 3rem;
    margin: 1rem;
`

const PictureSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    & > img {
        width: 90%;
        height: 90%;
    }

    @media screen and (min-width: 1081px) {
        justify-content: space-around;
        width: 40vw;
    }
`

const DesktopRight = styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 1081px) {
        justify-content: space-around;
        width: 40vw;
    }
`

const ButtonsAndSelects = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`

const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;

    & > p {
        margin: 0.5rem;
        font-weight: bold;
    }
`

const FilteringButtons = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    border: 1px solid grey;
    height: 2.5rem;
    width: 2.5rem;
    padding: .3rem;
    margin: .3rem;
    background-color: white;
    border-radius: .3rem;

    svg {
      color: grey;
    }
  }

  & > button.active {
    border: 1px solid black;

    svg {
      color: black;
    }
  }
`;

const FilteringBtn = styled.button`
  border: 3px solid grey;
  border: ${props => props.active ? '1px solid black' : '1px solid grey'};
  height: 2.5rem;
  width: 2.5rem;
  padding: .3rem;
  margin: .3rem;
  background-color: white;
  border-radius: .3rem;

  svg {
    color: ${props => props.active ? 'black' : 'grey'};
  }
`;

const TextSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 2rem auto;

    & > .submitButton {
        margin: 2rem auto;
    }
`

const SelectArea = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;

    & > select {
        padding: 0.3rem;
        margin: auto 0.5rem;
    }
`

const WriteInput = styled.textarea`
    width: 80vw;
    min-width: 400px;
    height: 20vh;
    text-align: justify;
    line-height: 1.2rem;
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem;

    @media screen and (min-width: 1081px) {
        width: 40vw;
        max-width: 800px;
    }
`

export default function Write() {
  // img src 상태
  const [ photoSrc, setPhotoSrc ] = useState("https://dummyimage.com/1000x750/7e57c2/fff.png&text=dummy(1000x750)");

  // 날씨 버튼
    // 날씨 필터링용 state
  const [ clickedWeatherButtons, setClickedWeatherButtons ] = useState([]);
    // 날씨 버튼 handler
  const weatherBtnHandler = (e) => {
    console.log('button?');
    if (e.target.nodeName === 'ARTICLE') return;
    let elem = e.target;

    while (!elem.classList.contains('weatherButton')) {
      elem = elem.parentNode;
      console.log('while - work?', elem.name);

      if (elem.nodeName === 'ARTICLE') {
        elem = null;
        return;
      }
    }

    if (elem && clickedWeatherButtons.includes(elem.name)) {
      setClickedWeatherButtons(arr => [...arr.filter(btnName => btnName !== elem.name)]);
      console.log('배열에서 빼기', clickedWeatherButtons);
    } else {
      setClickedWeatherButtons(arr => [...arr, elem.name]);
      console.log('배열에 넣기', clickedWeatherButtons);
    }
    // elem.classList
  }

  useEffect (() => {
    console.log('***clickedWeatherButtons: useEffect***', clickedWeatherButtons);
  },[clickedWeatherButtons]);

  // 상의 더미데이터
  const clothesTop = [
    ["default", "상의 선택"],
    ["tshirts", "티셔츠"],
    ["shirts", "셔츠"]
  ];

  // 하의 더미데이터
  const clothesBottom = [
    ["default", "하의 선택"],
    ["shorts", "반바지"],
    ["pants", "긴 바지"]
  ];

  // select 상태 관리 & 이벤트 핸들러
  const [ selectValueTop, setSelectValueTop ] = useState("default");
  const [ selectValueBottom, setSelectValueBottom ] = useState("default");

  const selectTopHandler = (e) => {
    setSelectValueTop(e.target.value);
  }

  const selectBottomHandler = (e) => {
    setSelectValueBottom(e.target.value);
  }

  // 사진 업로드 버튼 이벤트
  const photoUploadButtonHandler = (e) => {
    console.log('사진 업로드 버튼 동작 확인');
    // TODO
      // multer 연결
      // axios 요청
      // 이미지 src 바꾸기
        // setPhotoSrc(res로 받은 src);
  }

  // 등록버튼 이벤트
  const submitButtonHandler = (e) => {
    console.log('등록버튼 동작 확인');
    // TODO
      // axios.post
      // 페이지 이동 : '글 읽기' 페이지로?
  }

  return (
    <Outer className="writePage">
      <PictureSection className="pictureUploadSection writePageLeft">
        <img src={photoSrc} alt="dummy" />
        <Button className="uploadButton" onClick={photoUploadButtonHandler}>사진 업로드</Button>
      </PictureSection>

      <DesktopRight className="writePageRight">
        <ButtonsAndSelects className="buttonsAndSelects">
          <FlexColumnCenter className="smallSection">
            <p>날씨를 선택하세요.</p>
            <FilteringButtons className="filteringButtons" onClick={weatherBtnHandler}>
              <FilteringBtn name="sunny" className="weatherButton" type="button">
                <SunFill/>
              </FilteringBtn>
              <FilteringBtn name="cloudy" className="weatherButton" type="button">
                <CloudyFill/>
              </FilteringBtn>
              <FilteringBtn name="rainy" className="weatherButton" type="button">
                <CloudRainFill/>
              </FilteringBtn>
              <FilteringBtn name="snowy" className="weatherButton" type="button">
                <Snow/>
              </FilteringBtn>
              <FilteringBtn name="tempCold" className="weatherButton" type="button">
                <Thermometer/>
              </FilteringBtn>
              <FilteringBtn name="tempNice" className="weatherButton" type="button">
                <ThermometerHalf/>
              </FilteringBtn>
              <FilteringBtn name="tempHot" className="weatherButton" type="button">
                <ThermometerHigh/>
              </FilteringBtn>
            </FilteringButtons>
          </FlexColumnCenter>

          <FlexColumnCenter className="smallSection">
            <p>의상을 선택하세요.</p>
            <SelectArea>
              <select className="top" value={selectValueTop} onChange={selectTopHandler}>
                {
                  clothesTop.map((elem, idx) => {
                    return (<option value={elem[0]} key={idx}>{elem[1]}</option>);
                  })
                }
              </select>
              <select className="bottom" value={selectValueBottom} onChange={selectBottomHandler}>
                {
                  clothesBottom.map((elem, idx) => {
                    return (<option value={elem[0]} key={idx}>{elem[1]}</option>);
                  })
                }
              </select>
            </SelectArea>
          </FlexColumnCenter>
        </ButtonsAndSelects>

        <TextSection>
          <WriteInput type="text" placeholder="글을 입력하세요." />
          <Button className="submitButton" onClick={submitButtonHandler}>등록</Button>
        </TextSection>
      </DesktopRight>
    </Outer>
  );
}

// dummy text
// 그들에게 무엇을 피고, 구하기 사는가 두기 운다. 보이는 구하지 있는 얼마나 미인을 철환하였는가? 목숨을 몸이 미묘한 열락의 대중을 청춘 너의 뿐이다. 때에, 사라지지 못할 피부가 인생을 때문이다. 가슴에 것이다.보라, 속에서 주며, 속에 피에 때문이다. 노래하며 소금이라 별과 품에 간에 보이는 대중을 앞이 그리하였는가? 때까지 열매를 위하여 구하기 귀는 것이다. 방지하는 시들어 내려온 못하다 물방아 길을 있을 때문이다. 피고 가진 찾아 꽃이 뭇 인생을 예수는 어디 뿐이다. 구하기 청춘의 불러 같이, 바이며, 이상의 장식하는 청춘 사라지지 칼이다. 역사를 얼마나 넣는 간에 현저하게 풍부하게 얼음에 가는 할지니, 것이다.
