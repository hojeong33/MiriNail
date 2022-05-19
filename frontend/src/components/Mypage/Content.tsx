import { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import NFTItems from "../Layout/NFTItems";
// import Paginations from '../Layout/Paginations'
import Like from "./Like";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Wrapper = styled.div`
  * {
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  height: 100%;
`;
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
          .selected {
            opacity: 1;
          }
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
          .historytext {
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
        padding-top: 55px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
        min-height: 100vh;
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
  const [hisTog, setHisTog] = useState<boolean>(false);
  const location = useLocation();
  const temp = location.pathname.split("/");
  const { userSeq } = useParams();
  console.log(temp[temp.length - 1]);
  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <Link
                    to="myreservation"
                    className={`${
                      temp[temp.length - 1] === "myreservation"
                        ? "selected"
                        : ""
                    }`}
                  >
                    나의 예약
                  </Link>
                  <Link
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
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
                    <Link
                      to="like"
                      className={`${
                        temp[temp.length - 1] === "like" ? "selected" : ""
                      }`}
                    >
                      좋아요 한 네일아트
                    </Link>
                    {/* <Link
                      to="capture"
                      className={`${
                        temp[temp.length - 1] === "capture" ? "selected" : ""
                      }`}
                    >
                      가상피팅 캡쳐
                    </Link> */}
                    <Link
                      to="mypost"
                      className={`${
                        temp[temp.length - 1] === "mypost" ? "selected" : ""
                      }`}
                    >
                      작성 한 게시글
                    </Link>
                    <Link
                      to="myreview"
                      className={`${
                        temp[temp.length - 1] === "myreview" ? "selected" : ""
                      }`}
                    >
                      작성 한 리뷰
                    </Link>
                    <Link
                      to="myask"
                      className={`${
                        temp[temp.length - 1] === "myask" ? "selected" : ""
                      }`}
                    >
                      나의 문의
                    </Link>
                  </HistoryTab>
                  <Link
                    to="followingdesigner"
                    className={`${
                      temp[temp.length - 1] === "followingdesigner"
                        ? "selected"
                        : ""
                    }`}
                  >
                    팔로우한 디자이너
                  </Link>
                  {userSeq === sessionStorage.getItem("userSeq") &&
                    sessionStorage.getItem("userRole") === "ROLE_USER" && (
                      <Link
                        to="apply"
                        className={`${
                          temp[temp.length - 1] === "apply" ? "selected" : ""
                        }`}
                      >
                        디자이너 신청
                      </Link>
                    )}
                </div>
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
};

export default Content;
