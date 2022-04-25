import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';
import ProgressBar from './ProgressBar';
import {useState} from 'react'
import BasicModal from './Modal';
// import { Modals } from '@mui/material';
// import Popup from './Modals'
import Collapse from './Collapse'



const Wrapper = styled.div`

  .review {
    font-size:40px;
    border-bottom :3px solid black;
    padding-bottom : 5px;  
  }
  .reviewTotal {
    display: flex;
    
    .reviewLeft {
      width : 30%;
      border-right : 1px solid #e3e3e3;
      margin-top:24px;
      .reviewLeftUp {
        display: flex;
        margin-left: 30%;
        .iconBox {
          font-size :100px;
          line-height:75px;
          
          svg {
            font-size:60px;
            color:#F8E71C;
          }
        }

        .score {
          line-height:95px;
          font-size : 45px;
          margin-left : 15px;
        }
      }

      .btn {  
        margin-top: 24px;
        width: 158px;
        // height: 44px;
        border-radius: 4px;
        background-color: #14161a;
        font-size: 14px;
        font-weight: bold;
        // line-height: 44px;
        text-align: center;
        color: #ffffff;
        // line-height : 26px;
        margin-left:30%;
      }
    }

    .reviewRight {
      width : 70%;
      .progressSet {
        width:85%;
        display:flex;
        margin:25px;
        margin-left:7%;
      }
    }
  }

  .reviewList {
    // position:relative
    .reviewFilter {
      padding-top : 20px;
      padding-bottom : 20px;
      margin-top:20px;
      border-top : 1px solid #e4e4e4;
      border-bottom : 1px solid #e4e4e4;
      display:flex;
    }
    
    .test{

      .reviewBox{
        margin-top:24px;
        display: flex;
        min-height : 300px;
    
        .reviewBoxLeft {
          width : 75%;
          height:100%;
          align-items:center;

        }
        .reviewBoxRight {
          border-left : 1px solid #e4e4e4;
          width : 25%;
          height:100%;
          .userId {
            margin-left:20px;
          }
        }
      }
   }
  }
  
`

interface Iprops {
  mStatus : boolean
}

