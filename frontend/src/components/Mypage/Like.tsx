import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ItemCards = styled.div`
  display: flex ;
  flex-wrap: wrap ;
  /* justify-content: center; */
  margin: 20px 0 0 40px;
  /* &:last-child {
    margin-right: auto;
  } */
`

const ItemCard = styled.div`
  height: 300px;
  /* border: 1px solid black; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 15px 30px;
  .cardwrapper {
    width: 230px;
    height: 230px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    svg {
      position: absolute;
      right: 10px;
      top: 190px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
  .category {
    color: #6E6E6E;
  }
`;

const Like = () => {
  return (
    <>
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
    </>
  );
}
export default Like