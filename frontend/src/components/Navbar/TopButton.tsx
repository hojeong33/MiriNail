import { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .topBtn {
    visibility: hidden;
    transition: 0.01s ease;
  }
  .active {
    visibility: visible;
  }
`

const TopButton = () => {
  const [ScrollY, setScrollY] = useState(0);  // 스크롤값을 저장하기 위한 상태
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
 
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if(ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }
  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // ScrollY 의 값을 초기화
    // setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <Wrapper>
      {/* <button className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop}>
        맨위로
      </button> */}
      <img src="/assets/images/topbtn.png" alt="" className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop}/>
    </Wrapper>
  )
}

export default TopButton;