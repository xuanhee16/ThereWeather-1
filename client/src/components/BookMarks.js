import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";


export const Bookmark = ({ like, bookmarkHandler, color })  => {

  return(
    <button className="bookmarkContainer" onClick={bookmarkHandler}>
      <FontAwesomeIcon
        icon={faBookmark}
        className="bookmark"
        size="3x"
        color={color}
      />
    </button>
  )
}

// 사용 예시
// const [bookmarked, setBookmarked] = useState(false);
// const bookmarkHandler = (e) => {
//   setBookmarked(prev => !prev);
// }
// <Bookmark bookmarkHandler={bookmarkHandler} color={bookmarked ? '#eb425b' : '#aaa'}/>