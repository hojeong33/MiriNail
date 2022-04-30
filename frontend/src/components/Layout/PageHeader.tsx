
import styled from 'styled-components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { nftFilter } from '../../store/atoms';
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
      font-weight: 500;
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
      .NavElement {
        position: absolute;
        width: 100%;
        height: 30px;
        bottom: 10px;
        font-size: 14px;
        color: #bfbfbd;
        margin-left:10px;
        .NavElement {
            position: absolute;
            width: 100%;
            height: 30px;
            bottom: 10px;
            font-size: 14px;
            color: #bfbfbd;
            * {
              margin-right:15px;
            }

            span {
              margin-top : 0px;
          
            }
            
            svg {
              top: 20%;
            }
            

          }

        span {
          margin-top: 0px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {

    height :250px;
    .row {
      height: 100%;
    
      .pageHeaderTitle {
        font-size: 28px;
        top: 50%;
        line-height: 50px;
      }

      .pageHeaderLinks {
        position: absolute;
        top: 35%;
        // left: 20%;
        // margin : 0 auto;
        // transform: translateY(-50%);
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
        display:none;
      }
    }

  }
`;

function PageHeader({setType}:any) {
  const resetFilter = useResetRecoilState(nftFilter)
  const [colorFilter,setColorFilter] = useRecoilState(nftFilter)

  

  return (
    <>
    <Wrapper>
      <div className="row">
        <div className="pageHeaderTitle" >
          SHOPPING
        </div>
        <div className="pageHeaderLinks">
          <span onClick={() => {setType(true); resetFilter()}}>
            타입별
          </span>
          <span onClick={() => {setType(false); resetFilter(); setColorFilter({
            category : "color",
            color : "",
            type : "",
            sort : "",
            page : 1,
            size : 12,
          },)}}>
            색상별
          </span>
        </div>
        <div className="pageHeaderNavigation">
          <div className="NavElement">
            <span>제품</span>
            <ChevronRightIcon />
            <span>LINE UP</span>
          </div>
        </div>
      </div>
    </Wrapper>
    </>
  )
}

export default PageHeader