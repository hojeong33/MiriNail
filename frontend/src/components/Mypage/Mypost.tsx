import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table {
    width: 90%;
    border: 1px solid black;
  }
`

const Label = styled.div`
  
`

const Mypost = () => {
  return (
    <TableWrapper>
    <div className="page-content">

    </div>
    </TableWrapper>
  );
  
}
export default Mypost