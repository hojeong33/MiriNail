// import styled from "styled-components"
// import Header from "../../components/Mypage/Header"
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { useState } from "react";
// import Like from "../../components/Mypage/Like";

// const Wrapper = styled.div`
//   height: 100%;
//   width: 1300px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `

// const HeaderBox = styled.div`
//   position: relative;
// `
// const PathText = styled.div`
//   position: absolute;
//   margin-top: -30px;
//   margin-left: 20px;
// `

// const Body = styled.div`
//   /* min-width: 1280px; */
//   display: flex;
//   justify-content: flex-start;
// `

// const Sidebar = styled.div`
//   /* background-color: teal; */
//   display: flex;
//   flex-direction: column;
//   /* align-items: center; */
//   width: 620px;
//   height: 100vh;
//   border-right: 1px solid #d2d2d0;
//   .tabwrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     margin: 50px 0 0 40px;
//     .historytext {
//       display: flex;
//       align-items: center;
//       svg {
//         height: 20px;
//         width: 20px;
//       }
//     }
//     .tabcontent {
//       font-size: 16px;
//     }
//   }
// `

// const HistoryTab = styled.div`
//   height: ${(props) => (props.hidden ? 0 : "100%")};
//   transition: all 0.2s ease-out;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   font-size: 14px;
//   margin-left: 20px;
//   overflow: hidden;
//   button {
//     font-size: 14px;
//   }
// `;

// const Main = styled.div`
//   /* background-color: red; */
//   display: flex;
//   justify-content: center;
// `
// const ItemCards = styled.div`
//   display: flex ;
//   flex-wrap: wrap ;
//   justify-content: center;
//   margin: 20px;
//   &:last-child {
//     margin-right: auto;
//   }
// `

// const ItemCard = styled.div`
//   height: 300px;
//   border: 1px solid black;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 50px;
//   .cardwrapper {
//     width: 250px;
//     height: 250px;
//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//     svg {
//       position: absolute;
//       right: 10px;
//       top: 195px;
//       width: 30px;
//       height: 30px;
//       cursor: pointer;
//     }
//   }
// `;

// const Mypage = () => {
//   const [hisTog, setHisTog] = useState<boolean>(true);

//   return (
//     <Wrapper>
//       <HeaderBox>
//         <Header/>
//         <PathText>마이페이지</PathText>
//       </HeaderBox>
//       <Body>
//         <Sidebar>
//           <div className="tabwrapper">
//             <button className="historytext tabcontent" onClick={() => setHisTog(!hisTog)}>
//               HISTORY{" "}
//               {hisTog ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </button>
//             <HistoryTab hidden={hisTog}>
//               <button>좋아요 한 네일아트</button>
//               <button>저장한 네일아트 피팅사진</button>
//               <button>작성 한 게시글</button>
//               <button>작성 한 후기</button>
//               <button>나의 문의</button>
//             </HistoryTab>
//             <button className="tabcontent">팔로우한 디자이너</button>
//             <button className="tabcontent">나의 예약</button>
//           </div>
//         </Sidebar>
//         <Main>
//           <Like></Like>
//         </Main>
//       </Body>
//     </Wrapper>
//   );
// }

// export default Mypage


import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import NFTItems from '../Layout/NFTItems'
import Paginations from '../Layout/Paginations'
import Like from './Like'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Wrapper = styled.div`
  * {
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  height : 100vh;

  
`
const MainFrame = styled.div`
  width: 1300px;
  height: 100%;
  margin: 0 auto;

  .MainPadding {
    height: 100%;
    margin: 0px 10px;

    .ItemList {
      padding-left: 180px;
      height: 100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 55px;

        .TypeFilter {
          a {
            display: block;
            color: #3d3c3a;
            opacity: 0.5;
            transition: all 0.3s;
            font-size: 14px;
            margin-bottom: 20px;
          }
          a.active {
            opacity: 1;
          }
          a:hover {
            opacity: 1;
          }
          .historytext{
            display: flex;
            align-items: center;
            svg {
              margin-left: 20px;
            }
          }
        }

        .OrderFilter {
          margin-top: 100px;
          a {
            display: block;
            color: #3d3c3a;
            opacity: 0.5;
            transition: all 0.3s;
            font-size: 14px;
            margin-bottom: 20px;
          }
          a.active {
            opacity: 1;
          }
          a:hover {
            opacity: 1;
          }
          .CheckBox {
            display: block;
            font-size: 14px;
            color: #3d3c3a;
            label {
              margin-left: 7px;
            }
          }
        }
      }

      .RightBox {
        height: 100%;
        padding-top: 55px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
      }
    }
  }
`;

const HistoryTab = styled.div`
  height: ${(props) => (props.hidden ? 0 : "100%")};
  /* transition: all 0.2s ease-out; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  margin-left: 20px;
  overflow: hidden;
  button {
    font-size: 12px;
  }
`;


const Content = () => {
  const [hisTog, setHisTog] = useState<boolean>(true);

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault()
                      setHisTog(!hisTog);
                    }}
                    className="historytext"
                  >
                    HISTORY{" "}
                    {hisTog ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </Link>
                  <HistoryTab hidden={hisTog}>
                    <button>
                      <Link to="like">좋아요 한 네일아트</Link>
                    </button>
                    <button>
                      <Link to="capture">가상피팅 캡쳐</Link>
                    </button>
                    <button>
                      <Link to="mypost">작성 한 게시글</Link>
                    </button>
                    <button>
                      <Link to="myreview">작성 한 후기</Link>
                    </button>
                    <button>
                      <Link to="myask">나의 문의</Link>
                    </button>
                  </HistoryTab>
                  <Link to="followingdesigner">팔로우한 디자이너</Link>
                  <Link to="myreservation">나의 예약</Link>
                </div>
                {/* <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input type="checkbox" id="cb1" />
                    <label htmlFor="cb1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input type="checkbox" id="cb2" />
                    <label htmlFor="cb2">인기도순</label>
                  </div>
                </div> */}
              </div>
              <div className="RightBox">
                <Outlet />
              </div>
            </div>
          </div>
          <div></div>
        </MainFrame>
      </Wrapper>
    </>
  );
}

export default Content