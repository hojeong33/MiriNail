import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
      
    }
  }
  .pagination {
        margin: 20px 0;
      }
`;


const MyReview = () => {
  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event)
    console.log(page)
  }

  return (
    <TableWrapper>
      <div className="table">
        <div className="count">총 10 건</div>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="70%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
            <tr>
              <th>10</th>
              <th>리뷰</th>
              <th>2022.03.28</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pagination">

      <Stack spacing={2}>
        <Pagination count={10} shape="rounded" onChange={onchangePage}/>
      </Stack>
      </div>
    </TableWrapper>
  );
  
}
export default MyReview