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
  // 답글 달기
  const [inputVal, setInputVal] = useState("");
  const tagUser = (userName: string) => {
    setInputVal("@" + userName + " ");
  };

  //댓글 작성
  const Button = () => {
    if (inputVal) {
      return <div style={{ color: "#0095f6" }}>게시</div>;
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
      //   sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={5}
      //   rowHeight={500}
    >
      {itemData.map((item) => (
        <CustomImageListItem
          key={item.id}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
            onClick={() => setModalStatus((prev: any) => !prev)}
          />
          <div className="inner-content">
            <span>{item.title}</span>
          </div>

          <Modal
            open={modalStatus}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Wrapper>
                <div className="leftDetailBox">
                  <img
                    src="http://img3.tmon.kr/cdn3/deals/2020/02/17/456660414/original_456660414_front_bda8d_1581922255production.jpg"
                    alt=""
                  />
                </div>
                <div
                  className="rightDetailBox"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="rightDetailBoxTop">
                    <img src={detailInfo.image} alt="" width="32" height="32" />
                    <div style={{ marginLeft: "14px" }}>
                      {detailInfo.userName}
                    </div>
                  </div>
                  <div className="rightDetailBoxMiddle">
                    <div className="postWriter" style={{ display: "flex" }}>
                      <img
                        src={detailInfo.image}
                        alt=""
                        width="32"
                        height="32"
                      />
                      <div style={{ marginLeft: "14px" }}>
                        {detailInfo.userName}
                      </div>
                      <div style={{ marginLeft: "14px" }}>
                        <div>{detailInfo.detailContent}</div>
                        <div style={{ marginTop: "10px" }}>6시간</div>
                      </div>
                    </div>
                    <div className="replys">
                      {replyData.map((e: any) => {
                        return (
                          <div className="replyFrame">
                            <div className="replysInfo">
                              <div style={{ borderRadius: "70%" }}>
                                <img
                                  src={e.image}
                                  alt=""
                                  width="32"
                                  height="32"
                                />
                              </div>
                              <span style={{ marginLeft: "14px" }}>
                                {e.userName}
                              </span>
                              <div>
                                <div style={{ marginLeft: "14px" }}>
                                  {e.replyContent}
                                </div>
                                <div style={{ margin: "10px 0 0 14px" }}>
                                  <span>6시간</span>
                                  <span
                                    style={{ marginLeft: "15px" }}
                                    onClick={() => tagUser(e.userName)}
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
                                    onClick={() => toggle(e.userName)}
                                  >
                                    답글 보기
                                  </span>
                                </div>
                                {open === e.userName ? (
                                  <div style={{ margin: "12px 0 12px 14px" }}>
                                    <div>
                                      {e.replyReply.map((ele: any) => {
                                        return (
                                          <div
                                            style={{
                                              display: "flex",
                                              margin: "20px 0",
                                            }}
                                          >
                                            <div
                                              style={{ borderRadius: "70%" }}
                                            >
                                              <img
                                                src={ele.image}
                                                alt=""
                                                width="32"
                                                height="32"
                                              />
                                            </div>
                                            <div style={{ marginLeft: "14px" }}>
                                              {ele.userName}
                                            </div>
                                            <div style={{ marginLeft: "14px" }}>
                                              {ele.replyContent}
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
        </CustomImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: image66,
    title: "sample",
    rows: 2,
    cols: 2,
    id: 1,
  },
  {
    img: image67,
    title: "sample",
    id: 2,
  },
  {
    img: image68,
    title: "sample",
    cols: 2,
    id: 3,
  },
  {
    img: image69,
    title: "sample",
    cols: 3,
    id: 4,
  },
  {
    img: image70,
    title: "sample",
    cols: 3,
    id: 5,
  },
  {
    img: image71,
    title: "sample",
    id: 6,
  },
  {
    img: image67,
    title: "sample",
    id: 7,
  },
];
const detailInfo = {
  image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
  userName: "username1",
  detailContent:
    "아 이게 내 게시물입니다. 하고싶은말 쓸거에용 아 이게 내 게시물입니다. 하고싶은말 쓸거에용 아 이게 내 게시물입니다. 하고싶은말 쓸거에용 아 이게 내 게시물입니다. 하고싶은말 쓸거에용",
};
const replyData = [
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user2",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user3",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user4",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user5",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user6",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user7",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user8",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user9",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
  {
    image:
      "http://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/06/PS21060900004.jpg",
    userName: "user10",
    replyContent:
      "저도 정말 가고싶어요 ㅇㅈ? 근데 긴 댓글이 필요해서 조금 말을 늘려볼게요. 아오 너무 귀찮아요 처음부터 잘 짜고 싶어요",
    replyReply: [
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
      {
        image: "https://img.vogue.co.kr/vogue/2021/12/style_61adc5db872b5.jpeg",
        userName: "user123",
        replyContent: "아 이게 내용입니다",
      },
    ],
  },
];
