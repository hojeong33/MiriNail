import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyDesignerAsk } from "../../store/apis/qna";
import moment from "moment";
import { convertQnatypeToText } from "../Commons/functions";
import { TailSpin } from "react-loader-spinner"

const TableWrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .noask {
      border: none;
      padding: 10px 0;
    }
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
      tbody {
        tr {
        cursor: pointer;
        :hover {
          background-color: #f8f8fa;
        }
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

const MyAsk = () => {
  const [asks, setAsks] = useState([]);
  const [qnaType, setQnaType] = useState(0);
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();
  const navigate = useNavigate()
  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["getAsklist", page, qnaType],
    async () => {
      return await getMyDesignerAsk(page, 10, Number(userSeq), qnaType);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages);
        setAsks(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const onClickAsk = (qnaSeq:number, designerSeq:number) => {
    navigate(`/designerpage/${designerSeq}/askdetail/${qnaSeq}`)
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
      </div>
      {isLoading ? (
        <div className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </div>
      ) : (
        <div className="table">
          <div className="count">총 {data.totalElements ? data.totalElements : 0} 건</div>
          <table>
            <colgroup>
              <col width="5%" />
              <col width="10%" />
              <col width="55%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>문의유형</th>
                <th>제목</th>
                <th>작성일</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              {data.content?.map((ask: IState["ask"], idx: number) => {
                return (
                  <tr
                    key={idx}
                    onClick={() => onClickAsk(ask.qnaSeq, ask.qnaDesignerSeq)}
                  >
                    <th>{ask.qnaSeq}</th>
                    <th>{convertQnatypeToText(ask.qnaType)}</th>
                    <th className="title">{ask.qnaTitle}</th>
                    <th>{moment(ask.qnaRegedAt).format("YYYY-MM-DD")}</th>
                    <th>{ask.qnaIsAnswered ? "완료" : "대기"}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
              {!data.content && <div className="noask">문의 내역이 없습니다</div>}
        </div>
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
        </Stack>
      </div>
    </TableWrapper>
  );
  
}
export default MyAsk