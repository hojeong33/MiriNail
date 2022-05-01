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
  .nonews {
    margin-top: 20px;
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
          return <Feed feed={feed} key={idx} refetch={query.refetch}/>;
        });
      })}
      {lastState ? (
        <div className="nonews">불러올 새소식이 없습니다.</div>
      ) : (
        <button className="addFeedBtn" onClick={() => query.fetchNextPage()}>더 보기</button>
      )}
    </Wrapper>
  );
}

export default New;
