import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
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
  }
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  .react-calendar__tile{
    padding: 10px 0;
    position: relative;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }

  .calendarbox {
    width: 90%;
  }
  .dot {
    height: 5px;
    width: 5px;
    background-color: #ffa7a7;
    border-radius: 50%;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  
`

const ReservationCheck = () => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState(["2022-04-20", "2022-04-02"]);

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

        <FormWrapper>
          <div className="timetable">
            <div className="today">
              날짜: <span>{moment(value).format("YYYY년 MM월 DD일")}</span>
            </div>
            <div className="time">
              시간: <span>시간시간</span>
            </div>
            <div className="schedule">
              <div className="am">오전</div>
              <div className="pm">오후</div>
            </div>
          </div>
          <div className="menu">
            <div>네일메뉴 선택</div>
            <div>
              <button>글레이즈</button>
              <button>프렌치</button>
              <button>라인스톤</button>
            </div>
            <div>
              <input type="checkbox" />
              <div>글레이즈 - 딥다크</div>
              <div>시크한 매력을 더해보세요!</div>
              <div>50,000원</div>
            </div>
          </div>
          <button className="submitbutton">예약하기</button>
        </FormWrapper>
      </div>
    </Wrapper>
  );
}
export default ReservationCheck