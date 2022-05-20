import { useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useQuery } from "react-query";
import { getFollowers } from "../../store/apis/follow";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { convertImgToThumnail } from "../Commons/functions";

const Wrapper = styled.div`
  width: 768px;
  margin: 0 auto;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .Box {
    min-height: 30vh;
  }
  .cards {
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    margin: 20px 0 0 40px;
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 340px;
    height: 150px;
    margin: 10px 20px 30px 0px;
    padding: 20px 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    /* cursor: pointer; */
    /* :hover {
      background-color: #f8f8fa;
    } */
    .cardleft {
      border-right: 1px solid #d2d2d0;
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
      }
    }
    .cardright {
      padding: 0 10px 0 0;
      width: 200px;
      height: 100%;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      .cardright-top {
        padding-left: 20px;
        font-weight: 500;
        .name {
          font-size: 22px;
        }
        .shop {
          color: #717171;
          font-size: 14px;
        }
      }
    }
  }
  .pagination {
    margin: 20px 0;
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

interface IState {
  designer: {
    name: string;
    shop: string;
    imgurl: string;
    follower: number;
  };
}

const FollowingDesigner = () => {
  const { userSeq } = useParams();
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const { data: followersData, isLoading: followersLoading } = useQuery<
    any,
    Error
  >(
    ["followers", page],
    async () => {
      return await getFollowers(Number(userSeq), page, 10);
    },
    {
      onSuccess: (res) => {
        setLastPage(res.totalPages)
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <Wrapper>
      {followersLoading ? (
        <LoadingBox className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </LoadingBox>
      ) : (
        <div className="Box">
          {followersData.totalElements === 0 ? (
            <div>팔로워가 없습니다</div>
          ) : (
            <div className="cards">
              {followersData.content?.map((follower: any, idx: any) => {
                return (
                  <div>
                    <div className="card" key={idx}>
                      <div className="cardleft">
                        <img src={follower.userProfileImg ? convertImgToThumnail(follower.userProfileImg): "/assets/images/default_proflie.png"} alt="" />
                      </div>
                      <div className="cardright">
                        <div className="cardright-top">
                          <div className="name">{follower.userNickname}</div>
                          <div className="shop">{follower.userEmail}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
};
export default FollowingDesigner;
