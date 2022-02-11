import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //리액트에서 사용가능하게 해줌
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"; //내가 사용할 아이콘을 불러오기

const True = styled.div`
  border-radius: 20px;
  display: block;
  background-color: pink;
  width: 500px;
  height: 100px;
  z-index: 999999;
  position: fixed;
  transform: translate(-50%, -50%);

  left: 50%;
  top: 50%;
`;
const False = styled.div`
  display: none;
`;
const BackgroundView = styled.div`
  // background-color: black;
  width: 100vw;
  height: 100vh;
  z-index: 199;
  position: fixed;
  transform: translate(-50%, -50%);
  // opacity: 0.8;
  left: 50%;
  top: 50%;
`;
const FlexArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const FlexArea2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const FlexArea3 = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DivTag1 = styled.div`
  font-size: 20px;
`;

const BtnTag1 = styled.button`
  font-size: 20px;

  &:hover {
    background-color: blue;
    color: red;
  }
`;

export default function OneChoiceModal({
  boolean,
  message,
  yesMessage,
  alertFunc,
}) {
  return (
    <>
      {boolean ? (
        <BackgroundView>
          <True>
            <FlexArea3>
              <FlexArea>
                <FlexArea2>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-3"
                    size="2x"
                  />
                  <DivTag1>{message}</DivTag1>
                </FlexArea2>
                <BtnTag1 onClick={alertFunc}>{yesMessage}</BtnTag1>
              </FlexArea>
            </FlexArea3>
          </True>
        </BackgroundView>
      ) : (
        <False>안보임</False>
      )}
    </>
  );
}
