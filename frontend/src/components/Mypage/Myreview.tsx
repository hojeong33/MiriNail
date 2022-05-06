import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useQuery } from "react-query";
import { getDesignerReview, getUserReview } from "../../store/apis/review";
import { useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { convertDate } from "../Commons/functions";
import moment from "moment";
import Rating from "@mui/material/Rating";

const TableWrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .nodata {
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
        .title {
          cursor: pointer;
        }
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

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;

const CustomRating = styled(Rating)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

interface IState {
  review: {
    no: number;
    title: string;
    date: string;
  };
}

const MyReview = () => {
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["getReviews", page],
    async () => {
      return await getUserReview(page, 10, Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const cutWordLength = (word: string) => {
    if (!word) return;
    let result = word;
    if (word.length > 15) {
      result = result.slice(0, 10) + "...";
    }
    return result;
  };

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const onClickReview = (nailartSeq: number) => {
    navigate(`/nft/${nailartSeq}`);
  };

  return (
    <TableWrapper>
      {isLoading ? (
        <LoadingBox className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </LoadingBox>
      ) : (
        <div className="table">
          <div className="count">
            총 {data.totalElements ? data.totalElements : "0"} 건
          </div>
          <table>
            <colgroup>
              <col width="5%" />
              <col width="15%" />
              <col width="15%" />
              <col width="40%" />
              <col width="10%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>디자이너</th>
                <th>네일아트명</th>
                <th>내용</th>
                <th>평점</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {data.content?.map((review: any, idx: number) => {
                return (
                  <tr
                    onClick={() => onClickReview(review.nailartSeq)}
                    key={idx}
                  >
                    <th>{review.reviewSeq}</th>
                    <th className="title">{review.designerNickname}</th>
                    <th>
                      {review.nailart.nailartType} -{" "}
                      {review.nailart.nailartDetailColor}
                    </th>
                    <th>{cutWordLength(review.reviewDesc)}</th>
                    <th>
                      {" "}
                      <CustomRating
                        name="read-only"
                        value={review.reviewRating}
                        readOnly
                      />
                    </th>
                    <th>
                      {moment(convertDate(review.reviewRegedAt)).format(
                        "YYYY-MM-DD"
                      )}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.empty && <div className="nodata">작성한 후기가 없습니다</div>}
        </div>
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
};
export default MyReview;
