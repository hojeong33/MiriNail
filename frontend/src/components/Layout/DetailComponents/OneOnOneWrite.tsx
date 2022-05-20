import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { designerId } from "../../../store/atoms";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { inquiryList, postInquiry } from "../../../store/api";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex:'9999',
  height : '90vh',
  overflowY : 'auto'
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
  
`;

export default function OneOnOneWrite(modalStatus: any) {
  let params:string|undefined = useParams().id;
  const myId = Number(sessionStorage.getItem("userSeq"))
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpen = () => 
    {
      if (!myId) {
        alert('로그인이 필요합니다.')
        window.location.replace("https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect")
      } else { 
        setOpen(true)
      }
    }
  const handleClose = () => setOpen(false);
  const userSeq: any = sessionStorage.getItem("userSeq");
  const [designerSeq, setDesignerSeq] = useRecoilState(designerId);
  // const {isLoading:isInquiryLoading , data:inquiryData} = useQuery('inquiryList',() => inquiryList(params.id?.slice(1,params.id.length)))

  // 문의 리스트
  const postInquiryFunc = useMutation((form: any) => postInquiry(form), {
    onSuccess: () => {
      console.log("성공");
      // inquiryList(params.id?.slice(1,params.id.length),1)
      queryClient.invalidateQueries("inquiry");
    },
  });

  // 인풋
  const [files, setFiles] = useState("");
  const [inputStatus, setInputStatus] = useState({
    qnaTitle: "",
    qnaDesc: "",
    qnaPublic: "",
  });
  useEffect(() => {
    console.log(inputStatus);
  }, [inputStatus]);

  const onChangeInput = (e: any) => {
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  const onCheckbox = async (e: any) => {
    const checkboxes: any = document.getElementsByName("qnaPublic");
    for await (const box of checkboxes) {
      console.log(box);
      box.checked = false;
    }
    e.target.checked = true;
    setInputStatus({
      ...inputStatus,
      [e.target.name]: e.target.value,
    });
  };

  const onLoadFile = (e: any) => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);
  };

  const submitData:any = {
    ...inputStatus,
    qnaNailartSeq: params,
    qnaDesignerSeq: designerSeq,
  };

  useEffect(() => {
    console.log(submitData);
  }, [submitData]);
  const preview = () => {
    if (!files) {
      return false;
    }
    const imgEl: any = document.getElementById("uploadImg");
    console.log(imgEl);
    const reader: any = new FileReader();
    reader.onload = () => {
      imgEl.src = reader.result;
      imgEl.style.width = "100%";
      imgEl.style.height = "100%";
    };
    reader.readAsDataURL(files[0]);
    console.log(imgEl);
  };
  useEffect(() => {
    preview();
  }, [files]);

  const submit = async () => {
    const formdata = new FormData();
    console.log(userSeq);
    formdata.append("qnaFile", files[0]);
    // formdata.append('qnaRegisterPostReq',testData)
    formdata.append("qnaDesc", inputStatus.qnaDesc);
    formdata.append("qnaDesignerSeq", submitData.qnaDesignerSeq);
    formdata.append("qnaIsPrivated", submitData.qnaPublic);
    formdata.append("qnaNailartSeq", submitData.qnaNailartSeq);
    formdata.append("qnaTitle", inputStatus.qnaTitle);
    formdata.append("userSeq", userSeq);

    console.log(formdata.get('qnaFile'))
    if (!inputStatus.qnaTitle) {
      alert('제목을 입력해주세요.')
      return
    }
    
    else if (!inputStatus.qnaDesc) {
      alert('내용을 선택해주세요.')
      return
    }
    else if (!files) {
      alert('첨부파일을 선택해주세요.')
      return
    } 
    
  
    await postInquiryFunc.mutate(formdata);
    setInputStatus({
      qnaTitle: "",
      qnaDesc: "",
      qnaPublic: "",
    })
    setFiles('')
    setOpen(false);
    //  스트링으로 보내야 함.

    // await axios.post('http://localhost:8080/api/qna',formdata,{
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    //   }).then(console.log).catch(console.log)
  };

  return (
    <div>
      <div onClick={handleOpen}>문의글 작성</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{zIndex:'9999'}}
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>1대1 문의</div>
            <div
              style={{ display: "flex", paddingTop: "15px", fontSize: "18px" }}
            >
              <div className="CheckBox">
                <input
                  type="checkbox"
                  id="c1"
                  name="qnaPublic"
                  value="false"
                  onChange={onCheckbox}
                />
                <label htmlFor="c1" style={{ marginLeft: "5px" }}>
                  공개
                </label>
              </div>
              <div className="CheckBox" style={{ marginLeft: "20px" }}>
                <input
                  type="checkbox"
                  id="c2"
                  name="qnaPublic"
                  value="true"
                  onChange={onCheckbox}
                />
                <label htmlFor="c2" style={{ marginLeft: "5px" }}>
                  비공개
                </label>
              </div>
            </div>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"span"}
          >
            <Content>
              <div className="rowBox">
                <div className="rowBoxLeft">문의 제목</div>
                <div className="rowBoxRight">
                  <input type="text" onChange={onChangeInput} name="qnaTitle" spellCheck="false" />
                </div>
              </div>
              <div className="reviewWrite">
                <label htmlFor="goods_text" className="label">
                  문의 내용
                </label>
                <div className="inputArea">
                  <textarea
                    placeholder="내용을 입력해주세요"
                    onChange={onChangeInput}
                    name="qnaDesc"
                    spellCheck="false"
                  ></textarea>
                </div>
              </div>
              <div className="uploadWrap">
                <div className="uploadWrapLeft">
                  <form className="uploadInput">
                    <input
                      type="file"
                      id="image"
                      accept="img/*"
                      onChange={onLoadFile}
                    />
                    {/* <label htmlFor="image">파일 선택하기</label> */}
                  </form>
                </div>

                <div className="uploadWrapRigiht">
                  {/* <strong>업로드된 이미지</strong> */}
                  <div className="imgWrap" style={{ height: "200px" }}>
                    <img
                      src=""
                      alt=""
                      id="uploadImg"
                      style={{ marginTop: "16px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="btn1" onClick={submit}>
                  작성
                </button>
                <button className="btn2" onClick={handleClose}>
                  취소
                </button>
              </div>
            </Content>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
