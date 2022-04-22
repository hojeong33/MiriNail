import styled from "styled-components";
import FileUpload2 from "./FileUpload2";
import { useState, useEffect } from "react";
import axios from "axios";

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  height: 100vh;
`;
const MainFrame = styled.div`
  width :1300px;
  height: 100%;
  margin : 0 auto;
  

  .MainPadding {
    height:100%;
    margin : 0px 10px;

    .ItemList {
      padding-left:180px;
      height:100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 75px;
        
        .TypeFilter {
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
        }
        
        .OrderFilter {
          margin-top:100px;
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
          .CheckBox {
            display:block;
            font-size:14px; 
            color:#3D3C3A; 
            label {
              margin-left: 7px;
            }
          }
          
        }

        

      
      }

      .RightBox {
        padding-left :80px;
        
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: left;
        .subTitle {
          font-weight : bold;
          font-size : 18px;
          border-bottom :5px solid #e3e3e3;
          margin-right: 100px;
          padding-bottom : 5px;
        }
        .fileBox {
          margin-top :48px;
        }
        .infoBox {
          margin-top : 48px;
        }
        input{
          width:90%;
          margin-top:24px;
        }
       
        textarea {
          
          width :90%;
          display: block ;
          // margin : 0 auto;
          margin-top : 24px;
          height : 250px;
        }

        .buttons {
          margin-top: 48px;
          display : flex;
          justify-content : center;
          width:90%;
          .btn1 {
            background-color:rgb(51, 51, 51);
            color:white;
            padding: 10px 40px 10px 40px;
            margin : 10px 5px 10px 10px;
            border-radius :5px;
          }
          .btn2 {
            border : 1px solid rgb(51, 51, 51);
            color:rgb(51, 51, 51);
            padding: 10px 40px 10px 40px;
            margin : 10px 20px 10px 30px;
            border-radius :5px;
        }
      }
      
    }
  }
`;

const CreateCommunityContent = () => {
  const [imageProcess, setImageProcess] = useState([]);
  const [textProcess, setTextProcess] = useState("");
  const [textProcess2, setTextProcess2] = useState("");
  useEffect(() => {
    console.log(imageProcess);
  }, [imageProcess]);

  const onChangeText = (e: any) => {
    setTextProcess(e.target.value);
  };
  const onChangeText2 = (e: any) => {
    setTextProcess2(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      id="cb1"
                      checked={imageProcess.length >= 1 ? true : false}
                    />
                    <label htmlFor="cb1">
                      이미지 등록 ({imageProcess.length >= 1 ? 1 : 0}/1)
                    </label>
                  </div>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      id="cb2"
                      checked={textProcess2.length >= 1 ? true : false}
                    />
                    <label htmlFor="cb2">
                      글제목 작성 ({textProcess2.length >= 1 ? 1 : 0}/1)
                    </label>
                  </div>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      id="cb3"
                      checked={textProcess.length >= 10 ? true : false}
                    />
                    <label htmlFor="cb3">
                      글내용 작성 ({textProcess.length >= 10 ? 1 : 0}/1)
                    </label>
                  </div>
                </div>
              </div>
              <div className="RightBox">
                <div className="subTitle" style={{ marginTop: "48px" }}>
                  이미지 등록
                </div>
                <div className="fileBox">
                  <FileUpload2 setImageProcess={setImageProcess} />
                </div>
                <div className="subTitle" style={{ marginTop: "120px" }}>
                  글제목 작성
                </div>
                <input type="text" onChange={onChangeText2}></input>

                <div className="subTitle" style={{ marginTop: "120px" }}>
                  글내용 작성 (10자 이상 입력해주세요.)
                </div>
                <textarea
                  name="textVal"
                  id=""
                  onChange={onChangeText}
                ></textarea>
                <div className="buttons">
                  <div className="btn1">작성</div>
                  <div className="btn2">취소</div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </MainFrame>
      </Wrapper>
    </>
  );
};

export default CreateCommunityContent;
