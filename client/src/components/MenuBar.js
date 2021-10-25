import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faHeart, faMapMarkerAlt, faPencilAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import PostListContainer from "./PostListView"
const Outer = styled.div`
    width: 100%;

    //아래가 pc
    @media screen and (min-width: 1081px) {
        // border: 1px solid red;

        width: 100%;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        position: absolute;
        bottom: 0;
    }
`
const Outer2 = styled.div`
    width: 100%;

    //아래가 pc
    @media screen and (min-width: 1081px) {
        border: 1px solid red;
        // background-color: white;

        width: 100%;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        position: absolute;
        bottom: 79px;
    }
`

const PostContainer = styled.div`
    background-color: white;
    // position: fixed;
    // right: 0;
    // bottom: 0;
    // width: 100vw;
    // float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media screen and (min-width: 1081px) {
        background-color: #white;
        // border: 3px solid silver;
        height: 30rem;
        width: 400px;
        z-index: 9999999;

        display: flex;
        flex-direction: column;
        overflow: auto;
    }
`

const Buttons = styled.div`
    background-color: white;
    // position: fixed;
    // right: 0;
    // bottom: 0;
    // width: 100vw;
    // float: right;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media screen and (min-width: 1081px) {
        background-color: #white;
        border: 3px solid silver;

        width: 400px;
        z-index: 9999999;
    }
`

const Button = styled.button`
    background-color: white;
    // border: 1px solid black;
    // border: none;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 2rem;
`

export default function MenuBar() {
    return (
        <>
            <Outer className="menuBar">
                <div></div>
                <Buttons>
                    <Button>
                        <FontAwesomeIcon icon={faHome} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faHeart} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faUserAlt} />
                    </Button>
                </Buttons>
            </Outer>
            <Outer2>
                <div></div>
                <PostContainer>
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                    <PostListContainer />
                </PostContainer>
            </Outer2>
        </>
    )
}
