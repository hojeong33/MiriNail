import styled from "styled-components";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  designDetail,
  nailCount,
  nailLike,
  isLike,
  nailDislike,
  deleteDesign,
} from "../../store/api";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useRecoilState } from "recoil";
import { designerId } from "../../store/atoms";
import { Link } from "react-router-dom";
import { parseMutationFilterArgs } from "react-query/types/core/utils";

const Wrapper = styled.div`
  padding-top: 140px;
  overflow: hidden;
  height: 705px;
  .row {
    max-width: 1300px;
    margin: 0 auto;
    zoom: 1;
    .imHarf {
      margin: 5px;
      .leftBox {
        width: 50%;
        float: left;
        height: 500px;
        .imHarf {
          height: 100%;
          .mainImg {
            height: 100%;
          }
        }
      }

      .rightBox {
        height: 500px;
        position: relative;
        width: 50%;
        float: left;
        .imHarf {
          height: 100%;
          .primary {
            height: 100%;
            .share {
              cursor: pointer;
              position: absolute;
              right: 0px;
              top: 0px;
              font-size: 1.8em;
            }
            .boxs {
              margin-bottom: 20px;
              // padding: 5px 20px;
              // background: #3D3C3A;
              // color: #fff;
              display: flex;
              justify-content: space-between;
              .boxsLeft {
                padding: 5px 20px;
                background: #3d3c3a;
                color: #fff;
              }
              .boxsRight {
                margin-right: 20px;
                display: flex;
                // cursor:pointer;
                .rev {
                  
                  :hover {
                    
                    background-color: #3d3c3a;
                    color: white;
                    border: 1px solid white;
                  }
                }

                div {
                  padding: 5px 20px;
                  border: 1px solid #3d3c3a;
                  color: #3d3c3a;
                  cursor: pointer;
                  :hover {
                    background-color: #c31d1d;
                    color: white;
                    border: 1px solid white;
                  }
                }
              }
            }
            .name {
              font-size: 2em;
              font-weight: 500;
              margin-bottom: 15px;
            }
            .price {
              margin-bottom: 15px;
              font-size: 1.5em;
            }
            .tags {
              margin-bottom: 25px;
              font-size: 14px;
              color: gray;
            }
            .info {
              position: relative;
              margin-bottom: 30px;
              height: 60px;

              div {
                padding-left: 120px;
                padding-top: 15px;
                padding-bottom: 25px;
                font-size: 14px;
                margin-bottom: 10px;
                border-top: 1px solid rgba(61, 60, 58, 0.2);
                border-bottom: 1px solid rgba(61, 60, 58, 0.2);
                p {
                  position: absolute;
                  left: 0px;
                  top: 15px;
                  font-weight: 500;
                }
                span {
                  display: block;
                  // margin-top:0px;
                  // word-break:break-all;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  word-wrap: break-word;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  line-height: 20px; /* ★★ 설정이 필요한 영역 ★★ */ /* ★★ 3줄 이상은 말줄임 처리 ★★ */
                  -webkit-line-clamp: 3; /* ★★ line-height:20px일때 ★★ */
                  height: 60px;
                }
              }
            }
            .designerInfo {
              margin-top: 60px;
              display: flex;
              align-items: center;
              cursor: pointer;
              .designerImg {
                img {
                  margin-top: 5px;
                  width: 50px;
                  height: 50px;
                  border-radius: 100%;
                  margin-left: 10px;
                }
              }
              .designerName {
                /* margin-top: 12px; */
                margin-left: 30px;
                font-weight: 400;
                font-size: 16px;
              }

              .ipfsInfo {
                margin-top:22px;
                position:absolute;
                right:15px;
                [data-tooltip-text]:hover {
                  position: relative;
                }
                
                [data-tooltip-text]:hover:after {
                  background-color: #000000;
                  background-color: rgba(0, 0, 0, 0.8);
                
                  -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
                  -moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
                  box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
                
                  -webkit-border-radius: 5px;
                  -moz-border-radius: 5px;
                  border-radius: 5px;
                
                  color: #FFFFFF;
                  font-size: 12px;
                  content: attr(data-tooltip-text);
                
                  margin-bottom: 10px;
                  top: 130%;
                  right: 0;    
                  padding: 7px 12px;
                  position: absolute;
                  width: auto;
                  min-width: 50px;
                  max-width: 200px;
                  word-wrap: break-word;
                
                  z-index: 9999;
                }

                span {
                  font-size:12px;
                  font-color: #3d3c3a;
                  font-weight:bold;
                  padding : 3px 5px 3px 5px;
                  background-color : #e3e3e3;
                  border : 1px solid #e3e3e3;
                  border-radius : 5px;
                  // margin-top:5px;
                }

              }
            }
            .btns {
              margin-top: 70px;
              position: relative;
              zoom: 1;
              width: 100%;

              a {
                float: left;
                font-size: 16px;
                padding: 2% 1.2%;
                text-align: center;
                width: 33%;
                height: 50px;
                border-left: 1px solid rgba(61, 60, 58, 0.4);
                border-top: 1px solid rgba(61, 60, 58, 0.4);
                border-bottom: 1px solid rgba(61, 60, 58, 0.4);
                border-right: 1px solid rgba(61, 60, 58, 0.4);
                cursor: pointer;
                border-right: 0px;
                background-color: #f7f7f5;
                color: #3d3c3a;
                svg { 
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    height: 1100px;
    .row {
      zoom: 1;
      .imHarf {
        margin: 5px;
        .leftBox {
          width: 100%;
          float: none;
          height: 350px;
          // display:none;
          position: relative;
        }

        .rightBox {
          margin-top: 50px;
          z-index: 11;
          height: 1000px;
          position: relative;
          width: 100%;
          float: none;
        }
      }
    }
  }
`;

