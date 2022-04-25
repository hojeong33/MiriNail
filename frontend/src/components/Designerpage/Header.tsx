
import styled from 'styled-components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { designer } from '../../routes/Designerpage/Designerpage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

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

  .pageHeader {
    .designername {
      font-family: "Playfair Display", serif;
      font-weight: 600;
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
    margin-top: -90px;
    padding-top: 20px;
    line-height: 80px;
    text-align: center;
    color: #3d3c3a;
    font-weight: 500;
    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    .buttons {
      display: flex;
      font-size: 16px;
      margin-top: 10px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 40px;
        border: 1px solid #d2d2d0;
        svg {
          margin-right: 5px;
        }
        :hover {
          background-color: #e0e0e0;
        }
        :active {
          background-color: #d2d2d0;
        }
      }
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

interface IProps {
    designer?: designer;
}

const Header:React.FC<IProps> = ({designer}) => {
  

  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="pageHeader">
            <img src={designer?.imgurl} alt="" />
            <div className="designername">{designer?.name}</div>
            <div className="buttons">
              <Link to="createask">
                <button>1:1 문의하기</button>
              </Link>
              <Link to="reservation">
                <button>
                  <CalendarMonthIcon />
                  예약하기
                </button>
              </Link>
              {designer?.isfollow ? (
                <button>
                  <FavoriteIcon color="error" />
                  언팔로우
                </button>
              ) : (
                <button>
                  <FavoriteBorderIcon color="error" />
                  팔로우
                </button>
              )}
            </div>
          </div>
          <div className="pageHeaderNavigation">
            <div className="NavElement">
              <span>DESIGNER</span>
              <ChevronRightIcon />
              <span>디자이너페이지</span>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default Header