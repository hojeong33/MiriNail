import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState,useEffect} from 'react'
import styled from 'styled-components'
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { designerId } from '../../../store/atoms';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { inquiryList, postInquiry, reviseInquiry } from '../../../store/api';

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
    // border-top: 1px solid #f1f1f1;
  }

  .rowBoxLeft {
    line-height: 30px;
    position: absolute;
    left: 0;
    top: 20px;
  }

  .rowBoxRight {
    input {
      width:90%;
      border-left-width: 0;
      border-right-width: 0;
      border-top-width: 0;
      border-bottom-width: 2px;
    }
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
    
  }

  
`

export default function OneOneOneRevise({data}:any) {
  console.log(data)
  let params:any = useParams().id
  const userSeq:any = sessionStorage.getItem('userSeq')
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  // 문의 리스트
  const postInquiryFunc:any = useMutation((form:any) => 
      postInquiry(form)
      ,{
        onSuccess: () => {
          console.log('성공')
          // inquiryList(params.id?.slice(1,params.id.length),1)
          queryClient.invalidateQueries('inquiry')
        }
      }
    )
  
  // 인풋
  const [inputStatus,setInputStatus] = useState({
    qnaTitle : '',
    qnaDesc : '',
  

  })

  const onChangeInput = (e: any) => {
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  
  

  const submitData = {
    ...inputStatus,
    // qnaNailartSeq:params.id?.slice(1,params.id.length),
    qnaSeq : data.qnaSeq
  }

  useEffect(() => {
    console.log(submitData)
  },[submitData])
  

  const reviseInquiryFunc:any = useMutation((body:any) => 
  reviseInquiry(body)
  ,{
    onSuccess: () => {
      console.log('성공')
      queryClient.invalidateQueries('inquiry')
    }
  })
  
  const submit = async() => {
    await reviseInquiryFunc.mutate(submitData)
    setOpen(false)
  }
  


  return (
    <>
      <span onClick={handleOpen}>
        수정
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>1대1 문의</div>
            <div style={{display:"flex",paddingTop:"15px",fontSize:"18px"}}>
              <div className="CheckBox">
                <input type="checkbox" id="c1" name="qnaPublic" value="false" checked={data.qnaIsPrivated ? false : true} readOnly/>
                <label htmlFor="cb1" style={{marginLeft:"5px"}} >공개</label>
              </div>
              <div className="CheckBox" style={{marginLeft:"20px"}}>
                <input type="checkbox" id="c2" name="qnaPublic" value="true" checked={data.qnaIsPrivated ? true : false} readOnly/>
                <label htmlFor="cb2" style={{marginLeft:"5px"}} >비공개</label>
              </div>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          <Content>
            <div className="rowBox">
              <div className="rowBoxLeft">
                문의 제목
              </div>
              <div className="rowBoxRight">
                <input type="text" onChange={onChangeInput} name="qnaTitle"/>
              </div>
            </div>
            <div className="reviewWrite">
              <label htmlFor="goods_text" className="label">문의 내용</label>
              <div className="inputArea">
                <textarea placeholder="내용을 입력해주세요" onChange={onChangeInput} name="qnaDesc" ></textarea>
              </div>
            </div>
            <div className='uploadWrap'>
              
              {/* <div className="uploadWrapLeft"> */}
              {/* <form className="uploadInput"> */}
                {/* <input type="file" id="image" accept="img/*" onChange={onLoadFile} /> */}
                {/* <label htmlFor="image">파일 선택하기</label> */}
                
              {/* </form> */}
              {/* </div> */}
            
          
                {/* <strong>업로드된 이미지</strong> */}
                <div className='imgWrap'>
                  <img src={data.qnaImgUrl} alt=""  style={{marginTop:"16px",width:"100%",height:"150px"}} />
                </div>
         
              

            </div>
            <div className="buttons">
              <button className="btn1" onClick={submit}>작성</button><button className="btn2" onClick={handleClose}>취소</button>
            </div>
          </Content>  
          </Typography>
        </Box>
      </Modal>
    </>
  );
}