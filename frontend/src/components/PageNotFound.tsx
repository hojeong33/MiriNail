import styled from "styled-components"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .code {
    font-weight: 600;
    font-size: 80px;
  }
`;

const PageNotFound = () => {
  return (
    <Wrapper>
      <h1 className="code">404</h1>
      <h1>존재하지 않는 페이지입니다.</h1>
    </Wrapper>
  )
}

export default PageNotFound