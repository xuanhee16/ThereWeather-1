import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

const Outer = styled.section`
  position: relative;
  width: 100vw;
  height: calc(100vh - 200px);
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputAndTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  h3 {
    font-size: 1.2rem;
    margin: 1rem;
    font-weight: bold;
  }
`;

const InputText = styled.input`
  min-width: 150px;
  width: 30vw;
  font-size: 1.2rem;
  padding: .5rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;

const Button = styled.button`
  width: 50vw;
  min-width: 100px;
  max-width: 300px;
  margin: 1rem;
  padding: .8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: ${ props => props.google ? '#EA4335' : '#419300' };

  >span {
    margin: .25rem;
  }
`;

export default function Login() {
  return (
    <Outer className="loginPageComponent">
      <div className="Login--center">
        <InputAndTitle>
          <h3>아이디</h3>
          <InputText type="text" placeholder="아이디를 입력하세요" />
        </InputAndTitle>
        <InputAndTitle>
          <h3>비밀번호</h3>
          <InputText type="text" placeholder="비밀번호를 입력하세요" />
        </InputAndTitle>
      </div>
      <Buttons className="login--buttons">
        <Button>로그인</Button>
        <Button google>
          <FontAwesomeIcon icon={faGoogle} />
          <span>구글 로그인</span>
        </Button>
      </Buttons>
    </Outer>
  );
}