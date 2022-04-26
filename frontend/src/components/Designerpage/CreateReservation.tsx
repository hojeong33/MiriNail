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
  .timetable {
    width: 100%;
    border: 1px solid #d1d1d1;
    padding: 20px;
    margin-top: 20px;
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
        margin-top: 12px;
      }
      .content {
        font-size: 18px;
        .timetiles {
          display: flex;
          width: 500px;
          flex-wrap: wrap;
          .selected {
            background-color: #cacaca;
          }
        }
        .timetile {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 45px;
          background-color: #e9e9e9;
          color: #333;
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
      .selectedtime {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .align {
      align-items: center;
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
      background-color: #e9e9e9;
      border: 1px solid #797979;
      margin-right: 5px;
    }
  }
  .menu {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #d1d1d1;
    padding: 20px;
    .menuSelectText {
      display: flex;
      font-size: 22px;
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
    background-color: rgb(51, 51, 51);
    padding: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    :hover {
      background-color: #1d1d1d;
    }
  }
  .rvtext {
    display: flex;
    font-size: 22px;
    margin: 10px 0 30px 10px;
    font-weight: 600;
  }
`;

const Divider = styled.div`
  margin: 20px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

const CreateReservation = () => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState(["2022-04-20", "2022-04-02"]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [menuType, setMenuType] = useState<number>(0);
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
        <div className="rvtext">예약 정보</div>
          <div className="bundle align">
            <div className="kinds">날짜: </div>
            <div className="content selectedtime">
              {moment(value).format("YYYY년 MM월 DD일")}
            </div>
          </div>
          <Divider></Divider>
          <div className="bundle align">
            <div className="kinds">시간: </div>
            <div className="content selectedtime">{selectedTime}</div>
          </div>
          <Divider></Divider>
          <div className="bundle align">
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
            <button onClick={() => setMenuType(0)}>글레이즈</button>
            <button onClick={() => setMenuType(1)}>프렌치</button>
            <button onClick={() => setMenuType(2)}>라인스톤</button>
          </div>
          <div className="menucontent">
            <CheckCircleOutlineIcon />
            <div>글레이즈 - 딥다크</div>
            <div>시크한 매력을 더해보세요!</div>
            <div>50,000원</div>
          </div>
          <div className="menucontent">
            <RadioButtonUncheckedIcon />
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
export default CreateReservation;