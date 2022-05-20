import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAskDetail, postAnswer, postDeleteAsk } from "../../store/apis/qna";
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
    img {
      margin-top: 20px;
      width: 250px;
      height: 250px;
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 10px;
      margin-top: 10px;
      padding: 10px 20px;
      color: white;
    }
    .deleteBtn {
      background-color: #f84a4a;
    }
    .editBtn {
      background-color: #2c2c2c;
    }
  }
  .answerbox {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    textarea {
      width: 100%;
      resize: none;
      border: 1px solid #d1d1d1;
      padding: 10px;
      min-height: 150px;
    }
  }
  .answerBtn {
    margin-top: 10px;
    padding: 10px 20px;
    color: white;
    background-color: #2c2c2c;
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
    userNickname: string;
    qnaAnswer: any;
  };
}

const AskDetail = () => {
  const [answer, setAnswer] = useState("")
  const {qnaSeq, userSeq} = useParams()
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery<IData["data"], Error>(
    ["getAsklist"],
    async () => {
      return await getAskDetail(Number(qnaSeq));
    },
    {
      onSuccess: (res) => {
      },
      onError: (err: any) => console.log(err),
    }
  );

  const deleteAsk = useMutation<any, Error>(
    ["deleteAsk"],
    async () => {
      return await postDeleteAsk(Number(qnaSeq));
    },
    {
      onSuccess: (res) => {
        navigate(`/designerpage/${userSeq}/asklist`)
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

  const answerRequest = useMutation<any, Error>(
    ["answerRequest"],
    async () => {
      return await postAnswer(Number(qnaSeq), answer);
    },
    {
      onSuccess: (res) => {
        refetch();
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

  const onClickDeleteBtn = () => {
    deleteAsk.mutate()
  }

  const onClickAnswerBtn = () => {
    answerRequest.mutate()
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
              <th>{data?.userNickname}</th>
              <th>{convertQnatypeToText(data?.qnaType)}</th>
              <th>{data?.qnaTitle}</th>
              <th>{moment(data?.qnaRegedAt).format("YYYY-MM-DD")}</th>
              <th>{data?.qnaIsAnswered ? "답변완료" : "답변대기"}</th>
            </tr>
          </thead>
        </table>
        <div className="box">
          <div className="boxheader">문의내용</div>
          <div>{data?.qnaDesc}</div>
          {data?.qnaImgUrl && <img src={data?.qnaImgUrl} alt="" />}
        </div>
        {data?.qnaIsAnswered && (
          <div className="box">
            <div className="boxheader">답변</div>
            {data?.qnaAnswer.qnaAnswerDesc}
          </div>
        )}
        <div className="buttons">
          {data?.userSeq === Number(sessionStorage.getItem("userSeq")) &&
            !data.qnaIsAnswered && (
              <Link to={`/designerpage/${userSeq}/updateask/${qnaSeq}`}>
                <button className="editBtn">수정</button>
              </Link>
            )}
          {data?.userSeq === Number(sessionStorage.getItem("userSeq")) &&
            !data.qnaIsAnswered && (
              <button className="deleteBtn" onClick={onClickDeleteBtn}>
                삭제
              </button>
            )}
        </div>
        {!data?.qnaIsAnswered &&
          data?.qnaDesignerSeq ===
            Number(sessionStorage.getItem("userSeq")) && (
            <div className="answerbox">
              <textarea
                placeholder="문의답변을 작성해주세요"
                onChange={(e) => setAnswer(e.target.value)}
                name=""
                id=""
                spellCheck="false"
                value={answer}
              ></textarea>
              <button className="answerBtn" onClick={onClickAnswerBtn}>
                답변등록
              </button>
            </div>
          )}
      </Wrapper>
    </Container>
  );
}

export default AskDetail;