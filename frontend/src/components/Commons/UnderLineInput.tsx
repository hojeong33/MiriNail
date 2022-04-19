// import './UnderLineInput.scss'
import styled from 'styled-components'
import { CirclePicker } from 'react-color'
import {useState,useEffect} from 'react'
const Wrapper = styled.div`
  width:100%;
  
  
  .inputBox{
    display:flex;
    // flex-flow : row wrap;
    width :100%;
    margin-top:40px;
    .inputBoxLeft {
      width :50%;
      .inputs {      
        div {
          margin : 10px;
          margin-left : 0px;
          width:200px;
          display: inline-block;
          .underline {
            border-left-width:0;
            border-right-width:0;
            border-top-width:0;
            border-bottom-width:2px;
            width:100%;
            margin-top :48px;
            
            
            
          }

          input:focus {outline:none;}
        }
    }
    select {
      margin : 10px;
      margin-left : 0px;
      width : 200px;
      border-left-width:0;
      border-right-width:0;
      border-top-width:0;
      border-bottom-width:2px;
      option {
        // color :red;
      }
    }
    select:focus {outline:none;}
    } 
    

    .inputBoxRight {
      width : 50%;
    }
  }
  






`
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

const Input = () => {

  const [color,setColor] = useState('')
  const handleChangeComplete = (col:any,event:any) => {
    setColor(col.hex)
    // console.log(color)
  }

  useEffect(() => {
    console.log(color)
  }, [color])
  return (
    <>
      <Wrapper>
        <div className="inputBox">
          <div className="inputBoxLeft">
            <select name="languages" id="lang">
              <option value="gel">GEL NAIL</option>
              <option value="french">FRENCH NAIL</option>
              <option value="linestone">LINESTONE NANIL</option>
            </select>
            <select name="languages" id="lang">
              <option value="spring">봄</option>
              <option value="summer">여름</option>
              <option value="autumn">가을</option>
              <option value="winter">겨울</option>
            </select>
            <div className="inputs">
              <div>
                <input className="underline" type="text" placeholder='가격' />
              </div>
              <div>
                <input className="underline" type="text" placeholder='세부 색상' />
              </div>
            </div>
          </div>
          <div className="inputBoxRight">
            <div className="colorBox">
              <div>색상 계열 선택</div>
              <CirclePicker 
                colors={["red", "orange", "yellow", "green", "blue", "navy", "purple", "skyblue", "brown", "pink", "gold", "silver"]} 
                circleSpacing={10}
                onChangeComplete={ handleChangeComplete }
                />
            </div>
          </div>
        </div>
      

        
        
      </Wrapper>  
    </>
  )
}

export default Input