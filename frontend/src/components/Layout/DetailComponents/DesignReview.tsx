import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';
import ProgressBar from './ProgressBar';
import {useEffect, useState} from 'react'
import BasicModal from './Modal';
// import { Modals } from '@mui/material';
// import Popup from './Modals'
import Collapse from './Collapse'
import { useParams } from 'react-router-dom';
import { getReview } from '../../../store/api';
import { useQuery } from 'react-query';
import { tailLoading } from '../../Commons/Loading';
import { TailSpin } from 'react-loader-spinner';



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
        // margin-left: 30%;
        justify-content:center;
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
        width: 100%;
        border-radius: 4px;     
        margin : 15px auto;
        color: black;
        // line-height : 26px;
        span {
          background-color :#14161a;
          color: white;
          font-size:14px;
          font-weight:bold;
          padding : 5px 10px 5px 10px;
          border-radius:4px;
        }
      }
    }

    .reviewRight {
      width : 70%;
      .progressSet {
        align-items:center;
        width:85%;
        display:flex;
        margin:25px;
        margin-left:7%;
        .test2 {
          display: none;

        }
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
      // opacity : 0.5;
      color:gray;
    }
    
    .test{
      min-height : 700px;
      .reviewBox{
        margin-top:24px;
        display: flex;
        min-height : 300px;
        border-bottom : 1px solid #e4e4e4;
    
        .reviewBoxLeft {
          width : 75%;
          height:100%;
          align-items:center;
          border-right : 1px solid #e4e4e4;
          img {
            width :147px;
            height : 147px;
            margin-top : 40px;
          }
        }
        .reviewBoxRight {
          
          width : 25%;
          height:100%;
          padding-top:5px;
          .userId {
            margin-left:20px;
            font-weight:bold;
          }
        }
      }
   }
  }
  
  @media screen and (max-width: 1023px) {
    .review {
   
    }
    .reviewTotal {
  
      
      .reviewLeft {
        width : 40%;
       
        .reviewLeftUp {
        
          .iconBox {
       
            
            svg {
       
            }
          }
  
          .score {

          }
        }
  
        .btn {  
      
          // line-height : 26px;
          span {
          
          }
        }
      }
  
      .reviewRight {
        width : 60%;
        .progressSet {
          width:80%;
          display:flex;
          margin:25px;
          margin-left:3%;
          .test1 {
            display:none;
          }
          .test2 {
            color :black;
            display:block;
            width: 100px;
            // padding-bottom:px;
          }
        }
      }
    }
  
    .reviewList {
      // position:relative
      .reviewFilter {
 
      }
      
      .test{
  
        .reviewBox{
  
          min-height : 300px;
      
          .reviewBoxLeft {
   
  
          }
          .reviewBoxRight {
            // border-left : 1px solid #e4e4e4;
            width : 25%;
            height:100%;
            .userId {
              margin-left:20px;
            }
          }
        }
     }
    }
  }

  

