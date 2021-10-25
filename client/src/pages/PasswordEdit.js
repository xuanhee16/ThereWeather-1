import { useState } from "react"
import styled from "styled-components"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faGoogle } from "@fortawesome/free-brands-svg-icons"

/*
  TODO - 비밀번호 수정 페이지
  [x] 여러개의 Input 상태 관리
  [] 유효성 검사
    - [x] ul, li 추가
    - [] 함수로 구현
      - [x] (둘 다) input이 없는 경우 - li
      - [] (새 비밀번호) 조건에 안 맞는 경우 - li
      - [] (현재 비밀번호) 등록되지 않은 정보인 경우
        - [] 악시오스
        - [] 모달? alert? 페이지에 렌더링?
*/

const Outer = styled.section`
  position: relative;
  width: 100vw;
  height: var(--mobile-page-height);
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 1081px) {
    height: calc(100vh - 125px);
	}
`;

const StyledArticle = styled.article`
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
    font-size: 1.4rem;
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

const ValidationListBox = styled.ul`
  list-style: none;
  padding: 0 1.5rem;
  font-size: 1rem;

  // li {
  //   height: 1.2rem;
  //   padding: 0 1.5rem;
  //   color: ${ props => props.valid ? `var(--font-validation-positive)` : `var(--font-validation-negative)` };
  // }
`;

const StyledLi = styled.li`
  height: 1.2rem;
  padding: 0 1.5rem;
  color: ${ props => props.valid ? `var(--font-validation-positive)` : `var(--font-validation-negative)` };
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;

const Button = styled.button`
  width: 25vw;
  min-width: 50px;
  max-width: 200px;
  margin: 1rem;
  padding: .8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: ${ props => props.edit ? `var(--button-bg-edit)` : `var(--button-bg-negative)` };
  border-radius: 1rem;
`;

const TextButton = styled.button`
  background-color: transparent;
  color: grey;
  text-decoration: underline;
  align-self: flex-end;
  margin-right: 3rem;
  font-size: 1rem;
`;

export default function PasswordEdit() {
  const [ curPwd, setCurPwd ] = useState('');
  const [ newPwd, setNewPwd ] = useState('');
  const [ curPwdInputWarning, setCurPwdInputWarning ] = useState('비밀번호를 입력해주세요.');
  const [ newPwdInputWarning, setNewPwdInputWarning ] = useState({
    isNoInput: '비밀번호를 입력해주세요.',
    isTooShort: '8자 이상이어야 합니다.',
    isWrongType: '숫자와 문자를 포함해야 합니다.'
  });
  const { isNoInput, isTooShort, isWrongType } = newPwdInputWarning;
  const [ isValid, setIsValid ] = useState('');

  const validationReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

  const curInputHandler = (e) => {
    setCurPwd(prev => e.target.value);
    if (e.target.value.length === 0) {
      setCurPwdInputWarning(prev => '비밀번호를 입력해주세요.');
    } else {
      setCurPwdInputWarning(prev => '');
    }
  }

  const newInputHandler = (e) => {
    setNewPwd(prev => e.target.value);

    if (e.target.value.length === 0) {
      setNewPwdInputWarning(prev => {
        return {...prev, isNoInput: '비밀번호를 입력해주세요.'}
      });
    } else {
      setNewPwdInputWarning(prev => {
        return {...prev, isNoInput: ''}
      });
    }

    if (!validationReg.test(e.target.value)) {
      setNewPwdInputWarning(prev => {
        return {...prev, isWrongType: '문자, 숫자, 특수문자가 모두 포함되어야 합니다.'}
      });
      setIsValid(prev => '')
    } else {
      setNewPwdInputWarning(prev => {
        return {...prev, isWrongType: ''}
      });
      setIsValid(prev => '사용 가능합니다.')
    }

    if (e.target.value.length < 8) {
      setNewPwdInputWarning(prev => {
        return {...prev, isTooShort: '8자 이상이어야 합니다.'}
      });
    } else {
      setNewPwdInputWarning(prev => {
        return {...prev, isTooShort: ''}
      });
    }
  }

  return (
    <Outer className="loginPageComponent">
      <h2>비밀번호 변경</h2>
      <div className="Login--center">
        <StyledArticle className="id">
          <InputAndTitle className="inputIdSection">
            <h3>현재 비밀번호</h3>
            <InputText
              type="password"
              name="curPwd"
              placeholder="아이디를 입력하세요"
              onChange={curInputHandler}
              value={curPwd}
            />
          </InputAndTitle>
          <ValidationListBox className="idValidationList">
            <StyledLi>{curPwdInputWarning}</StyledLi>
          </ValidationListBox>
        </StyledArticle>

        <StyledArticle className="password">
          <InputAndTitle className="inputPwSection">
            <h3>새 비밀번호</h3>
            <InputText
              type="password"
              name="newPwd"
              placeholder="비밀번호를 입력하세요"
              onChange={newInputHandler}
              value={newPwd}
            />
          </InputAndTitle>
          <ValidationListBox className="pwValidationList">
            <StyledLi valid>{isValid}</StyledLi>
            <StyledLi>{isNoInput}</StyledLi>
            <StyledLi>{isTooShort}</StyledLi>
            <StyledLi>{isWrongType}</StyledLi>
          </ValidationListBox>
        </StyledArticle>
      </div>
      <Buttons className="login--buttons">
        <div>
          <Button edit>수정</Button>
          <Button>취소</Button>
        </div>
      </Buttons>
      <TextButton className="removeUserInfo">회원탈퇴</TextButton>
    </Outer>
  );
}