// 모바일 뒤로가기 버튼
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"

const Button = styled.button`
    display: none;
    
    @media screen and (max-width: 1081px) {
        display: inline;
        /* top: 90vh; */
        top: 1.5vh;
        position: fixed;
        border-radius: 50%;
        z-index:100;
        .fa-fw {
            font-size: 50px;
        }
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
