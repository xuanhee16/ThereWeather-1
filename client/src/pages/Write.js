import styled from "styled-components"
import { useState } from "react"
// import { useHistory } from "react-router-dom";

/* TODO
  [] 업로드된 이미지의 크기 정리를 어떻게 할지
    - 가로, 세로 비율 유지 방법
  [] 날씨 버튼
    - 버튼 아이콘, 스타일
    - 필터링을 위한 post 요청
      - 버튼에 value 주고, 등록버튼 누를 때 post 요청에 실어 보낼 수 있을듯
      - 선택된 버튼의 스타일 바꾸기
  [] 인풋 텍스트 내부의 텍스트 정렬 방법
*/


const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: var(--mobile-page-height);
  padding: 3rem;
  background-color: var(--page-bg-color);

  @media screen and (min-width: 1081px) {
    min-height: calc(100vh - 125px);
  }
`;

const PictureSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  border: 1px solid red;

  & > img {
    width: 90%;
    height: 90%;
  }
`;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 2rem auto;

  border: 1px solid red;
`;

const ButtonsAndSelects = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;

  border: 1px solid red;
`;

const FilteringButtons = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border: 1px solid red;

  & > button {
    border: 1px solid red;
    padding:.5rem;
    margin: .3rem;
  }
`;

const SelectArea = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  & > select {
    padding: .3rem;
    margin: 1rem;
  }
`;

const WriteInput = styled.input`
  width: 80vw;
  height: 20vh;
  text-align: justify;
  line-height: 1.2rem;
  padding: .5rem;
  font-size: 1.2rem;
`;

const Button = styled.button`
  border: 1px solid black;
  background-color: var(--button-bg-normal);
  font-size: 1.5rem;
  padding: .5rem 3rem;
  margin: .5rem;
`;


export default function Write() {
  const [ photoSrc, setPhotoSrc ] = useState("https://dummyimage.com/1000x750/7e57c2/fff.png&text=dummy(1000x750)");

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
      <PictureSection className="pictureUploadSection">
        <img src={photoSrc} alt="dummy image" />
        <Button onClick={photoUploadButtonHandler}>사진 업로드</Button>
      </PictureSection>
      <TextSection className="textInputSection">
        <ButtonsAndSelects className="ButtonsAndSelects">
          <p>날씨를 선택하세요.</p>
          <FilteringButtons>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </FilteringButtons>
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
        </ButtonsAndSelects>
        <WriteInput type="text" placeholder="글을 입력하세요." />
      </TextSection>
      <Button onClick={submitButtonHandler}>등록</Button>
    </Outer>
  );
}

// dummy text
// 그들에게 무엇을 피고, 구하기 사는가 두기 운다. 보이는 구하지 있는 얼마나 미인을 철환하였는가? 목숨을 몸이 미묘한 열락의 대중을 청춘 너의 뿐이다. 때에, 사라지지 못할 피부가 인생을 때문이다. 가슴에 것이다.보라, 속에서 주며, 속에 피에 때문이다. 노래하며 소금이라 별과 품에 간에 보이는 대중을 앞이 그리하였는가? 때까지 열매를 위하여 구하기 귀는 것이다. 방지하는 시들어 내려온 못하다 물방아 길을 있을 때문이다. 피고 가진 찾아 꽃이 뭇 인생을 예수는 어디 뿐이다. 구하기 청춘의 불러 같이, 바이며, 이상의 장식하는 청춘 사라지지 칼이다. 역사를 얼마나 넣는 간에 현저하게 풍부하게 얼음에 가는 할지니, 것이다.