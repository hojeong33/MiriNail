import styled from "styled-components";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getLikeNailarts } from "../../store/apis/favorite";
import { TailSpin } from "react-loader-spinner"

const Wrapper = styled.div`
  .pagination {
    display: flex;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
  }
  .loading {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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
      cursor: pointer;
    }
    svg {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
  .category {
    color: #6E6E6E;
  }
`;

interface IState {
  item: {
    title: string;
    price: number;
    category: string[];
    isfollow: boolean;
  };
}

const Like = () => {
  const [items, setItems] = useState<IState["item"][]>([
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"],
      isfollow: true
    },
  ])
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { userSeq } = useParams();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const onClickCard = (nailartSeq:number) => {
    navigate(`/nft/${nailartSeq}`)
  }
  
  const { data, isLoading } = useQuery<any, Error>(
    ["like", page],
    async () => {
      return await getLikeNailarts(Number(userSeq), page, 12);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages)
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <Wrapper>
      {isLoading ? (
        <div className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </div>
      ) : (
        <ItemCards>
          {data.content?.map((item: any, idx: number) => {
            return (
              <ItemCard
                onClick={() => onClickCard(item.nailart.nailartSeq)}
                key={idx}
              >
                <div className="cardwrapper">
                  <img src={item.nailart.nailartThumbnailUrl} alt="" />
                  {/* {item.isfollow ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon color="error" />
                )} */}
                </div>
                <div className="title">
                  {item.nailart.nailartType} - {item.nailart.nailartDetailColor}
                </div>
                <div className="price">
                  {item.nailart.nailartPrice.toLocaleString()}원
                </div>
                <div className="category"># {item.nailart.nailartWeather}</div>
              </ItemCard>
            );
          })}
        </ItemCards>
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
    </Wrapper>
  );
}
export default Like