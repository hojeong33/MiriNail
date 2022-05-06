import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { Rating } from 'react-simple-star-rating'
import { postReview } from '../../../store/api';
import { useParams } from 'react-router-dom';
import { designerId } from '../../../store/atoms';
import { useRecoilValue } from 'recoil';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Content = styled.div`
  .btn {
    text-align:center;
  }
  
  .buttons {
    display:flex;
    justify-content:center;
    margin-top:32px;
    .btn1 {
      background-color:rgb(51, 51, 51);
      color:white;
      padding: 5px 30px 5px 30px;
      margin : 10px 10px 10px 10px;
      border-radius :5px;
    }
    .btn2 {
      border : 1px solid rgb(51, 51, 51);
      color:rgb(51, 51, 51);
      padding: 5px 30px 5px 30px;
      margin : 10px 10px 10px 10px;
      border-radius :5px;
    }
  }
  .rowBox {
    padding: 20px 0 10px 152px;
    position: relative;
    border-top: 1px solid #f1f1f1;
  }

  .rowBoxLeft {
    line-height: 30px;
    position: absolute;
    left: 0;
    top: 20px;
  }

  .reviewWrite {
    padding-top: 16px;
    // margin-bottom: 14px;
    .inputArea {
      margin-top:30px;
      height: 220px;
      // padding: 10px;
      textarea {
        width:100%;
        height : 150px;
        border: 1px solid gray;
        resize="none";
      }
      
      
    }
  }
  
  .uploadWrap {
    // display : flex;
    width: 50%;
    // .uploadWrapLeft {
    //   float :left;
    //   width : 40%;
    // }
    .uploadWrapRight {
      // margin-top:24px;
    //   float : left;
    //   width :60%;
    //   margin :10px;
    //   padding : 10px;
    //   .imgWrap {
    //     align:center;
    //     width:100%;
      // }
    // }
  }

  
`

export default function BasicModal(modalStatus:any) {
  const queryClient = useQueryClient()
  const nailartSeq = useParams().id!
  const writerId = useRecoilValue(designerId)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  
  //이미지 업로드
  const [files,setFiles] = useState('')

  const onLoadFile = (e:any) => {
    const file = e.target.files
    console.log(file)
    setFiles(file)
  }
  // const formdata = new FormData
  const preview = () => {
    if (!files) {
      return false
    }
    const imgEl:any = document.getElementById('uploadImg')
    console.log(imgEl)
    const reader:any = new FileReader()
    reader.onload = () => {
      imgEl.src = reader.result
      imgEl.style.width = "100%"
      imgEl.style.height = "100%"
    }
    reader.readAsDataURL(files[0])
    console.log(imgEl)
    
  }
  useEffect(() => {
   preview()

  },[files])

  // 스타 레이팅
  const StarRating = ({submitData}:any) => {
    const handleRating = async(rate: any) => {
      setSubmitData({
        ...submitData,
        reviewRating : rate
      })
    }
    return (
      <Rating onClick={handleRating} ratingValue={submitData.reviewRating} showTooltip
      tooltipArray={['별로에요', '그냥 그래요', '보통이에요', '맘에 들어요', '아주 좋아요']} style={{color:"#F8E71C"}}></Rating>
    )
    }

  
  
  
  const [submitData,setSubmitData] = useState({
    reviewTitle : 'dummy',
    reviewDesc : '',
    nailartSeq : nailartSeq,
    designerSeq : writerId,
    reviewRating : 0,
  })
  useEffect(() => {
    console.log(submitData)
  },[submitData])

  const onChangeInput = (e: any) => {
    setSubmitData({
      ...submitData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(submitData);
  }, [submitData]);

  const submit = async() => {
    const formdata:any = new FormData()
    formdata.append("reviewTitle",submitData.reviewTitle)
    formdata.append("reviewDesc",submitData.reviewDesc)
    formdata.append("nailartSeq",submitData.nailartSeq)
    formdata.append("designerSeq",submitData.designerSeq)
    formdata.append("reviewRating",submitData.reviewRating/20)
    formdata.append('reviewFiles',files[0])
    for (let key of formdata.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formdata.values()) {
      console.log(value);
    }

    await postReviewFunc.mutate(formdata)
    handleClose()
  }

  const postReviewFunc = useMutation((data:any) => 
    postReview(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('reviews')
      }
    })



  return (
    <>
      <div className="btn" onClick={handleOpen}>
        <span>리뷰 작성하기</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>리뷰 작성</div>

            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          <Content>
            <div className="rowBox">
              <div className="rowBoxLeft">
                디자인 평가
              </div>
              <div className="rowBoxRight">
                <StarRating submitData={submitData}/>
              </div>
            </div>
            <div className="reviewWrite">
              <label htmlFor="goods_text" className="label">디자인에 대한 평가를 20자 이상 작성해 주세요</label>
              <div className="inputArea">
                <textarea id="goods_text" name="reviewDesc" placeholder="내용을 입력해주세요" onChange={onChangeInput}></textarea>
              </div>
            </div>
            <div className='uploadWrap'>
              
              <div className="uploadWrapLeft">
              <form className="uploadInput">
                <input type="file" id="image" accept="img/*" onChange={onLoadFile} />
                {/* <label htmlFor="image">파일 선택하기</label> */}
                
              </form>
              </div>
            
              <div className='uploadWrapRigiht'>
                {/* <strong>업로드된 이미지</strong> */}
                <div className='imgWrap' style={{height:"200px"}}>
                  <img src="" alt="" id="uploadImg" style={{marginTop:"16px"}} />
                </div>
              </div>
              

            </div>
            <div className="buttons">
              <button className="btn1" onClick={() => submit()}>작성</button><button className="btn2" onClick={() => handleClose()}>취소</button>
            </div>
          </Content>  
          </Typography>
        </Box>
      </Modal>
    </>
  );
}