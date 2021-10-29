// 모바일 뒤로가기 버튼
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

const Button = styled.button`
    display: none;

    @media screen and (max-width: 1081px) {
        display: inline;
        /* top: 90vh; */
        top: 1.5vh;
        position: fixed;
        border-radius: 50%;

        .fa-fw {
            font-size: 80px;
        }
    }
`

export default function GoBackButton() {
    return (
        <Button>
            <FontAwesomeIcon
                icon={faAngleDoubleLeft}
                className="fa-fw"
                color="#ACB5BD"
            />
        </Button>
    )
}
