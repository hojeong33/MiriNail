import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import { getDesignerNailart } from "../../store/apis/nailart";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Wrapper = styled.div`
  .pagination {
    display: flex;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
  }
`;

const ItemCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  margin: 20px 0 0 40px;
  /* &:last-child {
    margin-right: auto;
  } */
`;

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
      border: 1px solid #d2d2d0;
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
    color: #6e6e6e;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;

interface INailart {
  item: {
    designerSeq: number;
    nailartAvailable: boolean;
    nailartColor: string;
    nailartDesc: string;
    nailartDetailColor: string;
    nailartName: string;
    nailartPrice: number;
    nailartRating: number;
    nailartRegedAt: null | number;
    nailartSeq: number;
    nailartThumbnailUrl: string;
    nailartType: string;
    nailartWeather: string;
    tokenId: number;
  };
}

const NFTs = () => {
  // const [nailarts, setNailarts] = useState<INailart["item"][]>([]);
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const { userSeq } = useParams();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };

  const { data, isLoading } = useQuery<any, Error>(
    ["getDesignerNailart", page],
    async () => {
      return await getDesignerNailart(Number(userSeq), page, 12);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingBox className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </LoadingBox>
      ) : (
        <ItemCards>
          {data.content?.map((item: any, idx: any) => {
            return (
              <ItemCard key={idx}>
                <div className="cardwrapper">
                  <Link to={`/nft/${item.nailartSeq}`}>
                    <img src={item.nailartThumbnailUrl} alt="" />
                  </Link>
                  {/* {item.isfollow ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon color="error" />
                  )} */}
                </div>
                <div className="title">
                  {item.nailartType} - {item.nailartDetailColor}
                </div>
                <div className="price">
                  {item.nailartPrice.toLocaleString()} 원
                </div>
                <div className="category">
                  <span>#{item.nailartWeather} </span>
                </div>
              </ItemCard>
            );
          })}
        </ItemCards>
      )}
      {data?.totalElements === 0 && <div>등록된 네일아트가 없습니다</div>}
      {data?.totalElements !== 0 && (
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={lastPage}
              shape="rounded"
              onChange={onchangePage}
            />
          </Stack>
        </div>
      )}
    </Wrapper>
  );
};
export default NFTs;