`


const DesignReview = () => {
  const param = useParams().id
  const [filter,setFilter] = useState(1)
  const [dummy2,setDummy2] = useState({
    best : 0,
    good : 0,
    soso : 0,
    bad : 0,
    worst : 0
  })
  const {isLoading:isReviewLoading,data:reviewData} = useQuery(['reviews',param,filter],getReview)
  const [test,setTest] = useState([])

  useEffect(() => {
    const best = reviewData?.content.filter((e:any) => e.reviewRating === 5).length
    const good = reviewData?.content.filter((e:any) => e.reviewRating === 4).length
    const soso = reviewData?.content.filter((e:any) => e.reviewRating === 3).length
    const bad = reviewData?.content.filter((e:any) => e.reviewRating === 2).length
    const worst = reviewData?.content.filter((e:any) => e.reviewRating === 1).length
    console.log(best, good, soso, bad, worst)
    setDummy2({
      best : best,
      good : good,
      soso : soso,
      bad : bad,
      worst : worst,
    })
    setTest(reviewData?.content)
  },[reviewData])
  
  const highestBarVote = Math.max(dummy2.best,dummy2.good,dummy2.soso,dummy2.bad,dummy2.worst)
  const ratingCal = (rate:number) => {
      const array2 = []; 
      for (let i=0; i <rate; i++) {
        array2.push(<StarIcon style={{color:"#F8E71C"}} />)
      }
      return array2
    
  }

  // // 필터
  // const [data,setData] = useState([])
  // // const sortByRating = reviewData?.content.sort((a:any,b:any) => b.reviewRating - a.reviewRating)
  // // const sortByReply = reviewData?.content.sort((a:any,b:any) => b.reviewComments.length - a.reviewComments.length)
  // // console.log(sortByRating)
  // // console.log(sortByReply)
  // useEffect(() => {
  //   data.eff
  // })

  const handleFilter = (e:number) => {
    setFilter(e)
  }

  // useEffect(() => {
  //   if (filter === 0) {
  //     const newArr = reviewData?.content.slice(0)
  //     setTest(newArr)
  //   }
  //   if (filter === 1) {
  //     const newArr = reviewData?.content.slice(0).sort((a:any,b:any) => b.reviewRating - a.reviewRating)
  //     setTest(newArr)
  //   }

  //   if (filter === 2) {
  //     const newArr = reviewData?.content.slice(0).sort((a:any,b:any) => b.reviewComments.length - a.reviewComments.length)
  //     setTest(newArr)

  //   }
  // },[filter])
  

  return (
    <Wrapper>
      
      {/* 리뷰 부분 ( 작성, 프로그레스바) */}
      <div className='review'>REVIEW ({reviewData?.content.length})</div>
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
            {(dummy2.best+dummy2.good)*100/reviewData?.content.length}% 의 유저가 이 디자인을 좋아합니다.
          </div>
          
          <BasicModal />
          
          
        </div>
        
        <div className='reviewRight'>
          {/* 100%의 구매자가 이 상품을 좋아합니다.sadasd */}
          <div className="progressSet">
            <span className="test1" style={{marginRight:"25px",width:"15%"}}>아주 좋아요</span>
            <div className="test2">BEST</div>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.best} barWidth={highestBarVote}  />
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.best}</span>
          </div>
          <div className="progressSet">
            <span className="test1" style={{marginRight:"25px",width:"15%"}}>맘에 들어요</span>
            <div className="test2">GOOD</div>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.good} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.good}</span>
          </div>
          <div className="progressSet">
            <span className="test1" style={{marginRight:"25px",width:"15%"}}>보통이에요</span>
            <div className="test2">SOSO</div>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.soso} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.soso}</span>
          </div>
          <div className="progressSet">
            <span className="test1" style={{marginRight:"25px",width:"15%"}}>그냥 그래요</span>
            <div className="test2">BAD</div>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.bad} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.bad}</span>
          </div>
          <div className="progressSet">
            <span className="test1" style={{marginRight:"25px",width:"15%"}}>별로에요</span>
            <div className="test2">WORST</div>
            <ProgressBar bgcolor={'#14161a'} completed={dummy2.worst} barWidth={highestBarVote}/>
            <span style={{marginLeft:"20px",width:"5%"}}>{dummy2.worst}</span>
          </div>
        </div>
      </div>

      <div className="reviewList">
        <div className="reviewFilter">
          <div onClick={() => handleFilter(1)} style={filter === 1 ? {color:"black"} : {}}>최신순</div>
          <div style={filter === 2 ? {marginLeft:"25px",color:"black"} : {marginLeft:"25px"}} onClick={() => handleFilter(2)}>평점순</div>
          <div style={filter === 3 ? {marginLeft:"25px",color:"black"} : {marginLeft:"25px"}} onClick={() => handleFilter(3)}>댓글순</div>

        </div>
        <div className="test">
          
          {isReviewLoading ? <div style={{position:"absolute",left:"50%",top:"50%"}}><TailSpin color="gray" height={50} width={50} /></div> : reviewData.content.map((e:any,idx:number) => 
            <div className="reviewBox">
              <div className='reviewBoxLeft'>
                <div>{ratingCal(e.reviewRating)}</div>
                <div style={{marginTop:"10px"}}>
                  {e.reviewDesc}
                </div>
                <img src={e.reviewImg[0].reviewImgUrl} alt="이미지 오류" width="200" height="200" />
                <div className="reviewReplyBox">
                  <Collapse replyList={e.reviewComments} reviewSeq={e.reviewSeq}/>
                </div>
              </div>
              <div className='reviewBoxRight'>
                <span className='userId'>{e.userNickname}</span><span>님의 리뷰입니다.</span>
              </div>
             
            </div>
          )}  
          
        </div>
      </div>
      
      
 
    </Wrapper>  
  )
}

export default DesignReview
