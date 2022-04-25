import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .react-calendar {
    width: 768px;
    background-color: #fff;
    color: #222;
    border: 1px solid #d1d1d1;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 10px;
  }
  .react-calendar__navigation button {
    color: #222;
    min-width: 44px;
    font-size: 18px;
    font-weight: 500;
    margin-top: 8px;
    cursor: default;
    background-color: #fff;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 10px 0;
    font-size: 16px;
    font-weight: 700;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
    cursor: default;
  }
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  .react-calendar__tile {
    padding: 18px 0;
    position: relative;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    /* color: #797979; */
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #E9E9E9;
    border-radius: 6px;
    font-weight: bold;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #eeeeee;
    border-radius: 6px;
    font-weight: bold;
    color: #797979;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #797979;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #797979;
    color: white;
  }

  .calendarbox {
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .dot {
    height: 7px;
    width: 7px;
    background-color: #ffa7a7;
    border-radius: 50%;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const FormWrapper = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #d1d1d1;
  padding: 20px;
  margin-top: 20px;
  .rvtext {
    display: flex;
    font-size: 22px;
    margin: 10px 0 10px 10px;
    font-weight: 600;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .count {
    text-align: start;
    padding: 10px;
    font-size: 20px;
    margin: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  .table {
    width: 90%;
    /* border: 1px solid black; */
    table {
      width: 100%;
      border-top: 1px solid #3d3c3a;
      color: #3d3c3a;
      thead {
        font-weight: 500;
      }
      th {
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid #d2d2d0;
        padding: 20px 0px;
        font-weight: 500;
      }
      tbody {
        .title {
          cursor: pointer;
        }
        tr {
        cursor: pointer;
        :hover {
          background-color: #f8f8fa;
        }
      }
      }
    }
  }
  .pagination {
    margin: 20px 0;
  }
`;

const Divider = styled.div`
  margin: 20px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

interface IState {
  reservation: {
    ID: string;
    nailart: string;
    time: string;
  }
}

const ReservationCheck = () => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState(["2022-04-20", "2022-04-02"]);
  const [reservations, setReservations] = useState<IState["reservation"][]>([
    {
      ID: "dami123",
      nailart: "글레이즈-딥다크",
      time: "13:00"
    },
    {
      ID: "dami123",
      nailart: "글레이즈-딥다크",
      time: "13:00"
    },
    {
      ID: "dami123",
      nailart: "글레이즈-딥다크",
      time: "13:00"
    },
    {
      ID: "dami123",
      nailart: "글레이즈-딥다크",
      time: "13:00"
    },
    {
      ID: "dami123",
      nailart: "글레이즈-딥다크",
      time: "13:00"
    }
  ]);
  
  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //     },
  //   }
  // );



  return (
    <Wrapper>
      <div className="calendarbox">
        <Calendar
          onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(<div className="dot"></div>);
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div>{html}</div>
              </>
            );
          }}
        />
      </div>

      <FormWrapper>

          <div className="rvtext">
            {moment(value).format("YYYY년 MM월 DD일")} 예약 정보
          </div>

          <Divider></Divider>
          <TableWrapper>
            <div className="table">
              <div className="count">총 10 건</div>
              <table>
                <colgroup>
                  <col width="15%" />
                  <col width="70%" />
                  <col width="15%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>네일아트</th>
                    <th>예약시간</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, idx) => {
                    return (
                      <tr key={idx}>
                        <th>{reservation.ID}</th>
                        <th className="title">{reservation.nailart}</th>
                        <th>{reservation.time}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pagination"></div>
          </TableWrapper>

      </FormWrapper>
    </Wrapper>
  );
}
export default ReservationCheck