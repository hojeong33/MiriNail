// import "./UnderLineInput.scss";
import styled from "styled-components";
import { CirclePicker } from "react-color";
import { useState, useEffect } from "react";
const Wrapper = styled.div`
  width: 100%;

  .inputBox {
    display: flex;
    // flex-flow : row wrap;
    width: 100%;
    margin-top: 40px;
    .inputBoxLeft {
      width: 45%;
      .inputs {
        div {
          margin: 10px;
          margin-left: 0px;
          width: 200px;
          display: inline-block;
          .underline {
            border-left-width: 0;
            border-right-width: 0;
            border-top-width: 0;
            border-bottom-width: 2px;
            width: 100%;
            margin-top: 48px;
          }

          input:focus {
            outline: none;
          }
        }
      }
      select {
        color: gray;
        margin: 10px;
        margin-left: 0px;
        width: 200px;
        border-left-width: 0;
        border-right-width: 0;
        border-top-width: 0;
        border-bottom-width: 2px;
        option {
          color: black;
        }
      }
      select:focus {
        outline: none;
      }
    }

    .inputBoxRight {
      margin-top: 10px;
      margin-left: 40px;
      width: 55%;
      display: flex;
      .colorBoxLeft {
      }
      .colorBoxRight {
        margin-left: 20px;
        .currentColor {
          background-color: #f3f3f3;
          height: 80px;
          width: 80px;
        }
      }
    }
  }
`;
//색깔 이름 변환
// if (color === '#ff0000') {
//   color = 'red'
// } else if (color === '#ffa500') {
//   color = 'orange'
// } else if (color === '#ffff00') {
//   color = 'yellow'
// } else if (color === '#008000') {
//   color = 'green'
// } else if (color === '#0000ff') {
//   color = 'blue'
// } else if (color === '#000080') {
//   color = 'navy'
// } else if (color === '#800080') {
//   color = 'purple'
// } else if (color === '#87ceeb') {
//   color = 'skyblue'
// } else if (color === '#a52a2a') {
//   color = 'brown'
// } else if (color === '#ffc0cb') {
//   color = 'pink'
// } else if (color === 'ffd700') {
//   color = 'gold'
// } else if (color === 'c0c0c0') {
//   color = 'silver'
// }

// interface propsType {
//   setInfoProcess() : any;
// }

const Input = (props: any) => {
  console.log(props);

  // 색깔 선택
  const [color,setColor] = useState('')
  const handleChangeComplete = (col:any,event:any) => {
    
  let colorName = ''
  if (col.hex === '#ff0000') {
    colorName = 'red'
  } else if (col.hex === '#ffa500') {
    colorName = 'orange'
  } else if (col.hex === '#ffff00') {
    colorName = 'yellow'
  } else if (col.hex === '#008000') {
    colorName = 'green'
  } else if (col.hex === '#0000ff') {
    colorName = 'blue'
  } else if (col.hex === '#000080') {
    colorName = 'navy'
  } else if (col.hex === '#800080') {
    colorName = 'purple'
  } else if (col.hex === '#87ceeb') {
    colorName = 'skyblue'
  } else if (col.hex === '#a52a2a') {
    colorName = 'brown'
  } else if (col.hex === '#ffc0cb') {
    colorName = 'pink'
  } else if (col.hex === '#ffd700') {
    colorName = 'gold'
  } else if (col.hex === '#c0c0c0') {
    colorName = 'silver'
  }
    setColor(colorName)
    setInputStatus({
      ...inputStatus, colorType : colorName
    })
  }
  useEffect(() => {
    console.log(color)
  }, [color])
  
  

  let colorName = "";
  if (color === "#ff0000") {
    colorName = "red";
  } else if (color === "#ffa500") {
    colorName = "orange";
  } else if (color === "#ffff00") {
    colorName = "yellow";
  } else if (color === "#008000") {
    colorName = "green";
  } else if (color === "#0000ff") {
    colorName = "blue";
  } else if (color === "#000080") {
    colorName = "navy";
  } else if (color === "#800080") {
    colorName = "purple";
  } else if (color === "#87ceeb") {
    colorName = "skyblue";
  } else if (color === "#a52a2a") {
    colorName = "brown";
  } else if (color === "#ffc0cb") {
    colorName = "pink";
  } else if (color === "#ffd700") {
    colorName = "gold";
  } else if (color === "#c0c0c0") {
    colorName = "silver";
  }

  // 인풋 상태 관리
  const [inputStatus, setInputStatus] = useState({
    type : '',
    season : '',
    price : '',
    colorType : '',
    detailColor : '',
  })

  const onChangeInput = (e: any) => {
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // let test = 0
    // if (inputStatus.type != '') {
    //   test += 1
    // }
    // if (inputStatus.season != '') {
    //   test += 1
    // }
    // if (inputStatus.price != '') {
    //   test += 1
    // }
    // if (inputStatus.detailColor != '') {
    //   test += 1
    // } 
    props.setInfoProcess(inputStatus)
  }, [inputStatus])

  useEffect(() => {
    console.log(inputStatus);
  }, [inputStatus]);

  return (
    <>
      <Wrapper>
        <div className="inputBox">
          <div className="inputBoxLeft">
            <select name="type" id="lang" onChange={onChangeInput}>
              <option value="">타입 선택</option>
              <option value="gel">GEL NAIL</option>
              <option value="french">FRENCH NAIL</option>
              <option value="linestone">LINESTONE NANIL</option>
            </select>
            <select
              name="season"
              id="lang"
              style={{ marginLeft: "20px" }}
              onChange={onChangeInput}
            >
              <option value="">계절 선택</option>
              <option value="spring">봄</option>
              <option value="summer">여름</option>
              <option value="autumn">가을</option>
              <option value="winter">겨울</option>
            </select>
            <div className="inputs">
              <div>
                <input
                  name="price"
                  className="underline"
                  type="text"
                  placeholder="가격"
                  onChange={onChangeInput}
                />
              </div>
              <div>
                <input
                  name="detailColor"
                  className="underline"
                  type="text"
                  placeholder="세부 색상"
                  style={{ marginLeft: "20px" }}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>
          <div className="inputBoxRight">
            <div className="colorBoxLeft">
              <div style={{ marginBottom: "30px" }}>색상 계열 선택</div>
              <CirclePicker
                colors={[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "navy",
                  "purple",
                  "skyblue",
                  "brown",
                  "pink",
                  "gold",
                  "silver",
                ]}
                circleSpacing={10}
                onChangeComplete={handleChangeComplete}
              />
            </div>
            <div className="colorBoxRight">
              <div style={{marginBottom:"20px"}}>선택 색상({color.toUpperCase()})</div>
              <div className="currentColor" style={{backgroundColor:`${color}`}}></div>

            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Input;