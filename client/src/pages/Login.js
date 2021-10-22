import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faHeart, faMapMarkerAlt, faPencilAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons"

const Outer = styled.section`
  position: relative;
  width: 100vw;
  height: calc(100vh - 125px);
  background-color: var(--page-bg-color);

  // border: 1px solid red;
`;

export default function Login() {
  return (
    <Outer className="loginPageComponent">
      login test
    </Outer>
  );
}