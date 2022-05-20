
import styled from 'styled-components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';

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
  }

  .pageHeaderTitle {
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
    font-family: "Playfair Display", serif;
    ::before {
      content: "";
      margin: 0 auto;
      display: block;
      width: 30px;
      height: 3px;
      background: #3d3c3a;
    }
  }

  .pageHeaderLinks {
    position: absolute;
    top: 50%;
    left: 0;
    font-size: 18px;
    width: 100%;
    margin-top: 100px;
    text-align: center;
    color: #3d3c3a;

    span {
      padding: 0px 25px;
      cursor: pointer;
    }
  }

  .pageHeaderNavigation {
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 10px;
    font-size: 14px;
    color: #bfbfbd;
    margin-left: 10px;
    .NavElement {
      position: absolute;
      width: 100%;
      height: 30px;
      // bottom: 10px;
      font-size: 14px;
      color: #bfbfbd;
      * {
        margin-right: 15px;
      }

      span {
        margin-top: 0px;
      }

      svg {
        top: 0%;
      }
    }
  }
`;

function PageHeader({changeThema,changeAll}:any) {
  const [flag,setFlag] = useState(true)

  return (
    <>
    <Wrapper>
      <div className="row">
        <div className="pageHeaderTitle">
          DESIGNER
        </div>
        <div className="pageHeaderLinks">
          <span onClick={() => {changeThema(); setFlag(true)}} style={flag ? {color:"black"} : {color:"gray"}}>
            테마보기
          </span>
          <span onClick={() => {changeAll(); setFlag(false)}} style={flag ? {color:"gray"} : {color:"black"}}>
            전체보기
          </span>
        </div>
        <div className="pageHeaderNavigation">
          <div className="NavElement">
            <span>디자이너</span>
            <ChevronRightIcon />
            {flag ? <span>테마보기</span> : <span>전체보기</span>}
          </div>
        </div>
      </div>
    </Wrapper>
    </>
  )
}

export default PageHeader