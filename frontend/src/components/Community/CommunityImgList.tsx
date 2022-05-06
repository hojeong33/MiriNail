import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { notEqual } from "assert";
import TimeCounting from "time-counting";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
  }
`;

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
};

const CustomImageListItem = styled(ImageListItem)`
  :hover img {
    filter: brightness(30%);
  }
  .inner-content {
    font-size: 2rem;
    font-weight: 300;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 600ms ease;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  :hover .inner-content {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  .leftDetailBox {
    width: 60%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .rightDetailBox {
    padding-bottom: 30px;
    position: relative;
    // display :flex;
    // flex-directioin : column;
    background-color: #fff;
    width: 40%;

    img {
      border-radius: 70px;
      -moz-border-radius: 70px;
      -khtml-border-radius: 70px;
      -webkit-border-radius: 70px;
    }

    .rightDetailBoxTop {
      height: 72px;
      // line-height :40px;
      display: flex;
      padding: 14px 4px 14px 16px;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      border-bottom: 1px solid #e3e3e3;
    }
    .rightDetailBoxMiddle {
      // margin-top : 15px;
      padding: 16px;
      overflow-y: scroll;
      height: 500px;
      flex: 1;
      .postWriter {
        display: flex;
        margin-bottom: 16px;
      }
      .replys {
        .replyFrame {
          margin-bottom: 16px;
        }
      }
      .replysInfo {
        display: flex;
      }
    }

    .inputBox {
      // position : absolute;
      // bottom : 0px;
      height: 50px;
      display: flex;
      background-color: #fff;
      input {
        width: 90%;
        border: 0px;
      }
      input:focus {
        outline: none;
      }
      div {
        line-height: 50px;
        width: 10%;
        text-align: center;
        color: #b3dffc;
      }
      hr {
        color: #e3e3e3;
      }
    }
  }
`;

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CommunityImgList() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  interface CommunityImgProp {
    communityImgSeq: number;
    communityImgUrl: string;
  }
  interface CommunityItemProp {
    communityImg: CommunityImgProp[];
    communityTitle: string;
    communitySeq: number;
    rows: number;
    cols: number;
  }
  interface CommunityDetailProp {
    communitySeq: number;
    userNickname: string;
    userProfileImg: string;
    userSeq: string;
    communityTitle: string;
    communityDesc: string;
    communityImg: CommunityImgProp[];
    communityRededAt: string;
  }
  interface CommentDataProp {
    communityCommentSeq: number;
    userSeq: number;
    userNickname: string;
    userProfileImg: string;
    communityCommentDesc: string;
    communityCommentRegedAt: string;
    communityCommentIsDelete: boolean;
  }
  interface CommentPostDataProp {
    communityCommentDesc: string;
    communityCommentLayer: number;
    communitySeq: number;
    communityCommentSeq: number | null;
  }

  const [itemData, setItemData] = useState<CommunityItemProp[]>([]);
  const [itemDetail, setItemDetail] = useState<CommunityDetailProp>();
  const [commentData, setCommentData] = useState<CommentDataProp[]>([]);
  const [replyData, setreplyData] = useState<CommentDataProp[]>([]);
  const ACCESS_TOKEN = localStorage.getItem("token");
  const [communityCommentLayer, setCommunityCommentLayer] = useState<number>(1);
  const [currentCommunitySeq, setCurrentCommunitySeq] = useState<number>(0);
  const [currentCommentSeq, setCurrentCommentSeq] = useState<number>(0);
  const [commentPostData, setCommentPostData] = useState<CommentPostDataProp>();
  const [currentCommunityIdx, setCurrentCommunityIdx] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");
  const [test, setTest] = useState(1);
  const [time, setTime] = useState<string>("");
  const [communityTime, setCommunityTime] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(test);
  }, [test]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll, true);
  }, []);
  //현재 시간 가져오기
  const getNowTime = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var hours = ("0" + today.getHours()).slice(-2);
    var minutes = ("0" + today.getMinutes()).slice(-2);
    var seconds = ("0" + today.getSeconds()).slice(-2);

    var dateString = year + "-" + month + "-" + day;
    var timeString = hours + ":" + minutes + ":" + seconds;
    setTime(dateString + " " + timeString);
  };
  //시간차 계산하기
  const option = {
    lang: undefined,
    objectTime: time,
    calculate: {
      justNow: 3601,
    },
  };

  //인피니티 스크롤
  const infiniteScroll = async () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setTest((e) => e + 1);
    }
  };

  //커뮤니티 게시글 가져오기

  const fetchData = async (page: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `https://k6e101.p.ssafy.io/api/community`,
        params: {
          page: page,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          setItemData((curItemData) => [...curItemData, ...res.data.content]); // state에 추가
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //커뮤니티 게시글 삭제하기
  const deleteCommunity = async (communitySeq: number) => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/api/community/${communitySeq}`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => {
        setModalStatus((prev: any) => !prev);
        var array = [...itemData];
        array.splice(currentCommunityIdx, 1);
        setItemData(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 삭제하기
  const deleteComment = async (communityCommentSeq: number) => {
    axios({
      method: "patch",
      url: `http://localhost:8080/api/community/comment/${communityCommentSeq}`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((res) => {
        getComments(currentCommunitySeq);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //댓글 가져오기
  const getComments = async (communitySeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/comment/${communitySeq}`,
        params: {
          page: 0,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log("댓글 데이터", res);
          setCommentData(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //대댓글 가져오기
  const getReplyComments = async (communityCommentSeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/comment/layer/${communityCommentSeq}`,
        params: {
          page: 0,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log("대댓글 데이터", res);
          setreplyData(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //게시글 상세 정보 받아오기
  const getDetail = async (communitySeq: number, idx: number) => {
    setCurrentCommunityIdx(idx);
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
          setModalStatus((prev: any) => !prev);
          getComments(communitySeq);
          setCurrentCommunitySeq(communitySeq);
          console.log(res.data.communityRegedAt, "게시글 상세 데이터");
          let temp = TimeCounting(res.data.communityRegedAt, option);
          setCommunityTime(temp);
          sessionStorage.setItem("communitySeq", communitySeq.toString());
          getNowTime();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 답글 달기

  const tagUser = (userName: string, communityCommentSeq: number) => {
    setInputVal("@" + userName + " ");
    setCommunityCommentLayer(3);
    setCurrentCommentSeq(communityCommentSeq);
  };
  //댓글 입력
  const onChangeText = (content: string) => {
    setInputVal(content);
    if (communityCommentLayer === 3) {
      setCommentPostData({
        communityCommentDesc: content,
        communityCommentLayer: communityCommentLayer,
        communitySeq: currentCommunitySeq,
        communityCommentSeq: currentCommentSeq,
      });
    } else {
      setCommentPostData({
        communityCommentDesc: content,
        communityCommentLayer: communityCommentLayer,
        communitySeq: currentCommunitySeq,
        communityCommentSeq: currentCommentSeq,
      });
    }

    console.log(commentPostData, "댓글데이터");
  };

  //댓글 작성하기
  const createComment = async () => {
    if (commentPostData !== undefined) {
      await axios({
        method: "post",
        url: `http://k6e101.p.ssafy.io/api/community/comment`,
        data: commentPostData,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          getComments(currentCommunitySeq);
          setInputVal("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Button = () => {
    if (inputVal) {
      return (
        <div style={{ color: "#0095f6" }} onClick={createComment}>
          게시
        </div>
      );
    } else {
      return <div>게시</div>;
    }
  };

  // collapse
  const [open, setOpen] = useState("");
  const toggle = (className: any) => {
    if (open === className) {
      setOpen("");
    } else {
      setOpen(className);
    }
  };

  // 모달
  const [modalStatus, setModalStatus] = useState(false);
  const handleOpen = () => setModalStatus(true);
  const handleClose = () => setModalStatus(false);

  useEffect(() => {}, [modalStatus]);

  return (
    <ImageList sx={{ height: "100%" }} variant="quilted" cols={5}>
      {itemData.map((item, idx) => {
        return (
          <div key={item.communitySeq}>
            <CustomImageListItem cols={item.cols || 1} rows={item.rows || 1}>
              <img
                {...srcset(
                  item.communityImg[0].communityImgUrl,
                  121,
                  item.rows,
                  item.cols
                )}
                alt={item.communityTitle}
                loading="lazy"
                onClick={() => {
                  getDetail(item.communitySeq, idx);
                }}
              />

              <div className="inner-content">
                <div>{item.communityTitle}</div>
              </div>
            </CustomImageListItem>
            <Modal
              open={modalStatus}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Wrapper>
                  <div className="leftDetailBox" style={{ overflow: "hidden" }}>
                    <StyledSlider {...settings}>
                      {itemDetail?.communityImg.map((item, idx) => {
                        return (
                          <div key={idx}>
                            <img src={item.communityImgUrl} alt="" />
                          </div>
                        );
                      })}
                    </StyledSlider>
                  </div>
                  <div
                    className="rightDetailBox"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      className="rightDetailBoxTop"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div>
                        <img
                          src={itemDetail?.userProfileImg}
                          alt=""
                          width="32"
                          height="32"
                          style={{ marginRight: "14px" }}
                        />
                        {itemDetail?.userNickname}
                      </div>
                      {itemDetail?.userNickname ===
                        sessionStorage.getItem("userNickname") && (
                        <div>
                          <button
                            onClick={() => {
                              navigate("/community/update", {
                                state: {
                                  desc: itemDetail?.communityDesc,
                                  title: itemDetail.communityTitle,
                                  img: itemDetail?.communityImg,
                                },
                              });
                            }}
                          >
                            수정
                          </button>

                          <button
                            onClick={() => {
                              deleteCommunity(itemDetail.communitySeq);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="rightDetailBoxMiddle">
                      <div className="postWriter" style={{ display: "flex" }}>
                        <img
                          src={itemDetail?.userProfileImg}
                          alt=""
                          width="32"
                          height="32"
                        />
                        <div style={{ marginLeft: "14px" }}>
                          {itemDetail?.userNickname}
                        </div>
                        <div style={{ marginLeft: "14px" }}>
                          <div>{itemDetail?.communityDesc}</div>
                          {itemDetail ? (
                            <div style={{ marginTop: "10px" }}>
                              {communityTime}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="replys">
                        {commentData.map((e: any, idx) => {
                          return (
                            <div className="replyFrame" key={idx}>
                              {e.communityCommentIsDelete ? (
                                <div className="replysInfo">
                                  <div style={{ borderRadius: "70%" }}>
                                    <img
                                      src={e.userProfileImg}
                                      alt=""
                                      width="32"
                                      height="32"
                                    />
                                  </div>
                                  <span style={{ marginLeft: "14px" }}>
                                    {e.userNickname}
                                  </span>

                                  <div>
                                    <div style={{ marginLeft: "14px" }}>
                                      {e.communityCommentDesc}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="replysInfo">
                                  <div style={{ borderRadius: "70%" }}>
                                    <img
                                      src={e.userProfileImg}
                                      alt=""
                                      width="32"
                                      height="32"
                                    />
                                  </div>
                                  <span style={{ marginLeft: "14px" }}>
                                    {e.userNickname}
                                  </span>

                                  <div>
                                    <div style={{ marginLeft: "14px" }}>
                                      {e.communityCommentDesc}
                                      {e.userNickname ===
                                        sessionStorage.getItem(
                                          "userNickname"
                                        ) && (
                                        <button
                                          onClick={() => {
                                            deleteComment(
                                              e.communityCommentSeq
                                            );
                                          }}
                                        >
                                          삭제
                                        </button>
                                      )}
                                    </div>
                                    <div style={{ margin: "10px 0 0 14px" }}>
                                      <span>
                                        {TimeCounting(
                                          e.communityCommentRegedAt,
                                          option
                                        )}
                                      </span>
                                      <span
                                        style={{ marginLeft: "15px" }}
                                        onClick={() =>
                                          tagUser(
                                            e.userNickname,
                                            e.communityCommentSeq
                                          )
                                        }
                                      >
                                        답글 달기
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        margin: "10px 0 10px 14px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          borderBottom: "2px solid #e3e3e3",
                                          width: "40px",
                                          height: "13px",
                                        }}
                                      ></div>
                                      <span
                                        style={{ marginLeft: "15px" }}
                                        onClick={() => {
                                          getReplyComments(
                                            e.communityCommentSeq
                                          );
                                          toggle(e.communityCommentSeq);
                                        }}
                                      >
                                        답글 보기
                                      </span>
                                    </div>
                                    {open === e.communityCommentSeq ? (
                                      <div
                                        style={{ margin: "12px 0 12px 14px" }}
                                      >
                                        <div>
                                          {replyData.map((ele: any) => {
                                            return (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  margin: "20px 0",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    borderRadius: "70%",
                                                  }}
                                                >
                                                  <img
                                                    src={ele.userProfileImg}
                                                    alt=""
                                                    width="32"
                                                    height="32"
                                                  />
                                                </div>
                                                <div
                                                  style={{
                                                    marginLeft: "14px",
                                                  }}
                                                >
                                                  {ele.userNickname}
                                                </div>
                                                <div
                                                  style={{
                                                    marginLeft: "14px",
                                                  }}
                                                >
                                                  {ele.communityCommentDesc}
                                                  {e.userNickname ===
                                                    sessionStorage.getItem(
                                                      "userNickname"
                                                    ) && (
                                                    <button
                                                      onClick={() => {
                                                        deleteComment(
                                                          ele.communityCommentSeq
                                                        );
                                                      }}
                                                    >
                                                      삭제
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              )}

                              <div></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        bottom: "0px",
                        borderTop: "1px solid #e3e3e3",
                        height: "50px",
                        paddingRight: "16px",
                        paddingLeft: "16px",
                      }}
                    >
                      <div className="inputBox">
                        <input
                          type="text"
                          value={inputVal}
                          onChange={(e) => {
                            onChangeText(e.target.value);
                          }}
                          onKeyPress={(e) => {
                            if (e.code === "Enter") createComment();
                          }}
                        />
                        <Button />
                      </div>
                    </div>
                  </div>
                </Wrapper>
              </Box>
            </Modal>
          </div>
        );
      })}
    </ImageList>
  );
}
interface sizeDataProp {
  rows: number;
  cols: number;
}
const sizeData: sizeDataProp[] = [];
// const itemData = [
//   {
//     img: image66,
//     title: "sample",
//     rows: 2,
//     cols: 2,
//     id: 1,
//   },
//   {
//     img: image67,
//     title: "sample",
//     id: 2,
//   },
//   {
//     img: image68,
//     title: "sample",
//     cols: 2,
//     id: 3,
//   },
//   {
//     img: image69,
//     title: "sample",
//     cols: 3,
//     id: 4,
//   },
//   {
//     img: image70,
//     title: "sample",
//     cols: 3,
//     id: 5,
//   },
//   {
//     img: image71,
//     title: "sample",
//     id: 6,
//   },
//   {
//     img: image67,
//     title: "sample",
//     id: 7,
//   },
// ];
