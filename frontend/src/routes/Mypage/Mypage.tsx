import styled from "styled-components"
import Header from "../../components/Mypage/Header"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const HeaderBox = styled.div`
  position: relative;
`
const PathText = styled.div`
  position: absolute;
  margin-top: -30px;
  margin-left: 20px;
`

const Body = styled.div`
  /* min-width: 1280px; */
  display: flex;
  justify-content: flex-start;
`

const Sidebar = styled.div`
  /* background-color: teal; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 400px;
  height: 100vh;
  border-right: 1px solid black;
  .tabwrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 50px 0 0 40px;
    .historytext {
      display: flex;
      align-items: center;
      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
`

const Main = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
`
const ItemCards = styled.div`
  display: flex ;
  flex-wrap: wrap ;
  justify-content: center;
  margin: 20px;
  &:last-child {
    margin-right: auto;
  }
`

const ItemCard = styled.div`
  height: 300px;
  border: 1px solid black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  .cardwrapper {
    width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    svg {
      position: absolute;
      right: 10px;
      top: 195px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
`;

const Mypage = () => {
  return (
    <Wrapper>
      <HeaderBox>
        <Header title="MY PAGE" />
        <PathText>마이페이지</PathText>
      </HeaderBox>
      <Body>
        <Sidebar>
          <div className="tabwrapper">
            <button className="historytext">
              HISTORY <KeyboardArrowDownIcon />
            </button>
            <button>팔로우한 디자이너</button>
            <button>나의 예약</button>
          </div>
        </Sidebar>
        <Main>
          <ItemCards>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
            <ItemCard>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <FavoriteIcon color="error" />
              </div>
              <div className="title">글레이즈 - 루비 레드</div>
              <div className="price">50,000원</div>
              <div className="category">#겨울 #Designer1</div>
            </ItemCard>
          </ItemCards>
        </Main>
      </Body>
    </Wrapper>
  );
}

export default Mypage