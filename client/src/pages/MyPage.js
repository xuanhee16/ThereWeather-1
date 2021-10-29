import styled from "styled-components"

export default function MyPage() {
    const Outer = styled.div`
        background-color: #fef9ef;
        width: 100vw;
        height: auto;
        min-height: 100vh;
        position: relative;
        display: flex;

        @media screen and (max-width: 1081px) {
            flex-direction: column;
        }
    `
    /* 프로필 정보 */
    const ProfileArea = styled.div`
        width: 30%;
        padding: 20vh 1vw 1vh 1vw;
        text-align: center;

        span {
            display: flex;
            margin: 2vh;
            justify-content: center;
            font-size: 1.5rem;
        }

        a {
            color: #336fc9;
            font-size: 1.5rem;
            margin-top: 1vh;
        }

        @media screen and (max-width: 1081px) {
            margin: 0 auto;
            margin-top: 3vh;
            width: 50%;
            padding: 0;

            span {
                display: flex;
                margin-top: 2vh;
                justify-content: center;
            }
        }
    `
    /* 프로필 사진 */
    const ProfileImg = styled.img`
        width: 200px;
        height: 200px;
        padding: 10px 10px;
        border-radius: 50%;
        background-color: #ffffff;
    `

    /* 비밀번호수정, 탈퇴 */
    const ButtonArea = styled.div`
        height: 10vh;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-decoration: none;
        font-size: 1.2rem;

        @media screen and (max-width: 1081px) {
            width: 50vw;
            align-items: center;
            height: 10vh;
            position: absolute;
            bottom: 0;
        }
    `

    // 내가 쓴 예보 (grid)
    const GridArea = styled.div`
        width: 100vw;
        padding: 2vh 2vw 2vh 7vw;
        display: grid;
        grid-template-columns: 400px 400px 400px;
        grid-template-rows: 200px 400px 400px;

        row-gap: 10px; /* row의 간격을 10px로 */
        column-gap: 20px; /* column의 간격을 20px로 */

        .item:nth-child(1) {
            background-color: #fef9ef;
            border: none;
            grid-column: 1 / 4;
            grid-row: 1 / 2;
        }

        div {
            border: 1px solid black;
        }
        div:hover {
            border: 1px solid #a2d2ff;
        }

        .more {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        p {
            font-size: 3rem;
            margin: 0 auto;
            font-weight: bold;
        }
        .moreView {
            font-size: 1.5rem;
            color: #336fc9;
        }

        @media screen and (max-width: 1081px) {
            margin: 0 auto;
            margin-bottom: 7vh;
            padding: 0;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 150px 300px 300px;
            p {
                font-size: 3rem;
            }
            .item {
                margin: 0.5vh;
            }
            .moreView {
                margin-left: 1vw;
            }
        }
    `
    return (
        <Outer>
            <ProfileArea>
                <ProfileImg src="img/default-user.png" />
                <span>{"김코딩"}</span>
                <span>성별 : {"남성"}</span>
                <span>나의 위치 : {"서울시 종로구"}</span>
                <a href="#!">정보수정</a>
                <ButtonArea>
                    <a href="#!">비밀번호 수정</a>
                    <a href="#!">회원탈퇴</a>
                </ButtonArea>
            </ProfileArea>

            <GridArea>
                <div className="item more">
                    <p>내가 쓴 예보</p>
                </div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <a className="moreView" href="#!">
                    더 보기
                </a>
            </GridArea>
        </Outer>
    )
}
