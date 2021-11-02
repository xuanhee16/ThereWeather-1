import styled from "styled-components";
import One from "../components/FirstPage/One";
import Two from "../components/FirstPage/Two";
import Three from "../components/FirstPage/Three";
import Four from "../components/FirstPage/Four";

const FirstPageContainer = styled.div`
  background: linear-gradient(#fff, #FEF9EF, #FFF5DC, #D7F9FF, #AAF2FF);
`;

export default function FirstPage() {
  return (
    <FirstPageContainer className="firstPage">
      <One />
      <Two />
      <Three />
      <Four />
    </FirstPageContainer>
  );
}