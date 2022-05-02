import styled from "styled-components";
import { useState } from "react";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMutation } from "react-query";
import { deleteFeed } from "../../store/apis/designer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 768px;
  margin-top: 20px;
  .dividertop {
    padding: 5px;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    background-color: #f8f8fa;
    border-bottom: 1px solid black;
    margin-bottom: 30px;
    .title {
      font-weight: 600;
      margin-left: 10px;
    }
    .date {
      font-weight: 500;
      margin-right: 5px;
    }
  }
  .feedcontent {
    width: 650px;
    margin: 30px 0;
  }
  .buttons {
    position: absolute;
    margin-top: 85px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    button {
      margin-left: 10px;
      padding: 6px 15px;
      color: white;
    }
    .deleteBtn {
      background-color: #f84a4a;
    }
  }
`;

const Divider = styled.div`
  margin: 5px auto 35px;
  width: 100%;
  border-bottom: 1px solid #222;
  font-weight: 500;
`;

const Picture = styled.div`
  img {
    width: 300px;
    height: 300px;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
  }
  .slick-track {
    display: flex;
  }
  width: 300px;
`;

interface IState {
  feed: {
    designerNewsDesc: string;
    designerNewsImgUrl: any[];
    designerNewsRegedAt: any;
    designerNewsSeq: number;
    designerNewsTitle: string;
    designerSeq: number;
  };
  refetch: any;
}

const Feed: React.FC<IState> = ({ feed, refetch }) => {
  // console.log(feed.designerNewsImgUrl);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };
 

  const onClickDelete = async (designerNewsSeq:number) => {
    try {
      const res = await deleteFeed(designerNewsSeq);
      console.log(res)
      refetch();
    } catch (error) {
      alert("삭제중 에러발생")
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <div className="dividertop">
        <div className="title">{feed.designerNewsTitle}</div>
        <div className="date">{moment(feed.designerNewsRegedAt).format("YYYY-MM-DD")}</div>
      </div>
      <div className="buttons">
        <button className="deleteBtn" onClick={() => onClickDelete(feed.designerNewsSeq)}>삭제</button>
      </div>
      {feed.designerNewsImgUrl.length !== 0 && (
        <StyledSlider {...settings}>
          {feed.designerNewsImgUrl.map((pic, idx) => {
            return (
              <Picture key={idx}>
                <img src={pic.designerNewsImgUrl} alt="" />
              </Picture>
            );
          })}
        </StyledSlider>
      )}
      <div className="feedcontent">{feed.designerNewsDesc}</div>
    </Wrapper>
  );
};

export default Feed;
