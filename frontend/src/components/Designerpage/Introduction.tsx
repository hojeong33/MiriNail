import styled from 'styled-components'
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import Map from '../Commons/Map';
import { useRecoilValue } from 'recoil';
import { designerAtom } from '../../store/atoms';
import { Link, useParams } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .updatebutton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
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
  .infobox {
    width: 768px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid #e0e0e0;
    .infocontents {
      margin: 20px;
    }
    .infocontent {
      display: flex;
      .tag {
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        width: 100px;
      }
    }
  }
  .introductionbox {
    display: flex;
    margin-top: 20px;
    width: 768px;
    border: 1px solid #e0e0e0;
    padding: 20px;
    img {
      width: 350px;
      height: 350px;
      margin-left: 20px;
    }
    .content {
      /* padding: 20px; */
    }
  }
`;

interface IState {
  content: {
    imgurl: string;
    content: string;
  }
}

function Introduction() {
  const [content, setContent] = useState<IState["content"]>(
    {
      imgurl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjYw%2FMDAxNjI4NTAwNDU3NjQ2.y6HMk-12DUgv3FSOysuLr0GYz9OdQkSq6-VVPiQmxi8g.NvqUANKYigGgV6v-ysx4GotLQxFl384ExMedS_S_nAkg.JPEG.hery3436%2FIMG_4464.jpg&type=sc960_832",
      content: "dadaism__official\n🐯\n안녕하세요.\n다다이즘입니다 ✋🏻\n\n수많은 조언과 아이디어로\n생각한게\n루미원장 마음대로 !\n\n \"오마카세 아트\"\n\n선보일까 하는데 저렴한 가격으로 할거에오 👼🏻 🤍\n\n너낌은 알아야 하니까 동영상 첨부 해봅니다..!\n\n많관부〰️🖤"
    },
  )
  const {userSeq} = useParams();
  const designer = useRecoilValue(designerAtom)  
  return (
    <Wrapper>
      <Link to={`/designerpage/${userSeq}/updateintroduction`}>
        <button className="updatebutton">
          <CreateIcon />
          소개 수정
        </button>
      </Link>
      <div className="infobox">
        <div className="infocontents">
          <div className="infocontent">
            <div className="tag">샵 이름</div>
            <div className="tagcontent">{designer.name}</div>
          </div>
          <div className="infocontent">
            <div className="tag">연락처</div>
            <div className="tagcontent">{designer.number}</div>
          </div>
          <div className="infocontent">
            <div className="tag">샵 위치</div>
            <div className="tagcontent">{designer.location}</div>
          </div>
          <div className="infocontent">
            <div className="tag">영업시간</div>
            <div className="tagcontent">10:00 ~ 19:00</div>
          </div>
        </div>
        <Map location={designer.location} shopName={designer.name} />
      </div>
      <div className="introductionbox">
        <div className="content">{content.content}</div>
        <img src={content.imgurl} alt="" />
      </div>
    </Wrapper>
  );
}

export default Introduction