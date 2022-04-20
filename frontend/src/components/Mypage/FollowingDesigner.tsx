import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    width: 90%;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    margin: 20px 0 0 40px;
  }
  .pagination {
    margin: 20px 0;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  border: 1px solid black;
  margin: 10px 15px 30px;
  .cardtop {
    width: 100%;
    height: 50%;
    background-color: teal;
  }
  .cardbottom {
    width: 100%;
    height: 50%;
    background-color: #7e927d;
    .cardcontent {
      margin-top: -30px;
    }
  }
  img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

interface IState {
  designer: {
    name: string;
    shop: string;
    imgurl: string;
  }
}

const FollowingDesigner = () => {
  const [designers, setDesigners] = useState<IState["designer"][]>([
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
    {
      name: "김다미 디자이너",
      shop: "nailshop1",
      imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800"
    },
  ]);

  return (
    <Wrapper>
      <div className="cards">
        {designers.map((designer, idx) => {
          return (
            <Card>
          <div className="cardtop"></div>
          <div className="cardbottom">
            <div className="cardcontent">
              <img
                src={designer.imgurl}
                alt=""
              />
              <div className="name">{designer.name}</div>
              <div className="shop">{designer.shop}</div>
            </div>
          </div>
        </Card>
          )
        })}
        
      </div>
    </Wrapper>
  );
}
export default FollowingDesigner