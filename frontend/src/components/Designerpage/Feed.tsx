import styled from 'styled-components'
import { useState } from 'react';
import moment from 'moment';



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 768px;
  .dividertop {
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  }
  .feedcontent {
    width: 650px;
    margin: 30px 0;
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
    width: 400px;
    height: 400px;
  }
`

interface IState {
  feed: {
    designerNewsDesc: string;
    designerNewsImgUrl: any[];
    designerNewsRegedAt: any;
    designerNewsSeq: number;
    designerNewsTitle: string;
    designerSeq: number;
  };
}


const Feed:React.FC<IState> = ({ feed }) => {
  
  console.log(feed.designerNewsImgUrl)
  return (
    <Wrapper>
      <div className="dividertop">
        <div>{feed.designerNewsTitle}</div>
        <div>{moment(feed.designerNewsRegedAt).format("YYYY-MM-DD")}</div>
      </div>
      <Divider></Divider>
      {feed.designerNewsImgUrl.length !== 0 && (
        feed.designerNewsImgUrl.map((pic, idx) => {
          return (
            <Picture>
            <img src={pic.designerNewsImgUrl} alt="" />
          </Picture>
          )
        })

      )}

      <div className="feedcontent">{feed.designerNewsDesc}</div>
    </Wrapper>
  );
}

export default Feed