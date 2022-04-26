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

export default function OneOneOneWrite(modalStatus:any) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let params = useParams()

  
  
  // 인풋
  const [files,setFiles] = useState('')
  const [inputStatus,setInputStatus] = useState({
    qnaTitle : '',
    qnaDesc : '',

  })
  useEffect(() => {
    console.log(inputStatus);
  }, [inputStatus]);

  const onChangeInput = (e: any) => {
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  const onLoadFile = (e:any) => {
    const file = e.target.files
    console.log(file)
    setFiles(file)
  }
  
  const formdata = new FormData
  const submitData = {
    file:formdata,
    ...inputStatus,
    qnaNailartSeq:params.id?.slice(1,params.id.length),
    qnaDesignerSeq:1
  }

  useEffect(() => {
    console.log(submitData)
  },[submitData])
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
    formdata.append('file',files[0])
  },[files])

  
  const submit = async() => {
    axios.post('http://localhost:8080/api/qna',submitData).then(console.log).catch(console.log)
  }
  


  return (
    <div>
      <div  onClick={handleOpen}>
        문의글 작성
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>1대1 문의</div>

            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          <Content>
            <div className="rowBox">
              <div className="rowBoxLeft">
                문의 제목
              </div>
              <div className="rowBoxRight">
                <input type="text" onChange={onChangeInput} name="qnaTitle" style={{border:"1px solid gray"}}/>
              </div>
            </div>
            <div className="reviewWrite">
              <label htmlFor="goods_text" className="label">문의 내용</label>
              <div className="inputArea">
                <textarea placeholder="내용을 입력해주세요" onChange={onChangeInput} name="qnaDesc"></textarea>
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
              <button className="btn1" onClick={submit}>작성</button><button className="btn2">취소</button>
            </div>
          </Content>  
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}