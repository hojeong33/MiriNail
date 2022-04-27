import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Feed from './Feed';
import { Link, useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getNewFeed } from '../../store/apis/designer';

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
  .addFeedBtn {
    margin-top: 30px;
    padding: 6px 15px;
    background-color: #333;
    color: white;
  }
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
}

function New() {
  // const [feeds, setFeeds] = useState<IState["feed"][]>([
  //   {
  //     title: "신상공지",
  //     date: "2022-04-14",
  //     imgurl:
  //       "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjYw%2FMDAxNjI4NTAwNDU3NjQ2.y6HMk-12DUgv3FSOysuLr0GYz9OdQkSq6-VVPiQmxi8g.NvqUANKYigGgV6v-ysx4GotLQxFl384ExMedS_S_nAkg.JPEG.hery3436%2FIMG_4464.jpg&type=sc960_832",
  //     content:
  //       'dadaism__official\n🐯\n안녕하세요.\n다다이즘입니다 ✋🏻\n\n수많은 조언과 아이디어로\n생각한게\n루미원장 마음대로 !\n\n "오마카세 아트"\n\n선보일까 하는데 저렴한 가격으로 할거에오 👼🏻 🤍\n\n너낌은 알아야 하니까 동영상 첨부 해봅니다..!\n\n많관부〰️🖤',
  //   },
  //   {
  //     title: "휴무공지",
  //     date: "2022-04-14",
  //     imgurl: "",
  //     content: "코로나 이슈로 인해 임시 휴업 하겠습니다 ㅠㅠ",
  //   },
  // ]);
  const { userSeq } = useParams();
  const [lastState, setLastState] = useState(false);

  const fetchNewFeed = async ({ pageParam = 1 }) => {
    const response = await getNewFeed({ designerSeq: userSeq, page: pageParam, size: 5 })
    // axios로 받아온 데이터를 다음과 같이 변경! 
    
    return {
      result: response,
      nextPage: pageParam + 1,
      isLast: response.length < 5,
    }
  };

  const query = useInfiniteQuery("[newFeed]", fetchNewFeed, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return null;
    },
    onSuccess: (res) => {
      console.log(res);
      if (res.pages[res.pages.length - 1].isLast) {
        setLastState(true)
      }
    },
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // refetchOnReconnect: true,
    // retry: 1,
  });

  return query.isLoading ? (
    <div>Loading...</div>
  ) : (
    <Wrapper>
      <Link to={`/designerpage/${userSeq}/createfeed`}>
        <button className="createbutton">
          <AddIcon />새 소식 작성
        </button>
      </Link>
      {query.data?.pages.map((feed: any, idx: number) => {
        return feed.result.map((feed: any, idx: any) => {
          return <Feed feed={feed} key={idx} />;
        });
      })}
      {lastState ? (
        <div>불러올 새소식이 없습니다.</div>
      ) : (
        <button className="addFeedBtn" onClick={() => query.fetchNextPage()}>더 보기</button>
      )}
    </Wrapper>
  );
}

export default New;
