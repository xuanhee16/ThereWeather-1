export const initialState = {
    //프론트엔드 하다가 사용하고싶은 변수 여기서 선언가능
    isLogin: false, //로그인상태 -hoon
    genderToggle: 1, //기본값 1, 젠더 토글 클릭시 남=1 여=2으로 변함-hoon
    searchWord: "",
    selectWord: "",
    curLocation: { lat: "", lon: "" },
    editPassword: false,
    userInfo: {},
    //북마크 페이지네이션
    start: 0,
    end: 10,
    current: 1,

    item: []
}
