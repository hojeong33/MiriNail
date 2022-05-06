import StarIcon from '@mui/icons-material/Star';
import Collapse from './Collapse';


const Replys = ({e}:any) => {
  console.log(e)
    const ratingCal = (rate:number) => {
      const array2 = []; 
      for (let i=0; i <rate; i++) {
        array2.push(<StarIcon style={{color:"#F8E71C"}} />)
      }
      return array2
    
  }
  
  return (
    <>
    {/* {e.map((e:any) => <span>e.reviewSeq</span>)} */}
    {/* <span>{e[0]}</span> */}
      {e && e.map((e:any,idx:number) => 
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
    </>
  )
}

export default Replys