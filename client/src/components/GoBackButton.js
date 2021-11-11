// 모바일 뒤로가기 버튼
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"

const Button = styled.button`
    /* top: 90vh; */
    // top: 1.5vh;
    // position: fixed;
    // z-index:100;
    // border-radius: 50%;
    display: flex;
    padding: 1rem;
    // width: 100vw;
    // border: 1px solid hotpink;

    .fa-fw {
        font-size: 50px;
    }

    @media screen and (max-width: 1081px) {
    }
    @media screen and (max-width: 375px) {
        .fa-fw {
            font-size: 35px;
        }
    }
`

export default function GoBackButton() {
    const history = useHistory()
    const goBackHandler = () => {
        history.goBack();
    }
    return (
        <Button>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className="fa-fw"
                color="#ACB5BD"
                onClick={goBackHandler}
            />
        </Button>
    )
}
