// import React, { useState } from "react"
import styled from "styled-components"

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: var(--mobile-page-height);
  padding: 3rem;
  background-color: var(--page-bg-color);

  @media screen and (min-width: 1081px) {
    height: calc(100vh - 125px);
  }
`;

const PictureSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid red;

  & > img {
    width: 80vw;
    height: 60vw;
  }
`;

const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid red;
`;

const FilteringButtons = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    border: 1px solid red;
    padding:.5rem;
  }
`;

const SelectArea = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteInput = styled.input`
  width: 80vw;
  height: 20vh;
  text-align: justify;
  line-height: 1.2rem;
  padding: .5rem;
`;

const Button = styled.button`
  border: 1px solid black;
  background-color: var(--button-bg-normal);
  padding: .5rem 3rem;
  margin: .5rem;
`;

export default function Write() {

  return (
    <Outer className="writePage">
      <PictureSection className="pictureUploadSection">
        <img src="https://dummyimage.com/1000x750/7e57c2/fff.png&text=dummy(1000x750)" alt="dummy image" />
        <Button>사진 업로드</Button>
      </PictureSection>
      <TextSection className="textInputSection">
        <FilteringButtons>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </FilteringButtons>
        <SelectArea>
          <select></select>
          <select></select>
        </SelectArea>
        <WriteInput type="text" placeholder="글을 입력하세요" />
        <Button>등록</Button>
      </TextSection>
    </Outer>
  );
}


// dummy text
// 그들에게 무엇을 피고, 구하기 사는가 두기 운다. 보이는 구하지 있는 얼마나 미인을 철환하였는가? 목숨을 몸이 미묘한 열락의 대중을 청춘 너의 뿐이다. 때에, 사라지지 못할 피부가 인생을 때문이다. 가슴에 것이다.보라, 속에서 주며, 속에 피에 때문이다. 노래하며 소금이라 별과 품에 간에 보이는 대중을 앞이 그리하였는가? 때까지 열매를 위하여 구하기 귀는 것이다. 방지하는 시들어 내려온 못하다 물방아 길을 있을 때문이다. 피고 가진 찾아 꽃이 뭇 인생을 예수는 어디 뿐이다. 구하기 청춘의 불러 같이, 바이며, 이상의 장식하는 청춘 사라지지 칼이다. 역사를 얼마나 넣는 간에 현저하게 풍부하게 얼음에 가는 할지니, 것이다.