import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { otherDesign } from "../../../store/api";
import { designerId } from "../../../store/atoms";

import { TailSpin } from 'react-loader-spinner'




const Wrapper = styled.div`
  .description {
    display: flex;
    justify-content: space-between;
    margin: 15px;
  }


.clear {
  min-height : 500px;
  zoom : 1;
  li {

    float: left;
    width: 20%;
    text-align: center;
    cursor: pointer;
    margin-bottom: 80px;
    .ItemBox {
      width : 100%;
      display:block;
      .imx {
        margin : 0px 10px;
        img {
          width :100%;
          max-width:100%;
          height : 250px;
        }
        .itemName {
          color: #3D3C3A;
          font-size: 16px;
          font-weight: 500;
          word-break: keep-all;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .itemPrice {
          color: #3D3C3A;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .hashTag {
          color: #6E6E6E;
          font-size: 14px;
          margin-bottom: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .clear {
      li {
        width: 33%;
      }
    }
  }
`;
const Gallery = () => {
  const param = useRecoilValue(designerId);

  const { isLoading, data } = useQuery("otherDesign", () => otherDesign(param));

  return (
    <Wrapper>
      <div className="description">
        <div>디자이너의 다른 작품을 만나보세요.</div>
        <div>전체보기</div>
      </div>
      <ul className="clear">
        { isLoading ? <div style={{position:"absolute",left:"50%",top:"50%"}}><TailSpin color="gray" height={50} width={50} /></div> : data.map((e:any,idx:any) => {
          return (
            <li className="ItemListType">
              <a href="" className="ItemBox">
                <div className="imx">
                  <img src={e.nailartThumbnailUrl} alt="" />
                </div>
              </a>
            </li>
          );
        })}
        
        
      </ul>
    </Wrapper>
  );
};

export default Gallery;
