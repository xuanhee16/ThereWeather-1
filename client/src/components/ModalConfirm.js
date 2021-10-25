import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-bg-color);
`;

const Popup = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50vw;
  min-width: 300px;
  max-width: 500px;
  height: 40vw;
  min-height: 200px;
  max-height: 300px;
  background-color: var(--modal-confirm-bg);
  font-size: 1.5rem;
  border-radius: 1.5rem;

  & > article {
    margin: 1.5rem;
  }

  & .closeButtonArea {
    align-self: flex-end;
    margin: 0 2rem;
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  width: 30%;
  min-width: 80px;
  max-width: 120px;
  margin: .8rem;
  padding: .3rem;
  font-size: 1.2rem;
  background-color: var(--modal-confirm-button-bg);
`;

export default function ModalConfirm({ children }) {
  return (
    <Outer className="modalBackground">
      <Popup className="modalConfirm">
        <article className="closeButtonArea">
          <button className="modalCloseButton">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </article>
        <article className="confirmText">
          {children}
        </article>
        <article className="modalConfirmButtons">
          <Button className="modalButtonYes">예</Button>
          <Button className="modalButtonNo">아니오</Button>
        </article>
      </Popup>
    </Outer>
  );
}
