import styled from "styled-components";
import FileUpload2 from "./FileUpload2";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { imgProp } from "../../../store/atoms";
const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
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
          height : 225px;
          border : 1px solid black;
          border-radius :10px;
          padding :10px;
          margin-top:50px;
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
        border-left: 1px solid #d2d2d0;
        padding-left :200px;
        padding-top: 75px;
        width: 968px;
        padding-bottom: 160px;
        text-align: left;

        .subTitle {
          font-weight : bold;
          font-size : 18px;
          border-bottom :5px solid #e3e3e3;
          // margin-right: 100px;
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
          width :100%;
          display: block ;
          // margin : 0 auto;
          margin-top : 24px;
          height : 250px;
        }

        .buttons {
          margin-top: 48px;
          display : flex;
          justify-content : center;
          width:100%;
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

const UpdateCommunityContent = () => {
  interface CommunityImgProp {
    communityImgSeq: number;
    communityImgUrl: string;
  }
  interface CommunityDetailProp {
    communityTitle: string;
    communityDesc: string;
    communityImg: CommunityImgProp[];
  }
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("token");
  const [itemDetail, setItemDetail] = useState<CommunityDetailProp>();
  const communitySeq = sessionStorage.getItem("communitySeq");
  const [myTest, setMyTest] = useRecoilState(imgProp);

  //게시글 상세 정보 받아오기
  useEffect(() => {
    getDetail(communitySeq);
    console.log(itemDetail, "아이템디테일!");
  }, []);

  useEffect(() => {
    console.log(itemDetail);
    setMyTest(itemDetail?.communityImg);
  }, [itemDetail]);

  const getDetail = async (communitySeq: number | string | null) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/${communitySeq}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          setItemDetail(res.data);
          setCommunityDesc(res.data.communityDesc);
          setCommunityTitle(res.data.communityTitle);
          setPostImages(res.data.communityImg);
          console.log(res.data, "아이템디테일");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const updateCommunity = async () => {
    console.log(communityDesc, "내용");
    console.log(communityTitle, "제목");
    const formdata: any = new FormData();
    formdata.append("communitySeq", communitySeq);
    formdata.append("communityDesc", communityDesc);
    formdata.append("communityTitle", communityTitle);
    postImages.forEach((e) => {
      formdata.append("communityFiles", e);
    });
    for (let key of formdata.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formdata.values()) {
      console.log(value);
    }
    axios
      .post("http://k6e101.p.ssafy.io/api/community/update", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        navigate("/community");
        console.log("수정완료");
      })
      .catch(console.log);
  };
  //리모컨
  window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    let remote: any = document.getElementById("remote");
    if (remote) {
      if (scrollTop + clientHeight >= 1337) {
        remote.style.position = "fixed";
        remote.style.top = "180px";
      } else {
        remote.style.position = "relative";
        remote.style.top = "";
      }
    }
  });

  const [imageProcess, setImageProcess] = useState([]);
  const [textProcess, setTextProcess] = useState("");
  const [textProcess2, setTextProcess2] = useState("");
  const [communityTitle, setCommunityTitle] = useState("");
  const [communityDesc, setCommunityDesc] = useState("");
  const [postImages, setPostImages] = useState<any[]>([]);

  useEffect(() => {
    console.log(imageProcess);
  }, [imageProcess]);

  const onChangeText = (e: any) => {
    setTextProcess(e.target.value);
    setCommunityDesc(e.target.value);
  };
  const onChangeText2 = (e: any) => {
    setTextProcess2(e.target.value);
    setCommunityTitle(e.target.value);
  };
  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="RightBox">
                <div className="subTitle" style={{ marginTop: "48px" }}>
                  이미지 수정
                </div>
                <div className="fileBox">
                  <FileUpload2
                    defaultImg={itemDetail?.communityImg}
                    setImageProcess={setImageProcess}
                    setPostImages={setPostImages}
                    itemDetail={itemDetail}
                  />
                </div>
                <div className="subTitle" style={{ marginTop: "80px" }}>
                  글 제목 수정
                </div>
                <input
                  type="text"
                  onChange={onChangeText2}
                  spellCheck={false}
                  style={{ width: "100%", padding: "8px" }}
                  defaultValue={itemDetail?.communityTitle}
                ></input>

                <div className="subTitle" style={{ marginTop: "80px" }}>
                  글 내용 수정
                </div>
                <textarea
                  name="textVal"
                  id=""
                  onChange={onChangeText}
                  spellCheck={false}
                  style={{ resize: "none", padding: "8px" }}
                  placeholder="10자 이상 입력해주세요."
                  defaultValue={itemDetail?.communityDesc}
                ></textarea>

                <div className="buttons">
                  {communityDesc !== itemDetail?.communityDesc ||
                  // postImages !== itemDetail.communityImg ||
                  communityTitle !== itemDetail.communityTitle ? (
                    <button className="btn1" onClick={updateCommunity}>
                      수정
                    </button>
                  ) : (
                    <button
                      className="btn1"
                      disabled
                      style={{ backgroundColor: "rgba(175,175,175)" }}
                      onClick={updateCommunity}
                    >
                      수정
                    </button>
                  )}

                  <button
                    className="btn2"
                    onClick={() => {
                      navigate("/community");
                    }}
                  >
                    취소
                  </button>
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

export default UpdateCommunityContent;
