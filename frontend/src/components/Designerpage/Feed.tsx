import styled from 'styled-components'
import { useState } from 'react';



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
    title: string;
    date: string;
    imgurl: string;
    content: string;
  }
}

const Feed:React.FC<IState> = ({ feed }) => {
  

  return (
    <Wrapper>
      <div className="dividertop">
        <div>{feed.title}</div>
        <div>{feed.date}</div>
      </div>
      <Divider></Divider>
      <Picture>{feed.imgurl && <img src={feed.imgurl} alt="" />}</Picture>
      <div className="feedcontent">{feed.content}</div>
    </Wrapper>
  );
}

export default Feed