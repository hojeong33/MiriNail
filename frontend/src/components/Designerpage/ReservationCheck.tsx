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
    width: 85%;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    box-shadow: rgba(122, 122, 122, 0.1) 0px 1px 3px 0px,
      rgba(118, 118, 118, 0.06) 0px 1px 2px 0px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding: 10px;
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
  .react-calendar__tile {
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
    display: flex;
    justify-content: center;
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
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .timetable {
    width: 100%;
    border: 1px solid #e0e0e0;
    padding: 20px;
    .bundle {
      display: flex;
      /* align-items: center; */
      font-weight: 500;
      .kinds {
        width: 100px;
        font-size: 18px;
        margin-right: 20px;
      }
      .pmkinds {
        /* height: inherit; */
      }
      .content {
        font-size: 18px;
        .timetiles {
          display: flex;
          width: 500px;
          flex-wrap: wrap;
          .selected {
          background-color: #b098fc;
        }
        }
        .timetile {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 40px;
          background-color: #E9E9E9;
          margin: 5px;
          cursor: pointer;
          :hover {
            /* background-color: #e0e0e0; */
          }
          :active {
            background-color: #d2d2d0;
          }
        }
      }
    }
  }
  .helperbox {
    margin-right: 30px;
    display: flex;
    justify-content: flex-end;
    .helper {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
    .possiblecolor {
      width: 15px;
      height: 15px;
      background-color: #797979;
      border: 1px solid #797979;
      margin-right: 5px;
    }
    .impossiblecolor {
      width: 15px;
      height: 15px;
      background-color: #E9E9E9;
      border: 1px solid #797979;
      margin-right: 5px;
    }
  }
  .menu {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #e0e0e0;
    padding: 20px;
    .menuSelectText {
      display: flex;
      font-size: 20px;
      margin: 10px;
      font-weight: 600;
    }
    .typebox {
      display: flex;
      button {
        padding: 20px;
      }
    }
    .menucontent {
      padding: 30px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 150px;
      border-top: 1px solid black;
      input {
        position: absolute;
        left: 10px;
      }
    }
  }
  .submitbutton {
    margin-top: 20px;
    width: 100%;
    background-color: #797979;
    padding: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
  }
`;

const Divider = styled.div`
  margin: 10px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

const ReservationCheck = () => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState(["2022-04-20", "2022-04-02"]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const amTime = ["10:00", "10:30", "11:00", "11:30"]
  const pmTime = ["12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00",]

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

  const onclickTimeTile = (time:string) => {
    setSelectedTime(time)
  }

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
        <div className="timetable">
          <div className="bundle">
            <div className="kinds">날짜: </div>
            <div className="content">
              {moment(value).format("YYYY년 MM월 DD일")}
            </div>
          </div>
          <Divider></Divider>
          <div className="bundle">
            <div className="kinds">시간: </div>
            <div className="content">{selectedTime}</div>
          </div>
          <Divider></Divider>
          <div className="bundle">
            <div className="kinds">오전</div>
            <div className="content">
              <div className="timetiles">
                {amTime.map((time, idx) => {
                  return (
                    <div
                      className={`timetile ${
                        time === selectedTime ? "selected" : ""
                      }`}
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className="bundle">
            <div className="kinds pmkinds">오후</div>
            <div className="content">
              <div className="timetiles">
                {pmTime.map((time, idx) => {
                  return (
                    <div
                    className={`timetile ${
                      time === selectedTime ? "selected" : ""
                    }`}
                      key={idx}
                      onClick={() => onclickTimeTile(time)}
                    >
                      {time}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="helperbox">
            <div className="helper">
              <div className="possiblecolor"></div>
              <div>선택가능</div>
            </div>
            <div className="helper">
              <div className="impossiblecolor"></div>
              <div>선택불가</div>
            </div>
          </div>
        </div>
        <div className="menu">
          <div className="menuSelectText">네일아트 선택</div>
          <div className="typebox">
            <button>글레이즈</button>
            <button>프렌치</button>
            <button>라인스톤</button>
          </div>
          <div className="menucontent">
            <input type="checkbox" />
            <div>글레이즈 - 딥다크</div>
            <div>시크한 매력을 더해보세요!</div>
            <div>50,000원</div>
          </div>
          <div className="menucontent">
            <input type="checkbox" />
            <div>글레이즈 - 딥다크</div>
            <div>시크한 매력을 더해보세요!</div>
            <div>50,000원</div>
          </div>
        </div>
        <button className="submitbutton">예약하기</button>
      </FormWrapper>
    </Wrapper>
  );
}
export default ReservationCheck