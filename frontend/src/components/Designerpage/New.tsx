import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Feed from './Feed';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .createbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 40px;
    border: 1px solid #d2d2d0;
    :hover {
      background-color: #e0e0e0;
    }
    :active {
      background-color: #d2d2d0;
    }
    svg {
      margin-right: 5px;
    }
  }
`;

interface IState {
  feed: {
    title: string;
    date: string;
    imgurl: string;
    content: string;
  }
}

function New() {
  const [feeds, setFeeds] = useState<IState["feed"][]>([
    {
      title: "신상공지",
      date: "2022-04-14",
      imgurl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjYw%2FMDAxNjI4NTAwNDU3NjQ2.y6HMk-12DUgv3FSOysuLr0GYz9OdQkSq6-VVPiQmxi8g.NvqUANKYigGgV6v-ysx4GotLQxFl384ExMedS_S_nAkg.JPEG.hery3436%2FIMG_4464.jpg&type=sc960_832",
      content: "dadaism__official\n🐯\n안녕하세요.\n다다이즘입니다 ✋🏻\n\n수많은 조언과 아이디어로\n생각한게\n루미원장 마음대로 !\n\n \"오마카세 아트\"\n\n선보일까 하는데 저렴한 가격으로 할거에오 👼🏻 🤍\n\n너낌은 알아야 하니까 동영상 첨부 해봅니다..!\n\n많관부〰️🖤"
    },
    {
      title: "휴무공지",
      date: "2022-04-14",
      imgurl: "",
      content: "코로나 이슈로 인해 임시 휴업 하겠습니다 ㅠㅠ"
    }
  ]);

  return (
    <Wrapper>
      <Link to="/designerpage/createfeed">
        <button className="createbutton"><AddIcon />새 소식 작성</button>
      </Link>
      {feeds.map((feed, idx) => {
        return (
          <Feed feed={feed} key={idx}/>
        )
      })}
    </Wrapper>
  )
}

export default New