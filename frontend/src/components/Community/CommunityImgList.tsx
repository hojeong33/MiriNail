import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import image66 from "../../assets/img/sample/image66.png";
import image67 from "../../assets/img/sample/image67.png";
import image68 from "../../assets/img/sample/image68.png";
import image69 from "../../assets/img/sample/image69.png";
import image70 from "../../assets/img/sample/image70.png";
import image71 from "../../assets/img/sample/image71.png";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { fetchDesigns } from "../../store/api";

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
    communityRededAt: Array<object>;
  }
  interface CommentDataProp {
    communityCommentSeq: number;
    userSeq: number;
    userNickname: string;
    userProfileImg: string;
    communityCommentDesc: string;
  }

  const [itemData, setItemData] = useState<CommunityItemProp[]>([]);
  const [itemDetail, setItemDetail] = useState<CommunityDetailProp>();
  const [commentData, setCommentData] = useState<CommentDataProp[]>([]);
  const [replyData, setreplyData] = useState<CommentDataProp[]>([]);
  const observerRef = React.useRef<IntersectionObserver>();
  const boxRef = React.useRef<HTMLDivElement>(null);
  const ACCESS_TOKEN = localStorage.getItem("token");
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(4);
  const [totalitem, setTotalItem] = React.useState(9999);
  const [totalPage, setTotalPage] = React.useState(9999);
  const [communityCommentLayer, setCommunityCommentLayer] = useState<number>(1);
  const [currentCommunitySeq, setCurrentCommunitySeq] = useState<number>(0);
  const [currentCommentSeq, setCurrentCommentSeq] = useState<number>(0);

  useEffect(() => {
    fetchData(page);
    setPage(page + 1);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [itemData]);

  const fetchData = async (page: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/community`,
        params: {
          page: page,
          size: 20,
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setTotalPage(res.data.totalPages);
          setPage(page + 1);
          setItemData((curItemData) => [...curItemData, ...res.data.content]); // state에 추가
          setTotalItem(res.data.totalElements);
          console.log(page, "page");
          console.log(size, "size");
          console.log(totalPage, "totalPage");
          console.log(totalitem, "totalItem");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && page <= totalPage) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target); // entry 관찰 해제
        if (size * (page + 1) > totalitem) {
          setSize(totalitem - (page + 1) * size);
        }
        fetchData(page); // 데이터 가져오기
      }
    });
  };

  const getComments = async (communitySeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/community/comment/${communitySeq}`,
        params: {
          page: 0,
          size: 1,
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

  const getReplyComments = async (communityCommentSeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/community/comment/layer/${communityCommentSeq}`,
        params: {
          page: 0,
          size: 1,
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
  const getDetail = async (communitySeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/community/${communitySeq}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log("디테일 데이터", res);
          setItemDetail(res.data);
          setModalStatus((prev: any) => !prev);
          getComments(communitySeq);
          setCurrentCommunitySeq(communitySeq);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // 답글 달기
  const [inputVal, setInputVal] = useState("");
  const tagUser = (userName: string, communityCommentSeq: number) => {
    setInputVal("@" + userName + " ");
    setCommunityCommentLayer(3);
    setCurrentCommentSeq(communityCommentSeq);
  };

  //댓글 작성
  const createComment = async () => {
    const data: object = {
      communityCommentDesc: inputVal,
      communityCommentLayer: communityCommentLayer,
      communitySeq: currentCommunitySeq,
    };
    // if(communityCommentLayer===3){
    //   data[]
    // }
    console.log(inputVal);
    console.log(communityCommentLayer);
    console.log(currentCommunitySeq);
    if (ACCESS_TOKEN) {
      axios({
        method: "post",
        url: `http://localhost:8080/api/community/comment`,
        data: {
          communityCommentDesc: inputVal,
          communityCommentLayer: communityCommentLayer,
          communitySeq: currentCommunitySeq,
        },
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log(res);
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
  useEffect(() => {
    console.log(modalStatus);
  }, [modalStatus]);

  return (
    <ImageList
      sx={{ height: "100%" }}
      variant="quilted"
      cols={5}
      //   rowHeight={500}
    >
      {itemData.map((item) => {
        return (
          <div ref={boxRef} key={item.communitySeq}>
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
                onClick={() => getDetail(item.communitySeq)}
              />
              <div className="inner-content">
                <span>{item.communityTitle}</span>
              </div>
            </CustomImageListItem>
          </div>
        );
      })}
      <Modal
        open={modalStatus}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Wrapper>
            <div className="leftDetailBox">
              <img src={itemDetail?.communityImg[0].communityImgUrl}></img>
              {/* {itemDetail.communityImg.map((img, idx) => {
                <img src={img.communityImgUrl} alt="" />;
              })} */}
            </div>
            <div
              className="rightDetailBox"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="rightDetailBoxTop">
                <img
                  src={itemDetail?.userProfileImg}
                  alt=""
                  width="32"
                  height="32"
                />
                <div style={{ marginLeft: "14px" }}>
                  {itemDetail?.userNickname}
                </div>
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
                    <div style={{ marginTop: "10px" }}>6시간</div>
                  </div>
                </div>
                <div className="replys">
                  {commentData.map((e: any, idx) => {
                    return (
                      <div className="replyFrame" key={idx}>
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
                            <div style={{ margin: "10px 0 0 14px" }}>
                              <span>6시간</span>
                              <span
                                style={{ marginLeft: "15px" }}
                                onClick={() =>
                                  tagUser(e.userNickname, e.communityCommentSeq)
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
                                  getReplyComments(e.communityCommentSeq);
                                  toggle(e.userNickname);
                                }}
                              >
                                답글 보기
                              </span>
                            </div>
                            {open === e.userNickname ? (
                              <div style={{ margin: "12px 0 12px 14px" }}>
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
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
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
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                  <Button />
                </div>
              </div>
            </div>
          </Wrapper>
        </Box>
      </Modal>
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