const UpperFrame = () => {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let params: any = useParams().id;
  console.log(params);
  const myId = Number(sessionStorage.getItem("userSeq"));

  const { isLoading: isLikeLoading, data: likeData } = useQuery("like", () =>
    nailCount(params)
  );
  const { isLoading: nailLoading, data: nailData } = useQuery("detail", () =>
    designDetail(params)
  );
  const { isLoading: isLikeCheckLoading, data: isLikeData } = useQuery(
    "isLike",
    () => isLike(params)
  );
  const [designerSeq, setDesignerSeq] = useRecoilState<any>(designerId);
  useEffect((): any => {
    if (nailData) {
      setDesignerSeq(nailData.designerSeq);
    }
    console.log(nailData);
  }, [nailData]);

  const ACCESS_TOKEN = localStorage.getItem("token");
  const likeFunc: any = useMutation((param: any) => nailLike(param), {
    onSuccess: () => {
      console.log("성공");
      isLike(Number(params));
      queryClient.invalidateQueries("isLike");
      queryClient.invalidateQueries("like");
    },
    onError: (error) => {
      // 요청에 에러가 발생된 경우
      console.log("onError", error);
    },
  });

  const disLikeFunc: any = useMutation((param: any) => nailDislike(param), {
    onSuccess: () => {
      console.log("성공");
      isLike(Number(params));
      queryClient.invalidateQueries("isLike");
      queryClient.invalidateQueries("like");
    },
    onError: (error) => {
      // 요청에 에러가 발생된 경우
      console.log("onError", error);
    },
  });

  const likeHandler = async () => {
    console.log("핸들러실행");
    if (isLikeData) {
      console.log("싫어요 실행");
      disLikeFunc.mutate(Number(params));
    } else {
      console.log("좋아요 실행");
      likeFunc.mutate(Number(params));
    }
  };

  const delDesign = async (param: any) => {
    await deleteDesign(param);
    navigate("/nft");
  };

  const copy = (link:any) => {
    const el = 'https://ipfs.io/ipfs/' + link
    // el.select()
    // document.execCommand("copy")
 
    navigator.clipboard.writeText(`${el}`).then(() => {alert('해쉬를 클립보드에 복사했습니다.')})
  }

  useEffect(() => {
   
    // 주소
    axios.post('https://k6e101.p.ssafy.io/post',{
      strings : params
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },[])
  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="imHarf">
            <div className="leftBox">
              <div className="imHarf">
                <div className="mainImg">
                  <img
                    style={{ width: "95%", height: "100%" }}
                    src={nailData?.nailartThumbnailUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="rightBox">
              <div className="imHarf">
                <div className="primary">
                  <div className="share">
                    {/* <ShareIcon onClick={share}/> */}
                  </div>
                  <div className="boxs">
                    <div className="boxsLeft">{nailData?.nailartType}</div>
                    {myId === designerSeq ? (
                      <div className="boxsRight">
                        <div
                          className="rev"
                          style={{cursor:"pointer"}}
                          onClick={() =>
                            navigate("/nft/revise", { state: {data :nailData} })
                          }
                        >
                          수정
                        </div>
                        <div
                          style={{ marginLeft: "10px",cursor:"pointer" }}
                          onClick={() => delDesign(params)}
                        >
                          삭제
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="name">{nailData?.nailartType} - {nailData?.nailartDetailColor}</div>
                  <div className="price">
                    {nailData?.nailartPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </div>
                  <div className="tags">
                    #{nailData?.nailartWeather} #{nailData?.designerNickname}
                  </div>
                  <div className="info">
                    <div>
                      <p>제품소개</p>
                      <span style={{ whiteSpace: "pre-wrap" }}>
                        {nailData?.nailartDesc}
                      </span>
                    </div>
                  </div>
                  <div className="designerInfo">
                    <div className="designerImg">
                      <img
                        src={nailData?.designerImgUrl ? nailData?.designerImgUrl : "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"}
                        alt=""
                        onClick={() =>
                          navigate(`/designerpage/${nailData?.designerSeq}/new`)
                        }
                      />
                    </div>
                    <div className="designerName">
                      <div
                        style={{ fontSize: "1.2em" }}
                        onClick={() =>
                          navigate(`/designerpage/${nailData?.designerSeq}/new`)
                        }
                      >
                        {nailData?.designerShopName}
                      </div>
                      {/* <div style={{ color: "gray" }}>
                        {nailData?.designerShopName}
                      </div> */}
                    </div>
                    <div className="ipfsInfo" >
                      <span data-tooltip-text={nailData?.nailartNft} onClick={() => copy(nailData?.nailartNft)}>IPFS HASH</span>
                      <br/><br/>
                    </div>
                  </div>
           
                  <div className="btns">
                    <a style={{ backgroundColor: "red", color: "white" }} onClick={() => window.open('https://k6e101.p.ssafy.io/nail/client')}>
                      AR 피팅하기
                    </a>
                    <Link to={`/designerpage/${nailData?.designerSeq}/reservation`}
                      style={{ backgroundColor: "white" }}
                    >
                      <CalendarMonthIcon style={{ marginBottom: "2px" }} />
                      예약하기
                    </Link>
                    <a
                      style={{
                        backgroundColor: "white",
                        borderRight: "1px solid rgba(61,60,58,0.4)",
                      }}
                      onClick={() => likeHandler()}
                    >
                      {isLikeData ? (
                        <span>
                          <FavoriteIcon
                            style={{
                              color: "red",
                              marginBottom: "1px",
                              marginRight: "10px",
                            }}
                          />
                          <span style={{ fontWeight: "bold" }}>{likeData}</span>
                        </span>
                      ) : (
                        <span>
                          <FavoriteBorderIcon
                            style={{ marginBottom: "1px", marginRight: "10px" }}
                          />
                          <span style={{ fontWeight: "bold" }}>{likeData}</span>
                        </span>
                      )}
                    </a>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default UpperFrame;
