import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'
import { useQuery } from "react-query";
import { deleteCancelReservation, getUserReservation } from "../../store/apis/book";
import { useNavigate, useParams } from "react-router-dom";
import { convertDate } from "../Commons/functions";
import { TailSpin } from "react-loader-spinner"

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;


const Wrapper = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  .title {
    display: flex;
    width: 90%;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 60px;
  }
  .subtitle {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .subexplain{
    margin-bottom: 10px;
    opacity: 0.8;
  }
  .cards {
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    .card {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 450px;
      height: 220px;
      margin: 10px 20px 30px 20px;
      padding: 20px 0;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      cursor: pointer;
      :hover {
        background-color: #f8f8fa;
      }
      .cardleft {
        border-right: 1px solid #e6e6e6;
        
        width: 180px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          border-radius: 50%;
          width: 110px;
          height: 110px;
        }
      }
      .cardright {
        padding: 0 10px 0 0;
        width: 260px;
        height: 100%;
        text-align: left;
        .cardright-top {
          padding-left: 25px;
          padding-top: 10px;
          height: 80px;
          border-bottom: 1px solid #d2d2d0;
          font-weight: 500;
          .name {
            font-size: 22px;
          }
          .shop {
            color: #717171;
          }
        }
        .cardright-bottom {
          padding: 15px 0 0 25px;
          height: 100px;
          font-size: 18px;
          div {
            display: flex;
            align-items: center;
          }
          svg {
            width: 10px;
            height: 10px;
            margin-right: 5px;
          }
        }
        .btnbox {
        }
        .confirm {
          border: 1px solid #333;
          padding: 3px 8px;
          position: absolute;
          margin-left: 160px;
          color: #333;
          cursor: default;
        }
        button {
          border: 1px solid #ff3939;
          padding: 3px 8px;
          position: absolute;
          margin-left: 160px;
          color: #ff3939;
        }
      }
    }
  }
  span {
    color: #8b70e6;
  }
  .nowRV {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
  }
  .history {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
    margin-top: 50px;
  }
  .designertextbox {
    position: relative;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
    .line {
      position: absolute;
      width: 100%;
      border-bottom: 2px solid #8b70e6;
    }
  }
  table {
    width: 100%;
    tr {
      border-bottom: 1px solid #3d3c3a;
      cursor: pointer;
      :hover {
        background-color: #f8f8fa;
      }
    }
    th {
      padding: 10px;
    }
    .artist {
      text-align: left;
    }
    .count {
      text-align: right;
    }
  }
`;

interface IState {
  designer: {
    name: string;
    shop: string;
    imgurl: string;
    type: string;
    color: string;
    date: string;
    price: number;
  }
  reservation: {
    shop: string;
    count: number;
  }
}

const MyReservation = () => {
  const navigate = useNavigate();
  const { userSeq } = useParams();

  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["getBookByDate" ],
    async () => {
      return await getUserReservation(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const onClickDesigner = (designerSeq:number) => {
    navigate(`/designerpage/${designerSeq}/new`)
  }

  const onClickCard = (designerSeq:number) => {
    navigate(`/designerpage/${designerSeq}/new`)
  }

  const onClickCancel = async (bookSeq:number) => {
    try {
      const res = await deleteCancelReservation(bookSeq)
      console.log(res)
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  return isLoading ? (
    <LoadingBox className="loading">
      <TailSpin height={50} width={50} color="gray" />
    </LoadingBox>
  ) : (
    <Wrapper>
      <div className="nowRV">
        <div className="subtitle">
          현재 <span>예약</span> 내역
        </div>
        <div className="subexplain">
          예약 취소는 예약일로부터 최소 이틀 이전에 가능합니다.
        </div>
        <div className="cards">
          {data.bookList.length !== 0 &&
            data.bookList.map((book: any, idx: any) => {
              return (
                <div
                  onClick={() => onClickCard(book.designerInfo.designerSeq)}
                  className="card"
                  key={idx}
                >
                  <div className="cardleft">
                    <img src={book.designerInfo.designerInfoImgUrl} alt="" />
                  </div>
                  <div className="cardright">
                    <div className="cardright-top">
                      <div className="name">
                        {book.designerInfo.designerShopName}
                      </div>
                      <div className="shop">
                        예약일:{" "}
                        {moment(convertDate(book.bookDatetime)).format(
                          "MM/DD HH시 mm분"
                        )}
                      </div>
                    </div>
                    <div className="cardright-bottom">
                      <div>
                        {book.nailart.nailartType} -{" "}
                        {book.nailart.nailartDetailColor}
                      </div>
                      {/* <div>
                      <ArrowForwardIosIcon />
                      예약일: {designer.date}
                    </div> */}
                      <div>
                        <ArrowForwardIosIcon />
                        가격: {book.nailart.nailartPrice.toLocaleString()}원
                      </div>
                      <div className="btnbox">
                        {parseInt(
                          moment(convertDate(book.bookDatetime)).fromNow(true)
                        ) >= 2 ? <button onClick={(e) => {
                          e.stopPropagation();
                          onClickCancel(book.bookSeq);
                        }}>예약취소</button> : <button className="confirm">예약확정</button>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {data.bookList.length === 0 && <div>예약 내역이 없습니다</div>}
        </div>
      </div>
      <div className="history">
        <div className="subtitle">
          현재까지 총 <span>{data.visitCount ? data.visitCount : "0"}</span>회 예약하셨습니다.
        </div>
        <div className="designertextbox">
          디자이너
          <div className="line"></div>
        </div>
        <table>
          <colgroup>
            <col width="85%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            {data.designerList?.map((designer: any, idx: any) => {
              return (
                <tr
                  key={idx}
                  onClick={() =>
                    onClickDesigner(designer.designerInfo.designerSeq)
                  }
                >
                  <th className="artist">
                    {designer.designerInfo.designerShopName}
                  </th>
                  <th className="count">{designer.designerCount}회</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}
export default MyReservation