import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getDesignerAsk } from "../../store/apis/qna";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { convertDate, convertQnatypeToText } from "../Commons/functions";
import { getAllApply } from "../../store/apis/authentication";
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
`;



const ApplyList = () => {
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const { data, isLoading } = useQuery<any, Error>(
    ["getApplyList", page],
    async () => {
      return await getAllApply(page, 10);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages);
      },
      onError: (err: any) => console.log(err),
    }
  );



  const onClickAsk = (qnaSeq:number) => {
    navigate(`/designerpage/${userSeq}/askdetail/${qnaSeq}`)
  }

  return (
    <TableWrapper>
      {isLoading ? (
        <div className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </div>
      ) : data.content ? (
        <TableWrapper>
          <div className="table">
            <div className="count">총 {data.totalElements} 건</div>
            <table>
              <colgroup>
                <col width="5%" />
                <col width="10%" />
                <col width="39%" />
                <col width="16%" />
                <col width="16%" />
                <col width="7%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>No</th>
                  <th>신청인</th>
                  <th>네일아트샵명</th>
                  <th>연락처</th>
                  <th>신청일</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.content?.map((apply: any, idx: number) => {
                  return (
                    <tr key={idx}>
                      <th>{apply.designerSeq}</th>
                      <th>{apply.user.userNickname}</th>
                      <th className="title">{apply.designerShopName}</th>
                      <th>{apply.designerTel}</th>
                      <th>
                        {moment(convertDate(apply.designerRegedAt)).format(
                          "YYYY-MM-DD"
                        )}
                      </th>
                      <th>
                        <button>승인</button>
                      </th>
                      <th>
                        <button>거절</button>
                      </th>
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
          <Pagination
            count={lastPage}
            shape="rounded"
            onChange={onchangePage}
          />
        </Stack>
      </div>
    </TableWrapper>
  );
}

export default ApplyList;