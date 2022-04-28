import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyDesignerAsk } from "../../store/apis/qna";
import moment from "moment";
import { convertQnatypeToText } from "../Commons/functions";

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
  // const [asks, setAsks] = useState<IState["ask"][]>([
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  //   {
  //     no: 10,
  //     title: "문의글",
  //     date: "2022.03.28",
  //     answerstate: "답변완료"
  //   },
  // ]);
  const [asks, setAsks] = useState([]);
  const [qnaType, setQnaType] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();
  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const { data, isLoading } = useQuery<any, Error>(
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

  return (
    <TableWrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="table">
          <div className="count">총 {data.totalElements} 건</div>
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
              {data.content.map((ask: IState["ask"], idx: number) => {
                return (
                  <tr key={idx}>
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
        </div>
      )}
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={lastPage} shape="rounded" onChange={onchangePage} />
        </Stack>
      </div>
    </TableWrapper>
  );
  
}
export default MyAsk