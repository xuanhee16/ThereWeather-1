import { useEffect, useState } from "react";
import styled from "styled-components"

const PaginationContainer = styled.div.attrs({
  className: "pagination"
})`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A1A1A1;
  font-weight: bold;
  font-size: 1.5rem;
`;

const PageNumbersList = styled.ul.attrs({
  className: "pageNumbersList"
})`
  // border: 1px solid red;
  // width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0 1rem;
`;

const ArrowButton = styled.span.attrs({
  className: "arrow"
})`
  &:hover {
    color: black;
  }
`;

const PageNumberItem = styled.li.attrs({
  className: "pageNumberItem"
})`
  padding: 0 1rem;
  &:hover {
    color: black;
  }
`;

export default function Pagination({dataLength, itemsPerPage, numberButtonClickHandler}) {
  const numberOfPages = Math.ceil(dataLength / itemsPerPage);
  const numberArr = new Array(numberOfPages).fill(0).map((el, idx) => idx + 1);
  const [startIdx, setStartIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(itemsPerPage);
  const cutArrInit = new Array(itemsPerPage).fill(0).map((el, idx) => idx + 1);
  const [cutArr, setCutArr] = useState(cutArrInit);

  const prevHandler = () => {
    if(startIdx === 0) return;
    // console.log('**prev**');
    setStartIdx(prev => prev - itemsPerPage);
    setLastIdx(prev => prev - itemsPerPage);
  }

  const nextHandler = () => {
    let tempIdxEnd = Math.ceil(numberArr.length/itemsPerPage) * itemsPerPage;
    if(lastIdx === tempIdxEnd) return;
    // console.log('**next**');
    setStartIdx(prev => prev + itemsPerPage);
    setLastIdx(prev => prev + itemsPerPage);
  }

  useEffect(()=>{
    let tempIdxEnd = Math.ceil(numberArr.length/itemsPerPage) * itemsPerPage;

    if(startIdx >= itemsPerPage || lastIdx <= tempIdxEnd) {
      const result = numberArr.slice(startIdx, lastIdx);
      setCutArr(prev => result);
    }
  }, [startIdx, lastIdx])

  return (
    <PaginationContainer>
      <ArrowButton className="prevButton" onClick={prevHandler}>
        ⬅️
      </ArrowButton>
      <PageNumbersList>
        {
          numberArr.map(number => {
            return (
              <PageNumberItem
                key={number}
                id={number}
                onClick={() => {
                  numberButtonClickHandler(number);
                }}
              >
                {number}
              </PageNumberItem>
            );
          })
        }
      </PageNumbersList>
      <ArrowButton className="nextButton" onClick={nextHandler}>
        ➡️
      </ArrowButton>
    </PaginationContainer>
  );
}