const DesignReview = () => {
  const [sibal,setSibal] = useState(['가나다라',123,'이씨이이ㅣ바라라라ㅏㄹ'])
  const [dummy,setDummy] = useState([
    {
      rating : 1,
      replyContent : '답변 내용입니다. 나중에 엔터처리 추가해주세요.',
      userId : '회원 아이디입니다. 끝부분은 별표로 처리해주세요.',
      image : "https://kouve.kr/web/product/small/202203/fd9264794a352a353b844ff75c9455c8.jpg",
      reviewReplyList : [
        {
          content : '저도 사용해봤는데 너무 깔끔하고 좋은 것 같아요. 추천드립니다.',
          userId : '@rhkrehd6169',
          date : '2020-02-02'
        },
        {
          content : '이렇게 좋은 디자인이 있었나요?? 저도 내일 당장 네일샵 방문해보고 싶어졌네요. 그리고 두줄 되면 어떻게 되는지도 좀 확인해 보고 싶어졌습니다. 알겠습니까ㅣ?',
          userId : '@userId123',
          date : '2020-02-02'
        },
        {
          content : '짧은 댓글 확인한번 해봐야겠네',
          userId : '@testuserId7913',
          date : '2020-02-02'
        },
        
      ]
    },
    {
      rating : 2,
      replyContent : '답변 내용입니다. 나중에 엔터처리 추가해주세요.',
      userId : '회원 아이디입니다. 끝부분은 별표로 처리해주세요.',
      image : "https://kouve.kr/web/product/small/202203/fd9264794a352a353b844ff75c9455c8.jpg",
      reviewReplyList : [
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        
      ]
    },
    {
      rating : 3,
      replyContent : '답변 내용입니다. 나중에 엔터처리 추가해주세요.',
      userId : '회원 아이디입니다. 끝부분은 별표로 처리해주세요.',
      image : "https://kouve.kr/web/product/small/202203/fd9264794a352a353b844ff75c9455c8.jpg",
      reviewReplyList : [
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        
      ]
    },
    {
      rating : 4,
      replyContent : '답변 내용입니다. 나중에 엔터처리 추가해주세요.',
      userId : '회원 아이디입니다. 끝부분은 별표로 처리해주세요.',
      image : "https://kouve.kr/web/product/small/202203/fd9264794a352a353b844ff75c9455c8.jpg",
      reviewReplyList : [
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        {
          content : '댓글1 입니다.',
          userId : '댓글유저 아이디',
          date : '2020-02-02'
        },
        
      ]
    },
  ])

  const [dummy2,setDummy2] = useState({
    best : 47,
    good : 4,
    soso : 5,
    bad : 6,
    worst : 20
  })
  const highestBarVote = Math.max(dummy2.best,dummy2.good,dummy2.soso,dummy2.bad,dummy2.worst)
  const ratingCal = (rate:number) => {
      const array2 = []; 
      for (let i=0; i <rate; i++) {
        array2.push(<StarIcon style={{color:"#F8E71C"}} />)
      }
      return array2
    
  }

  // 모달

  
  
  
  

  return (
    <Wrapper>
      
      {/* 리뷰 부분 ( 작성, 프로그레스바) */}
      <div className='review'>REVIEW (47)</div>
      <div className='reviewTotal'>
        <div className='reviewLeft'>
          <div className="reviewLeftUp">
            <div className="iconBox">
              <StarIcon />
            </div>
            <div className="score">
              5.0
            </div>
            
          </div>
          
          <div style={{textAlign:"center"}}>
            '100'%의 유저가 이 디자인을 좋아합니다.
          </div>
          
          <BasicModal />
          
          
        </div>
        
        <div className='reviewRight'>
          {/* 100%의 구매자가 이 상품을 좋아합니다.sadasd */}
          <div className="progressSet">
            <span style={{marginRight:"25px",width:"15%"}}>아주 좋아요</span>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.best} barWidth={highestBarVote}  />
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.best}</span>
          </div>
          <div className="progressSet">
            <span style={{marginRight:"25px",width:"15%"}}>맘에 들어요</span>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.good} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.good}</span>
          </div>
          <div className="progressSet">
            <span style={{marginRight:"25px",width:"15%"}}>보통이에요</span>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.soso} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.soso}</span>
          </div>
          <div className="progressSet">
            <span style={{marginRight:"25px",width:"15%"}}>그냥 그래요</span>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.bad} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.bad}</span>
          </div>
          <div className="progressSet">
            <span style={{marginRight:"25px",width:"15%"}}>별로에요</span>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.worst} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.worst}</span>
          </div>
        </div>
      </div>

      <div className="reviewList">
        <div className="reviewFilter">
          <div>최신순</div><div style={{marginLeft:"25px"}}>평점순</div><div style={{marginLeft:"25px"}}>댓글순</div>
        </div>
        <div className="test">
          {dummy.map(e => 
            <div className="reviewBox">
              <div className='reviewBoxLeft'>
                <div>{ratingCal(e.rating)}</div>
                <div style={{marginTop:"10px"}}>
                  {e.replyContent}
                </div>
                <img src="https://kouve.kr/web/product/small/202203/fd9264794a352a353b844ff75c9455c8.jpg" alt="" width="200" height="200" style={{marginTop:"10px"}}/>
                <div className="reviewReplyBox">
                  <Collapse replyList={e.reviewReplyList}/>
                </div>
                {/* <div style={{position:'relative',zIndex:3,color:'red'}}><div>sadfjs</div><div>sadfjs</div><div>sadfjs</div><div>sadfjs</div><div>sadfjs</div><div>sadfjs</div><div>sadfjs</div></div> */}
              </div>
              <div className='reviewBoxRight'>
                <div className='userId'>{e.userId}</div>     
              </div>
                
            </div>
          )}  
          
        </div>
      </div>
      
      
 
    </Wrapper>  
  )
}

export default DesignReview