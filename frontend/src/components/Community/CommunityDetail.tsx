import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { Rating } from 'react-simple-star-rating'

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
        resize:"none";
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
  }
  
`

export default function BasicModal(modalStatus:any) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  
  //이미지 업로드
  const [files,setFiles] = useState('')

  const onLoadFile = (e:any) => {
    const file = e.target.files
    setFiles(file)
  }
  // const formdata = new FormData
  const preview = () => {
    if (!files) {
      return false
    }
    const imgEl:any = document.getElementById('uploadImg')

    const reader:any = new FileReader()
    reader.onload = () => {
      imgEl.src = reader.result
      imgEl.style.width = "100%"
      imgEl.style.height = "100%"
    }
    reader.readAsDataURL(files[0])

    
  }
  useEffect(() => {
   preview()

  },[files])

  // 스타 레이팅
  const StarRating = () => {
  const [ratingValue, setRatingValue] = useState(0)
  const handleRating = (rate: number) => {
    setRatingValue(rate)
  }
  return (
    <Rating onClick={handleRating} ratingValue={ratingValue} showTooltip
    tooltipArray={['별로에요', '그냥 그래요', '보통이에요', '맘에 들어요', '아주 좋아요']} style={{color:"#F8E71C"}}></Rating>
  )
  }

  


  return (
    <div>
      <div className="btn" onClick={handleOpen}>
        리뷰 작성하기
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>sadfasdf</div>

            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          <Content>
            <div className="rowBox">
              <div className="rowBoxLeft">
                별점매기기
              </div>
              <div className="rowBoxRight">
                {StarRating()}
              </div>
            </div>
            <div className="reviewWrite">
              <label htmlFor="goods_text" className="label">디자인에 대한 평가를 20자 이상 작성해 주세요</label>
              <div className="inputArea">
                <textarea id="goods_text" placeholder="내용을 입력해주세요" name="goods_text" ></textarea>
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
              <button className="btn1">작성</button><button className="btn2">취소</button>
            </div>
          </Content>  
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}