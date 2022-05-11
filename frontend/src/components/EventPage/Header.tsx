import styled from "styled-components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import EventContent from "./EventContent";
import { isQueryKey } from "react-query/types/core/utils";

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  overflow: hidden;
  position: relative;
  /* height: 600px; */
  height: 450px;
  border-bottom: 1px solid #d2d2d0;
  .row {
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;
  }

  .pageHeaderTitle {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 40px;
    width: 300px;
    margin-left: -150px;
    margin-top: -35px;
    padding-top: 20px;
    line-height: 80px;
    text-align: center;
    color: #3d3c3a;
    font-weight: 600;
    font-family: "Playfair Display", serif;
    ::before {
      content: "";
      margin: 0 auto;
      display: block;
      width: 30px;
      height: 3px;
      background: #3d3c3a;
    }
  }

  .pageHeaderLinks {
    position: absolute;
    top: 50%;
    left: 0;
    font-size: 18px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
    color: #3d3c3a;

    span {
      padding: 0px 25px;
      cursor: pointer;
    }
  }

  .pageHeaderNavigation {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 10px;
    font-size: 14px;
    color: #bfbfbd;
    margin-left: 10px;
    .NavElement {
      position: absolute;
      width: 100%;
      height: 30px;
      // bottom: 10px;
      font-size: 14px;
      color: #bfbfbd;
      * {
        margin-right: 15px;
      }

      span {
        margin-top: 0px;
      }

      svg {
        top: 0%;
      }
    }
  }
`;
interface Props {
  isShow: boolean;
  title?: string;
  days?: string;
}
function Header(isShow: Props) {
  const [flag, setFlag] = useState("전체 이벤트");
  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="pageHeaderTitle">EVENT</div>
          {isShow.isShow ? (
            <div className="pageHeaderLinks">
              <span
                onClick={() => {
                  setFlag("전체 이벤트");
                }}
                style={
                  flag === "전체 이벤트"
                    ? {
                        color: "black",
                        textDecoration: "underline",
                        textUnderlinePosition: "under",
                      }
                    : { color: "gray" }
                }
              >
                전체 이벤트
              </span>
              <span
                onClick={() => {
                  setFlag("진행중인 이벤트");
                }}
                style={
                  flag === "진행중인 이벤트"
                    ? {
                        color: "black",
                        textDecoration: "underline",
                        textUnderlinePosition: "under",
                      }
                    : { color: "gray" }
                }
              >
                진행중인 이벤트
              </span>
              <span
                onClick={() => {
                  setFlag("종료된 이벤트");
                }}
                style={
                  flag === "종료된 이벤트"
                    ? {
                        color: "black",
                        textDecoration: "underline",
                        textUnderlinePosition: "under",
                      }
                    : { color: "gray" }
                }
              >
                종료된 이벤트
              </span>
            </div>
          ) : (
            <div className="pageHeaderLinks">
              <div style={{ fontSize: "24px" }}>{isShow.title}</div>
              <div>{isShow.days}</div>
            </div>
          )}
          <div className="pageHeaderNavigation">
            <div className="NavElement">
              <span>이벤트</span>
              <ChevronRightIcon />
              {flag}
            </div>
          </div>
        </div>
      </Wrapper>
      {isShow.isShow && <EventContent flag={flag}></EventContent>}
    </>
  );
}

export default Header;
