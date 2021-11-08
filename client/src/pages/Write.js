import styled from "styled-components"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useHistory } from "react-router-dom";

const Outer = styled.div`
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    min-height: var(--mobile-page-height);
    padding: 3rem auto;
    background-color: var(--page-bg-color);

    @media screen and (min-width: 1081px) {
        flex-direction: row;
        min-height: var(--desktop-page-height);
        padding: 2rem;
    }
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: ${(props) => (props.round ? "50%" : null)};
    background-color: var(--button-bg-normal);
    font-size: 1.25rem;
    padding: ${(props) => (props.round ? ".5rem .5rem" : ".5rem 2rem")};
    margin: ${(props) => (props.round ? ".5rem" : "1rem")};

    & > img {
        height: 1.5rem;
        width: 1.5rem;
    }
`
const Button2 = styled.input`
    width: 50vw;
    min-width: 100px;
    max-width: 300px;
    margin: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #2f6ecb;

    > span {
        margin: 0.25rem;
    }
`

const PictureSection = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    height: inherit;

    @media screen and (min-width: 1081px) {
        justify-content: center;
        width: 40vw;
    }
`

const DesktopRight = styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 1081px) {
        justify-content: space-around;
        width: 40vw;
    }
`

const ButtonsAndSelects = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`

const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;

    & > p {
        margin: 0.5rem;
        font-weight: bold;
    }
`

const FilteringButtons = styled.article`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const FilteringBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid grey;
    border: ${(props) => (props.active ? "3px solid black" : "3px solid grey")};
    height: 2rem;
    width: 2rem;
    margin: 0.25rem;
    background-color: white;
    border-radius: 0.3rem;

    img {
        width: 1.5rem;
        height: 1.5rem;
    }
`

const TextSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 2rem auto;
    height: inherit;

    & > .submitButton {
        margin: 2rem auto;
    }
`

const SelectArea = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;

    & > select {
        padding: 0.3rem;
        margin: auto 0.5rem;
    }
`

const WriteText = styled.textarea`
    width: 70vw;
    min-width: 250px;
    height: ${(props) => (props.small ? "3rem" : "20vh")};
    text-align: justify;
    vertical-align: center;
    line-height: 1.2rem;
    font-size: 1.2rem;
    margin: 2rem 1rem 4rem;
    padding: 1rem;

    @media screen and (min-width: 1081px) {
        width: ${(props) => (props.small ? "35vw" : "40vw")};
        max-width: ${(props) => (props.small ? "500px" : "800px")};
    }
`
const PhotoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    min-width: 300px;
    min-height: 300px;
    background-color: #ececec;
    border: 1px solid #b5b5b5;
    object-fit: cover;
`

const PhotoBox2 = styled.img`
    min-width: 300px;
    width: 30vh;
    height: auto;
`

const Button3 = styled.button`
    width: 50vw;
    min-width: 100px;
    max-width: 300px;
    margin: .5rem;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #2f6ecb;
    border-radius: 1rem;

    > span {
        margin: 0.25rem;
    }
