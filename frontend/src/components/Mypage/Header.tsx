import styled from "styled-components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  overflow: hidden;
  position: relative;
  /* height: 600px; */
  height: 450px;
  border-bottom: 1px solid #d2d2d0;
  .row {
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;
    .line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      border-bottom: 3px solid #3d3c3a;
      margin-top: -30px;
      margin-left: -15px;
    }
  }

  .pageHeaderTitle {
    div {
      font-family: "Playfair Display", serif;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 40px;
    width: 300px;
    margin-left: -150px;
    margin-top: -35px;
    padding-top: 20px;
    line-height: 80px;
    text-align: center;
    color: #3d3c3a;
    font-weight: 600;
  }

  .pageHeaderNavigation {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 10px;
    font-size: 14px;
    color: #bfbfbd;
    .NavElement {
      position: absolute;
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
      bottom: 10px;
      font-size: 14px;
      color: #bfbfbd;
      * {
        margin-right: 15px;
      }

      span {
        margin-top: 0px;
      }
    }
  }
`;

function Header() {
  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="pageHeaderTitle">
            <div className="line"></div>
            <div>MY PAGE</div>
          </div>
          <div className="pageHeaderNavigation">
            <div className="NavElement">
              <span>마이</span>
              <ChevronRightIcon />
              <span>마이페이지</span>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Header;
