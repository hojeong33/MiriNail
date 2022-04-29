import { useState } from "react";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery } from "react-query";
import { getFollowers } from "../../store/apis/follow";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 768px;
  margin: 0 auto;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;

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
    margin: 10px 20px 30px 20px;
    padding: 20px 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    :hover {
      background-color: #f8f8fa;
    }
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

interface IState {
  designer: {
    name: string;
    shop: string;
    imgurl: string;
    follower: number;
  }
}

const FollowingDesigner = () => {
  const [designers, setDesigners] = useState<IState["designer"][]>([
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12,
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
      follower: 12
    },
  ]);
  const {userSeq} = useParams();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event)
    console.log(page)
  }

  const { data:followersData, isLoading:followersLoading } = useQuery<any, Error>(
    ["followers"],
    async () => {
      return await getFollowers(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <Wrapper>
      <div className="cards">
        {followersData.map((follower:any, idx:any) => {
          return (
            <Link to={`/mypage/${follower.userSeq}`}>
            <div className="card" key={idx}>
              <div className="cardleft">
                <img src={follower.userProfileImg} alt="" />
              </div>
              <div className="cardright">
                <div className="cardright-top">
                  <div className="name">{follower.userNickname}</div>
                  <div className="shop">{follower.userEmail}</div>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
}
export default FollowingDesigner