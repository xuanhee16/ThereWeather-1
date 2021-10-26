import styled from "styled-components"
import { useState } from "react"
import { useHistory } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faGoogle } from "@fortawesome/free-brands-svg-icons"

/*
  TODO - 비밀번호 수정 페이지
  [x] 여러개의 Input 상태 관리
  [] 유효성 검사
    - [x] ul, li 추가
    - [x] 함수로 구현
      - [x] (둘 다) input이 없는 경우 - li
      - [x] (새 비밀번호) 조건에 안 맞는 경우 - li
      - [] (현재 비밀번호) 등록되지 않은 정보인 경우
        - [] 악시오스
        - [] 모달? alert? 페이지에 렌더링?
  [] 최종 결과 모아서 악시오스 요청
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
  align-self: flex-end;
  margin: 1rem 3rem;
  font-size: 1rem;
  color: grey;
  text-decoration: underline;
`;


export default function PasswordEdit() {
  let history = useHistory();

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
    // 정규식 : 문자/숫자/특수문자 모두 포함, 8자 이상

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

    // 유효성 검사
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

  // 버튼 클릭 이벤트
  const editButtonHandler = (e) => {
    let newPwdValid = validationReg.test(newPwd)
    console.log('새 비밀번호 유효성 검사 결과', newPwdValid);
    // TODO
      // true인 경우 axios 통신 후 성공 메시지? 페이지? 모달? 새로고침?
      // 현재 비밀번호의 처리
  }

  const cancelButtonHandler = (e) => {
    console.log('취소 버튼 동작 확인')
    setCurPwd(prev => '');
    setNewPwd(prev => '');
    setIsValid(prev => '');
    // TODO 이전 페이지로
    history.push('/home');
  }

  // 탈퇴 모달에 붙은 함수
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const withdrawButtonHandler = (e) => {
    console.log('탈퇴 버튼 동작확인');
    setIsModalOpen(true);
  }

  const modalSelectList = [
    [null, "--탈퇴 이유 선택--"],
    ["notMuchUse", "사용을 많이 하지 않음"],
    ["inconvenientDesign", "디자인이 불편함"],
    ["chooseOtherApps", "다른 앱을 이용하기 위해"],
    ["etc", "기타"]
  ];
  const [ modalSelected, setModalSelected ] = useState("");
  const handleChangeSelect = (e) => {
    setModalSelected(prev => e.target.value);
  }

  const modalCloseButtonHandler = (e) => {
    console.log('모달 닫기 버튼 동작 확인');
    setIsModalOpen(false);
  }

  const modalYesButtonHandler = (e) => {
    console.log('모달 yes 버튼 동작 확인');
  }

  const modalNoButtonHandler = (e) => {
    console.log('모달 no 버튼 동작 확인');
    setIsModalOpen(false);
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
              placeholder="현재 비밀번호를 입력하세요"
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
          <Button onClick={editButtonHandler} edit>수정</Button>
          <Button onClick={cancelButtonHandler}>취소</Button>
        </div>
      </Buttons>

      <TextButton className="removeUserInfo" onClick={withdrawButtonHandler}>회원탈퇴</TextButton>

      {
        isModalOpen?
          <ModalConfirm
            yesHandler={modalYesButtonHandler}
            noHandler={modalNoButtonHandler}
            closeHandler={modalCloseButtonHandler}
          >
            <p>탈퇴하시겠습니까?</p>
            <select name="reasons" className="reason-select" onChange={handleChangeSelect} value={modalSelected}>
              {
                modalSelectList.map((elem, idx) => {
                  return (<option value={elem[0]} key={idx}>{elem[1]}</option>);
                })
              }
            </select>
          </ModalConfirm>
        :
          ''
      }
    </Outer>
  );
}