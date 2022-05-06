import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment'
import { useMutation, useQuery } from "react-query";
import { getBookByCalendar, postBook } from "../../store/apis/book";
import { useNavigate, useParams } from "react-router-dom";
import { getDesignerNailart } from "../../store/apis/nailart";

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
    background: #b3b3b3;
    /* color: #797979; */
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #b6b6b6;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #cacaca;
    border-radius: 6px;
    font-weight: bold;
    color: #ffffff;
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
            background-color: rgb(51, 51, 51);
          }
          .booked {
            background-color: #e9e9e9;
            color: #a7a7a7;
            cursor: default;
          }
        }
        .timetile {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 45px;
          background-color: #797979;
          color: white;
          margin: 5px;
          cursor: pointer;
          :hover {
            /* background-color: #e0e0e0; */
          }
          :active {
            /* background-color: #d2d2d0; */
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
    position: relative;
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
      .selected {
        font-weight: 600;
      }
      button {
        padding: 20px;
      }
    }
    .menucontent {
      padding: 30px;
      padding-left: 60px;
      position: relative;
      display: flex;
      align-items: flex-start;
      height: 130px;
      border-top: 1px solid black;
      cursor: pointer;
      :hover {
        background: #f8f8fa;
      }
      input {
        position: absolute;
        left: 10px;
      }
      img {
        height: 70px;
        width: 70px;
      }
      .nextimg {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    svg {
      position: absolute;
      top: 50px;
      left: 15px;
    }
    .nailartlist {
      max-height: 450px;
      overflow-y: scroll;
      .nailname {
        font-size: 16px;
        font-weight: 500;
      }
      .nailhash {
        color: #8d8d8d;
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
  textarea {
    resize: none;
    margin-top: 20px;
    border: 1px solid #d1d1d1;
    width: 100%;
    height: 100px;
    padding: 15px;
  }
`;

const Divider = styled.div`
  margin: 20px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

const CreateReservation = () => {
  const [value, setValue] = useState(new Date());
  const [mark, setMark] = useState([]);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<number|undefined>();
  const [comment, setComment] = useState("")
  const [menuType, setMenuType] = useState<number>(0);
  const [type1, setType1] = useState<any>([])
  const [type2, setType2] = useState<any>([])
  const [type3, setType3] = useState<any>([])
  const [nailLoading, setNailLoading] = useState(true)
  const amTime = ["10:00", "10:30", "11:00", "11:30"];
  const pmTime = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
  ];
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const { data:nailData } = useQuery<any, Error>(
    ["getDesignerNailart"],
    async () => {
      return await getDesignerNailart(Number(userSeq), 1, 100);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        const gel = []
        const french = []
        const linestone = []
        for (let i = 0; i < res.numberOfElements; i++) {
          if (res.content[i].nailartType === "젤") {
            gel.push(res.content[i])
          } else if (res.content[i].nailartType === "프렌치") {
            french.push(res.content[i])
          } else if (res.content[i].nailartType === "라인스톤") {
            linestone.push(res.content[i])
          }
        }
        setType1(gel)
        setType2(french)
        setType3(linestone)
        setNailLoading(false)
      },
      onError: (err: any) => console.log(err),
    }
  );

  const { data:bookData, isLoading:bookLoading } = useQuery<any, Error>(
    ["getBookByDate", moment(value).format("YYYY-MM-DD")],
    async () => {
      return await getBookByCalendar(moment(value).format("YYYY-MM-DD"), Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const makeReservation = useMutation<any, Error>(
    "makeReservation",
    async () => {
      return await postBook(
        comment,
        moment(value).format("YYYY-MM-DD ") + selectedTime,
        Number(userSeq),
        Number(selectedMenu),
        Number(sessionStorage.getItem("userSeq"))
      );
    },
    {
      onSuccess: (res) => {
        console.log(res);
        alert("성공적으로 예약되었습니다.")
        navigate(`/mypage/${sessionStorage.getItem("userSeq")}/myreservation`)
      },
      onError: (err: any) => console.log(err),
    }
  );

  const onclickTimeTile = (time: string) => {
    setSelectedTime(time);
  };

  const onClickNailart = (Seq:number) => {
    setSelectedMenu(Seq)
  }

  const onClickReservation = () => {
    if (!selectedMenu) {
      alert("네일아트를 선택해주세요")
      return
    }
    makeReservation.mutate()
  }
  
  const convertTimeAM = (time:string) => {
    const temp = "am" + time.slice(0,2) + time.slice(3, 5)

    if (bookData?.data[temp]) return "booked"
    // console.log(temp, bookData.data[temp])
    return ""
  }

  const convertTimePM = (time:string) => {
    const temp = "pm" + time.slice(0,2) + time.slice(3, 5)

    if (bookData?.data[temp]) return "booked"
    // console.log(temp, bookData.data[temp])
    return ""
  }


  return (
    <Wrapper>
      <div className="calendarbox">
        <Calendar
          onChange={setValue} // useState로 포커스 변경 시 현재 날짜 받아오기
          value={value}
          minDate={new Date()} // 과거 날짜 disable
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
                      } ${convertTimeAM(time)}`}
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
                      }${convertTimePM(time)}`}
                      key={idx}
                      onClick={() => {
                        if (convertTimePM(time) !== "booked") {
                          onclickTimeTile(time);
                        }
                      }}
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
        {nailLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="menu">
            <div className="menuSelectText">네일아트 선택</div>
            <div className="typebox">
              <button
                className={menuType === 0 ? "selected" : ""}
                onClick={() => setMenuType(0)}
              >
                젤
              </button>
              <button
                className={menuType === 1 ? "selected" : ""}
                onClick={() => setMenuType(1)}
              >
                프렌치
              </button>
              <button
                className={menuType === 2 ? "selected" : ""}
                onClick={() => setMenuType(2)}
              >
                라인스톤
              </button>
            </div>
            <div className="nailartlist">

            {menuType === 0 && type1?.map((item:any, idx:any) => {
              return (
                <div
                  key={idx}
                  className="menucontent"
                  onClick={() => onClickNailart(item.nailartSeq)}
                >
                  {item.nailartSeq === selectedMenu ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  <div className="thumbnailurl">
                    <img src={item.nailartThumbnailUrl} alt="" />
                  </div>
                  <div className="nextimg">
                    <div className="nailname">
                      {item.nailartType} - {item.nailartDetailColor}
                    </div>
                    <div className="nailhash">
                      # {item.nailartColor.toUpperCase()} #{" "}
                      {item.nailartWeather}
                    </div>
                    <div className="nailprice">
                      {item.nailartPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              );
            })}
            {menuType === 1 && type2?.map((item:any, idx:any) => {
              return (
                <div
                  key={idx}
                  className="menucontent"
                  onClick={() => onClickNailart(item.nailartSeq)}
                >
                  {item.nailartSeq === selectedMenu ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  <div className="thumbnailurl">
                    <img src={item.nailartThumbnailUrl} alt="" />
                  </div>
                  <div className="nextimg">
                    <div className="nailname">
                      {item.nailartType} - {item.nailartDetailColor}
                    </div>
                    <div className="nailhash">
                      # {item.nailartColor.toUpperCase()} #{" "}
                      {item.nailartWeather}
                    </div>
                    <div className="nailprice">
                      {item.nailartPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              );
            })}{menuType === 2 && type3?.map((item:any, idx:any) => {
              return (
                <div
                  key={idx}
                  className="menucontent"
                  onClick={() => onClickNailart(item.nailartSeq)}
                >
                  {item.nailartSeq === selectedMenu ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  <div className="thumbnailurl">
                    <img src={item.nailartThumbnailUrl} alt="" />
                  </div>
                  <div className="nextimg">
                    <div className="nailname">
                      {item.nailartType} - {item.nailartDetailColor}
                    </div>
                    <div className="nailhash">
                      # {item.nailartColor.toUpperCase()} #{" "}
                      {item.nailartWeather}
                    </div>
                    <div className="nailprice">
                      {item.nailartPrice.toLocaleString()}원
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        <textarea
          placeholder="요청사항을 입력해주세요"
          name=""
          id=""
          spellCheck="false"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <button className="submitbutton" onClick={onClickReservation}>
          예약하기
        </button>
      </FormWrapper>
    </Wrapper>
  );
}
export default CreateReservation;