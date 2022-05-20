import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDesignerAsk } from "../../store/apis/qna";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { convertQnatypeToText } from "../Commons/functions";
import { TailSpin } from "react-loader-spinner"

const TableWrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .count {
    text-align: start;
    padding: 10px;
    font-size: 20px;
    margin: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  .table {
    width: 90%;
    /* border: 1px solid black; */
    table {
      width: 100%;
      border-top: 1px solid #3d3c3a;
      color: #3d3c3a;
      thead {
        font-weight: 500;
        background-color: #f8f8fa;
      }
      th {
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid #d2d2d0;
        padding: 20px 0px;
        font-weight: 500;
      }
      tr {
        cursor: pointer;
        :hover {
          background-color: #f8f8fa;
        }
      }
    }
  }
  .pagination {
    margin: 20px 0;
  }
  .buttons {
    display: flex;
    width: 90%;
    button {
      padding: 5px 20px;
      border: 1px solid #3d3c3a;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .selected {
      background-color: #3d3c3a;
      color: white;
    }
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;

interface IState {
  ask: {
    qnaAnswer: string | null;
    qnaDesc: string;
    qnaDesignerSeq: number;
    qnaImgUrl: string | null;
    qnaIsAnswered: boolean;
    qnaIsPrivated: boolean;
    qnaNailartSeq: number | null;
    qnaRegedAt: string;
    qnaSeq: number;
    qnaTitle: string;
    qnaType: number;
    userNickname: string;
    userSeq: number;
  };
}

const AskList = () => {
  const [qnaType, setQnaType] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["getAsklist", page, qnaType],
    async () => {
      return await getDesignerAsk(page, 10, Number(userSeq), qnaType);
    },
    {
      onSuccess: (res) => {
        setLastPage(res.totalPages);
      },
      onError: (err: any) => console.log(err),
    }
  );



  const onClickAsk = (qnaSeq:number) => {
    navigate(`/designerpage/${userSeq}/askdetail/${qnaSeq}`)
  }

  const onClicktype = (type:number) => {
    setQnaType(type)
    refetch()
  }

  return (
    <TableWrapper>
      <div className="buttons">
        <button
          className={`${qnaType === 0 ? "selected" : ""}`}
          onClick={() => onClicktype(0)}
        >
          예약
        </button>
        <button
          className={`${qnaType === 1 ? "selected" : ""}`}
          onClick={() => onClicktype(1)}
        >
          디자인
        </button>
        <button
          className={`${qnaType === 2 ? "selected" : ""}`}
          onClick={() => onClicktype(2)}
        >
          기타
        </button>
        <button
          className={`${qnaType === 3 ? "selected" : ""}`}
          onClick={() => onClicktype(3)}
        >
          네일아트
        </button>
      </div>
      {isLoading ? (
        <LoadingBox className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </LoadingBox>
      ) : data.content ? (
        <TableWrapper>
          <div className="table">
            <div className="count">총 {data.totalElements} 건</div>
            <table>
              <colgroup>
                <col width="5%" />
                <col width="15%" />
                <col width="10%" />
                <col width="45%" />
                <col width="15%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>작성자</th>
                  <th>문의유형</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>답변상태</th>
                </tr>
              </thead>
              <tbody>
                {data.content?.map((ask: IState["ask"], idx: number) => {
                  return (
                    <tr key={idx} onClick={() => onClickAsk(ask.qnaSeq)}>
                      <th>{ask.qnaSeq}</th>
                      <th>{ask.userNickname}</th>
                      <th>{convertQnatypeToText(ask.qnaType)}</th>
                      <th className="title">{ask.qnaTitle}</th>
                      <th>{moment(ask.qnaRegedAt).format("YYYY-MM-DD")}</th>
                      <th>{ask.qnaIsAnswered ? "완료" : "대기"}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TableWrapper>
      ) : (
        <div>문의가 없습니다.</div>
      )}
      <div className="pagination">
        <Stack spacing={2}>
          {qnaType === 0 && (
            <Pagination
              count={lastPage}
              shape="rounded"
              onChange={onchangePage}
            />
          )}
          {qnaType === 1 && (
            <Pagination
              count={lastPage}
              shape="rounded"
              onChange={onchangePage}
            />
          )}
          {qnaType === 2 && (
            <Pagination
              count={lastPage}
              shape="rounded"
              onChange={onchangePage}
            />
          )}
          {qnaType === 3 && (
            <Pagination
              count={lastPage}
              shape="rounded"
              onChange={onchangePage}
            />
          )}
        </Stack>
      </div>
    </TableWrapper>
  );
}

export default AskList;