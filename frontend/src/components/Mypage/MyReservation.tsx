import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from 'moment'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    margin-bottom: 30px;
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
      width: 420px;
      height: 200px;
      margin: 10px 50px 30px 0;
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
          width: 100px;
          height: 100px;
        }
      }
      .cardright {
        padding: 0 10px 0 0;
        width: 220px;
        height: 100%;
        text-align: left;
        .cardright-top {
          padding-left: 15px;
          padding-top: 10px;
          height: 72px;
          border-bottom: 1px solid #d2d2d0;
          font-weight: 500;
          .name {
            font-size: 20px;
          }
          .shop {
            color: #717171;
          }
        }
        .cardright-bottom {
          padding: 8px 0 0 15px;
          height: 90px;
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
  const [designers, setDesigners] = useState<IState["designer"][]>([
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },    
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      type: "글레이즈",
      color: "코랄 블루",
      date: "2022.04.14",
      price: 50000
    },
  ]);
  const [reservations, setResevations] = useState<IState["reservation"][]>([
    {
      shop: "네일샵1",
      count: 1
    },
    {
      shop: "네일샵3",
      count: 234
    },
    {
      shop: "네일샵23",
      count: 3
    },
  ])

  return (
    <Wrapper>
      <div className="title">나의예약</div>
      <div className="nowRV">
        <div className="subtitle">
          현재 <span>예약</span> 내역
        </div>
        <div className="cards">
          {designers.map((designer, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="cardleft">
                  <img src={designer.imgurl} alt="" />
                </div>
                <div className="cardright">
                  <div className="cardright-top">
                    <div className="name">{designer.name}</div>
                    <div className="shop">{designer.shop}</div>
                  </div>
                  <div className="cardright-bottom">
                    <div>
                      {designer.type} - {designer.color}
                    </div>
                    <div>
                      <ArrowForwardIosIcon />
                      예약일: {designer.date}
                    </div>
                    <div>
                      <ArrowForwardIosIcon />
                      가격: {designer.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>

      </div>
      <div className="history">
        <div className="subtitle">
          장영남님은 현재까지 총 <span>528</span>회 예약하셨습니다.
        </div>
        <div className="designertextbox">
          아티스트
          <div className="line"></div>
        </div>
        <table>
          <colgroup>
            <col width="85%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            {reservations.map((reservation, idx) => {
              return (
                <tr key={idx}>
                  <th className="artist">{reservation.shop}</th>
                  <th className="count">{reservation.count}회</th>
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