import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment'
import axios from "axios";
import { useMutation } from "react-query";
import { postAsk } from "../../store/apis/qna";
import { useNavigate, useParams } from "react-router-dom";

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
        margin-left: 5px;
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
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const onChangeTitle = (e:any) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e:any) => {
    setContent(e.target.value)
  }

  const createAsk = useMutation<any, Error>(
    "createAsk",
    async () => {
      return await postAsk(
        content,
        Number(userSeq),
        title,
        menuType,
        Number(sessionStorage.getItem("userSeq"))
      );
    },
    {
      onSuccess: (res) => {
        console.log(res);
        navigate(`/designerpage/${userSeq}/askdetail/${res.qnaSeq}`);
      },
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
        }
      },
      retry : false,
    }
  );

  const onClickSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    createAsk.mutate();
  }

  return (
    <Wrapper>
      <FormWrapper>
        <div className="timetable">
          <div className="rvtext">1:1 ??????</div>
          <div className="bundle align">
            <div className="kinds">???????????? </div>
            <div className="typebox">
              <div className="type" onClick={() => setMenuType(0)}>
                {menuType === 0 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>??????</button>
              </div>
              <div className="type" onClick={() => setMenuType(1)}>
                {menuType === 1 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>?????????</button>
              </div>
              <div className="type" onClick={() => setMenuType(2)}>
                {menuType === 2 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
                <button>??????</button>
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className="bundle align">
            <div className="kinds">?????? </div>
            <input
              spellCheck="false"
              type="text"
              placeholder="20??? ?????? ??????"
              onChange={onChangeTitle}
              defaultValue={title}
            />
          </div>
          <Divider></Divider>
          <div className="bundle align">
            <div className="kinds">??????</div>
            <div className="content">
              <textarea
                spellCheck="false"
                placeholder="?????? ??????"
                onChange={onChangeContent}
                defaultValue={content}
              ></textarea>
            </div>
          </div>
          <Divider></Divider>
          <div className="help">
            <div>1???1 ?????? ??????</div>
            <div>
              - ??????, ??????, ?????? ??????, ????????????, ???????????? ??????, ????????? ??????
              ???????????? ????????? ???????????????.
            </div>
          </div>
        </div>

        <button className="submitbutton" onClick={onClickSubmit}>????????????</button>
      </FormWrapper>
    </Wrapper>
  );
}
export default CreateAsk;