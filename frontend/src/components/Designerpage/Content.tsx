import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { IDesigner } from '../../routes/Designerpage/Designerpage';
// import Paginations from '../Layout/Paginations'



const Wrapper = styled.div`
  * {
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  height : 100%;

  
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
          .selected {
          opacity: 1;
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
        min-height: 100vh;
        padding-top: 55px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: center;
      }
    }
  }
`;

interface IProps {
  refetch: any
}
const Content:React.FC<IProps> = ({refetch}) => {
  const location = useLocation();
  const temp = location.pathname.split("/")
  console.log(temp[temp.length - 1])

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <Link
                    to="new"
                    className={`${temp[temp.length - 1] === "new" ? "selected" : ""}`}
                  >
                    새 소식
                  </Link>
                  <Link
                    to="introduction"
                    className={`${temp[temp.length - 1] === "introduction" ? "selected" : ""}`}
                  >
                    디자이너 소개
                  </Link>
                  <Link
                    to="NFTs"
                    className={`${temp[temp.length - 1] === "NFTs" ? "selected" : ""}`}
                  >
                    네일아트 목록
                  </Link>
                  <Link
                    to="reviews"
                    className={`${temp[temp.length - 1] === "reviews" ? "selected" : ""}`}
                  >
                    시술 후기들
                  </Link>
                  <Link
                    to="asklist"
                    className={`${temp[temp.length - 1] === "asklist" ? "selected" : ""}`}
                  >
                    문의 내역
                  </Link>
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
}

export default Content