`
let url = process.env.REACT_APP_LOCAL_URL

export default function Write() {
    const history = useHistory();
    const { userInfo, curLocation } = useSelector((state) => state.itemReducer)
    const [selectWeather, setSelectWeather] = useState()
    const [selectWind, setSelectWind] = useState()
    const [selectTemp, setSelectTemp] = useState()
    const [photo, setPhoto] = useState("")
    const [uploadedImg, setUploadedImg] = useState({
        fileName: "blankPost.png",
        filePath: `${url}/img/blankPost.png`,
    })
    if (!url) {
        url = "https://thereweather.space"
    }
    // 제목 handler
    const [title, setTitle] = useState("")

    const titleInputHandler = (e) => {
        setTitle((prev) => e.target.value)
    }
    useEffect(() => {
        console.log(userInfo.user_id)
    }, [])

    // 날씨 버튼
    const weathers = [
        "sunny",
        "cloudy",
        "rainy",
        "snowy",
        "breezy",
        "windy",
        "strong",
        "cold",
        "hot",
    ]
    // 날씨 필터링용 state
    const [clickedWeatherButtons, setClickedWeatherButtons] = useState([])
    // 스타일 적용 state
    const [isFilteringBtnActive, setIsFilteringBtnActive] = useState({
        sunny: false,
        cloudy: false,
        rainy: false,
        snowy: false,
        breezy: false,
        windy: false,
        strong: false,
        cold: false,
        hot: false,
    })

    // 날씨 버튼 handler
    const weatherBtnHandler = (e) => {
        if (e.target.nodeName === "ARTICLE") return
        let elem = e.target

        while (!elem.classList.contains("weatherButton")) {
            elem = elem.parentNode
            console.log("while - work?", elem.name)
            setSelectWeather(elem.name)

            if (elem.nodeName === "ARTICLE") {
                elem = null
                return
            }
        }

        if (elem && clickedWeatherButtons.includes(elem.name)) {
            setClickedWeatherButtons((arr) => [
                ...arr.filter((btnName) => btnName !== elem.name),
            ])
            setIsFilteringBtnActive((btnListObj) => {
                return { ...btnListObj, [elem.name]: false }
            })
        } else {
            setClickedWeatherButtons((arr) => [...arr, elem.name])
            setIsFilteringBtnActive((btnListObj) => {
                return { ...btnListObj, [elem.name]: true }
            })
        }
    }

    /* clickedWeatherButtons 상태 확인용 */
    // useEffect (() => {
    //   console.log('***clickedWeatherButtons: useEffect***', clickedWeatherButtons);
    // },[clickedWeatherButtons]);

    // 상의 더미데이터 (state 변수가 필요하게 될까?)
    const clothesTop = [
        ["default", "상의 선택"],
        ["tshirts", "티셔츠"],
        ["shirts", "셔츠"],
    ]

    // 하의 더미데이터
    const clothesBottom = [
        ["default", "하의 선택"],
        ["shorts", "반바지"],
        ["pants", "긴 바지"],
    ]

    // select 상태 관리 & 이벤트 핸들러
    const [selectValueTop, setSelectValueTop] = useState("default")
    const [selectValueBottom, setSelectValueBottom] = useState("default")

    const selectTopHandler = (e) => {
        setSelectValueTop(e.target.value)
    }

    const selectBottomHandler = (e) => {
        setSelectValueBottom(e.target.value)
    }

    // textarea state & handler
    const [postText, setPostText] = useState("")
    const postTextHandler = (e) => {
        setPostText(e.target.value)
    }

    // 등록버튼 이벤트
    const submitButtonHandler = (e) => {
        console.log(userInfo.user_id)
        axios({
            url: url + "/post/write",
            method: "post",
            // headers: {
            //     // accept: "application/json",
            // },
            data: {
                user_id: userInfo.user_id,
                post_photo: uploadedImg.filePath,
                post_title: title,
                post_content: postText,
                weather: selectWeather,
                wind: selectWind,
                temp: selectTemp,
                top_id: selectValueTop,
                bottom_id: selectValueBottom,
                xLocation: curLocation.lat,
                yLocation: curLocation.lon,
            },
            withCredentials: true,
        })
        .then (() => {
            history.push('/map');
        })
        .catch(err => console.log(err));
    }

    function weatherFunc(select) {
        console.log("select=" + select)
        if (
            select === "sunny" ||
            select === "cloudy" ||
            select === "rainy" ||
            select === "snowy"
        ) {
            setSelectWeather(select)
        } else if (
            select === "breezy" ||
            select === "windy" ||
            select === "strong"
        ) {
            setSelectWind(select)
        } else if (select === "cold" || select === "hot") {
            setSelectTemp(select)
        }
    }
    const onSubmit = (e) => {
        console.log(e)
        e.preventDefault()
        const formData = new FormData()
        formData.append("img", photo)
        console.log(formData)
        axios
            .post(url + "/post/photo", formData, {
                "Content-Type": "application/json",
                withCredentials: true,
            })
            .then((res) => {
                const { fileName } = res.data
                setUploadedImg({
                    fileName,
                    filePath: `${url}/img/${fileName}`,
                })
                alert("사진을 성공적으로 업로드 하였습니다!")
            })
            .catch((err) => {
                console.error(err)
            })
    }
    const addFile = (e) => {
        console.log(e.target.files[0])
        setPhoto(e.target.files[0])
    }

    return (
        <Outer className="writePage">
            <PictureSection
                className="pictureUploadSection writePageLeft"
                onSubmit={onSubmit}
            >
                <article className="titleInput">
                    <WriteText
                        onChange={titleInputHandler}
                        value={title}
                        placeholder="제목을 입력하세요."
                        small
                    ></WriteText>
                </article>
                <PhotoBox>
                    {uploadedImg ? (
                        <PhotoBox2 src={uploadedImg.filePath} />
                    ) : (
                        <div></div>
                    )}
                </PhotoBox>
                <Button2
                    type="file"
                    className="uploadButton"
                    onChange={addFile}
                    round
                />
                <Button3 type="submit">업로드</Button3>
            </PictureSection>

            <DesktopRight className="writePageRight">
                <ButtonsAndSelects className="buttonsAndSelects">
                    <FlexColumnCenter className="smallSection">
                        <p>날씨를 선택하세요.</p>
                        <FilteringButtons
                            className="filteringButtons"
                            onClick={weatherBtnHandler}
                        >
                            {weathers.map((weather, idx) => {
                                return (
                                    <FilteringBtn
                                        key={idx}
                                        name={weather}
                                        className="weatherButton"
                                        type="button"
                                        active={isFilteringBtnActive[weather]}
                                        onClick={() => weatherFunc(weather)}
                                    >
                                        <img
                                            src={`${process.env.PUBLIC_URL}img/icons-write/${weather}.png`}
                                        />
                                    </FilteringBtn>
                                )
                            })}
                        </FilteringButtons>
                    </FlexColumnCenter>

                    <FlexColumnCenter className="smallSection">
                        <p>의상을 선택하세요.</p>
                        <SelectArea>
                            <select
                                className="top"
                                value={selectValueTop}
                                onChange={selectTopHandler}
                            >
                                {clothesTop.map((elem, idx) => {
                                    return (
                                        <option value={elem[0]} key={idx}>
                                            {elem[1]}
                                        </option>
                                    )
                                })}
                            </select>
                            <select
                                className="bottom"
                                value={selectValueBottom}
                                onChange={selectBottomHandler}
                            >
                                {clothesBottom.map((elem, idx) => {
                                    return (
                                        <option value={elem[0]} key={idx}>
                                            {elem[1]}
                                        </option>
                                    )
                                })}
                            </select>
                        </SelectArea>
                    </FlexColumnCenter>
                </ButtonsAndSelects>

                <TextSection>
                    <WriteText
                        type="text"
                        placeholder="글을 입력하세요."
                        value={postText}
                        onChange={postTextHandler}
                    />
                    <Button
                        className="submitButton"
                        onClick={submitButtonHandler}
                    >
                        등록
                    </Button>
                </TextSection>
            </DesktopRight>
        </Outer>
    )
}
