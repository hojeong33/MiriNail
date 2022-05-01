import { useState } from "react";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery } from "react-query";
import { getFollowees } from "../../store/apis/follow";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    width: 90%;
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
    width: 450px;
    height: 220px;
    margin: 10px 20px 30px 20px;
    padding: 20px 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    :hover {
      background-color: #f8f8fa;
    }
    .cardleft {
      border-right: 1px solid #d2d2d0;
      width: 180px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        border-radius: 50%;
        width: 110px;
        height: 110px;
      }
    }
    .cardright {
      padding: 0 10px 0 0;
      width: 260px;
      height: 100%;
      text-align: left;
      .cardright-top {
        padding-left: 25px;
        padding-top: 10px;
        /* padding: 10px 0 10px 15px; */
        height: 80px;
        border-bottom: 1px solid #d2d2d0;
        font-weight: 500;
        .name {
          font-size: 22px;
        }
        .shop {
          color: #717171;
        }
      }
      .cardright-bottom {
        position: relative;
        padding: 15px 0 0 25px;
        height: 100px;
        font-size: 18px;
        div {
          display: flex;
          align-items: center;
        }
        svg {
          position: absolute;
          width: 25px;
          height: 25px;
          bottom: 10px;
          right: 10px;
          :hover {
            transform:scale(1.1); 
          }
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
  const { userSeq } = useParams();

  const { data, isLoading } = useQuery<any, Error>(
    ["getFollowee" ],
    async () => {
      return await getFollowees(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <Wrapper>
      <div className="cards">
        {designers.map((designer, idx) => {
          return (
            <div className="card" key={idx}>
              <div className="cardleft">
                <img src={designer.imgurl} alt="" />
              </div>
              <div className="cardright">
                <div className="cardright-top">
                  <div className="name">{designer.name}</div>
                  <div className="shop">{designer.shop}</div>
                </div>
                <div className="cardright-bottom">
                  <div>팔로워 : {designer.follower}명</div>
                  <FavoriteIcon color="error"/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
export default FollowingDesigner