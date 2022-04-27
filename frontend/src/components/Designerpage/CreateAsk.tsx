import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment'
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;


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
      .content {
        font-size: 18px;
      }
    }
    .align {
      align-items: center;
    }
  }
  .typebox {
    display: flex;
    .type {
      margin-right: 20px;
      cursor: pointer;
      button {
        margin-left: 10px;
      }
    }
  }

  .menu {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #d1d1d1;
    padding: 20px;
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
    width: 500px;
    height: 200px;
    border: 1px solid lightgray;
    padding: 10px;
    overflow-y: scroll;
  }
  input {
    border: 1px solid lightgray;
    width: 500px;
    padding: 10px;
  }
  .help {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    div {
      margin: 2px 15px;
    }
  }
`;

const Divider = styled.div`
  margin: 20px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

const CreateAsk = () => {
  const [menuType, setMenuType] = useState<number>(0);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const onChangeTitle = (e:any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e:any) => {
    setContent(e.target.value)
  }

  const onClickSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("qnaDesc", "수정한내용")
    formData.append("qnaDesignerSeq", "3")
    formData.append("qnaTitle", "수정한 제목")
    try {
      const data = {

      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          processData: false,
          contentType: false,
        },
      };
      const response = await axios.post("http://localhost:8080/api/qna", formData, config)
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <FormWrapper>
        <div className="timetable">
          <div className="rvtext">1:1 문의</div>
          <div className="bundle align">
            <div className="kinds">문의유형 </div>
            <div className="typebox">
              <div className="type" onClick={() => setMenuType(0)}>
                {menuType === 0 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>예약</button>
              </div>
              <div className="type" onClick={() => setMenuType(1)}>
                {menuType === 1 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>디자인</button>
              </div>
              <div className="type" onClick={() => setMenuType(2)}>
                {menuType === 2 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>기타</button>
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className="bundle align">
            <div className="kinds">제목 </div>
            <input
              spellCheck="false"
              type="text"
              placeholder="20자 이내 입력"
              onChange={onChangeTitle}
              defaultValue={title}
            />
          </div>
          <Divider></Divider>
          <div className="bundle align">
            <div className="kinds">내용</div>
            <div className="content">
              <textarea
                spellCheck="false"
                placeholder="내용 입력"
                onChange={onChangeContent}
                defaultValue={content}
              ></textarea>
            </div>
          </div>
          <Divider></Divider>
          <div className="help">
            <div>1대1 문의 안내</div>
            <div>
              - 욕석, 비방, 분쟁 유발, 명예훼손, 허위사실 유포, 광고성 등의
              부적절한 문의는 금지합니다.
            </div>
          </div>
        </div>

        <button className="submitbutton" onClick={onClickSubmit}>작성하기</button>
      </FormWrapper>
    </Wrapper>
  );
}
export default CreateAsk;