import { useState } from "react";
import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    width: 420px;
    height: 200px;
    margin: 10px 40px 30px 20px;
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
        width: 100px;
        height: 100px;
      }
    }
    .cardright {
      padding: 0 10px 0 0;
      width: 220px;
      height: 100%;
      text-align: left;
      .cardright-top {
        padding-left: 15px;
        padding-top: 10px;
        height: 72px;
        border-bottom: 1px solid #d2d2d0;
        font-weight: 500;
        .name {
          font-size: 20px;
        }
        .shop {
          color: #717171;
        }
      }
      .cardright-bottom {
        position: relative;
        padding: 8px 0 0 15px;
        height: 90px;
        div {
          display: flex;
          align-items: center;
        }
        svg {
          width: 10px;
          height: 10px;
          margin-right: 5px;
        }
        button {
          position: absolute;
          left: 15px;
          bottom: 15px;
          padding: 5px 10px;
          color: white;
          background-color: #3d3c3a;
          :hover {
            background-color: #5d5b58;
          }
          :active {
            background-color: #3d3c3a;
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

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event)
    console.log(page)
  }

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
                  <button>언팔로우</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" onChange={onchangePage} />
        </Stack>
      </div>
    </Wrapper>
  );
}
export default FollowingDesigner