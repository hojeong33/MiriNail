import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAskDetail, postDeleteAsk, putAsk } from "../../store/apis/qna";
import { convertQnatypeToText } from "../Commons/functions";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 768px;
  .dividertop {
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  }
  .feedcontent {
    width: 650px;
    margin: 30px 0;
  }
  table {
    width: 100%;
    color: #3d3c3a;
    thead {
      font-weight: 500;
      background-color: #f8f8fa;
    }
    th {
      font-size: 14px;
      text-align: center;
      border-bottom: 1px solid #222;
      padding: 10px 0px;
      font-weight: 500;
    }
  }
  .box {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #d1d1d1;
    padding: 20px;
    text-align: left;
    white-space: pre-wrap;
    .boxheader {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 5px;
    }
    textarea {
      width: 100%;
      resize: none;
      height: 200px;
      padding: 5px;
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 10px;
      margin-top: 10px;
      padding: 10px 30px;
      color: white;
    }
    .editBtn {
      background-color: #2c2c2c;
    }
  }
`;


interface IData {
  data: {
    qnaDesc: string;
    qnaDesignerSeq: number;
    qnaImgUrl: null | string;
    qnaIsAnswered: boolean;
    qnaIsPrivated: boolean;
    qnaNailartSeq: null | number;
    qnaRegedAt: string;
    qnaSeq: number;
    qnaTitle: string;
    qnaType: number;
    userSeq: number;
  };
}

const UpdateAsk = () => {
  const {qnaSeq, userSeq} = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate();
  console.log(qnaSeq)

  const { data, isLoading } = useQuery<IData["data"], Error>(
    ["getAsklist"],
    async () => {
      return await getAskDetail(Number(qnaSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setTitle(res.qnaTitle)
        setContent(res.qnaDesc)
      },
      onError: (err: any) => console.log(err),
    }
  );

  const updateAsk = useMutation<any, Error>(
    ["updateAsk"],
    async () => {
      return await putAsk(content, Number(qnaSeq), title);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        navigate(`/designerpage/${userSeq}/asklist`)
      },
      onError: (err: any) => {
        console.log(err)
        if (err.response.status === 401) { 
          navigate("https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect")
        }
      },
    }
  );

 

  const onChangeContent = (e:any) => {
    setContent(e.target.value)
  }

  const onChangeTitle = (e:any) => {
    setTitle(e.target.value)
  }

  const onClickUpdateBtn = () => {
    updateAsk.mutate()
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <Wrapper>
        <table>
          <colgroup>
            <col width="8%" />
            <col width="10%" />
            <col width="8%" />
            <col width="49%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>No.{data?.qnaSeq}</th>
              <th>장영남</th>
              <th>{convertQnatypeToText(data?.qnaType)}</th>
              <th>
                <input
                  type="text"
                  style={{ padding: "2px", width: "300px" }}
                  defaultValue={title}
                  spellCheck="false"
                  onChange={onChangeTitle}
                />
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
        <div className="box">
          <div className="boxheader">문의내용</div>
          <textarea
            name=""
            id=""
            spellCheck="false"
            defaultValue={content}
            onChange={onChangeContent}
          ></textarea>
        </div>
        <div className="buttons">
          <button className="editBtn" onClick={onClickUpdateBtn}>수정완료</button>
        </div>
      </Wrapper>
    </Container>
  );
}

export default UpdateAsk;