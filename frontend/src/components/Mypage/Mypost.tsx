import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserCommunity } from "../../store/apis/community";
import { TailSpin } from "react-loader-spinner";
import { convertDate } from "../Commons/functions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Slider from "react-slick";
import TimeCounting from "time-counting";

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 10px;
  }
  height: 100%;
  .slick-list {
    height: 100%;
  }
  .slick-track {
    height: 100%;
    div {
      height: 100%;
    }
  }
  img {
    height: 100%;
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

const TableWrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .count {
    text-align: start;
    padding: 10px;
    font-size: 20px;
    margin: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  .table {
    width: 90%;
    /* border: 1px solid black; */
    table {
      width: 100%;
      border-top: 1px solid #3d3c3a;
      color: #3d3c3a;
      thead {
        font-weight: 500;
        background-color: #f8f8fa;
      }
      th {
        font-size: 14px;
        text-align: center;
        border-bottom: 1px solid #d2d2d0;
        padding: 20px 0px;
        font-weight: 500;
      }
      tbody {
        .title {
          cursor: pointer;
        }
        tr {
          cursor: pointer;
          :hover {
            background-color: #f8f8fa;
          }
        }
      }
    }
  }
  .pagination {
    margin: 20px 0;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;

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

const Mypost = () => {
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
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
  const [test, setTest] = useState(1);
  const [time, setTime] = useState<string>("");
  const [communityTime, setCommunityTime] = useState<string>("");
  const [tagName, setTagName] = useState("");
  const navigate = useNavigate();


  // 모달
  const [modalStatus, setModalStatus] = useState(false);
  const handleOpen = () => setModalStatus(true);
  const handleClose = () => {
    setModalStatus(false);

    setOpen("");
    setTagName("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      justNow: 60,
    },
  };

  const { data, isLoading, refetch } = useQuery<any, Error>(
    ["post", page],
    async () => {
      return await getUserCommunity(page, 10);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setLastPage(res.totalPages);
        // setNailarts(res.content);
      },
      onError: (err: any) => console.log(err),
    }
  );

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
        refetch();
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
        {
          communityCommentLayer === 3
            ? getReplyComments(communityCommentSeq)
            : getComments(currentCommunitySeq);
        }
        setOpen("");
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
        url: `http://localhost:8080/api/community/comment/${communitySeq}`,
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

  //게시글 상세 정보 받아오기
  const getDetail = async (communitySeq: number, idx: number) => {
    setCurrentCommunityIdx(idx);
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://localhost:8080/api/community/${communitySeq}`,
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
          console.log(time, "시간");
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
        url: `http://localhost:8080/api/community/comment/layer/${communityCommentSeq}`,
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

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setPage(page);
  };

  const Button = () => {
    if (inputVal) {
      return (
        <div
          style={{ color: "#0095f6", width: "100px", marginLeft: "5px" }}
          onClick={createComment}
        >
          게시
        </div>
      );
    } else {
      return <div style={{ width: "100px", marginLeft: "5px" }}>게시</div>;
    }
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
        url: `http://localhost:8080/api/community/comment`,
        data: commentPostData,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          getComments(currentCommunitySeq);
          setInputVal("");
          setOpen("");
          setTagName("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 답글 달기
  const [inputVal, setInputVal] = useState("");
  const tagUser = (userName: string, communityCommentSeq: number) => {
    setTagName("@" + userName + " ");
    // setInputVal("@" + userName + " ");
    setCommunityCommentLayer(3);
    setCurrentCommentSeq(communityCommentSeq);
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
  return isLoading ? (
    <LoadingBox className="loading">
      <TailSpin height={50} width={50} color="gray" />
    </LoadingBox>
  ) : (
    <TableWrapper>
      <div className="table">
        <div className="count">
          총 {data.totalElements ? data.totalElements : "0"} 건
        </div>
        <table>
          <colgroup>
            <col width="5%" />
            <col width="15%" />
            <col width="60%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>작성자</th>
              <th>제목</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {data.content?.map((post: any, idx: any) => {
              return (
                <tr key={idx} onClick={() => getDetail(post.communitySeq, idx)}>
                  <th>{post.communitySeq}</th>
                  <th>{post.userNickname}</th>
                  <th className="title">{post.communityTitle}</th>
                  <th>
                    {moment(convertDate(post.communityRegedAt)).format(
                      "YYYY-MM-DD HH:mm"
                    )}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
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
                  return <img src={item.communityImgUrl} alt="" />;
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
                    style={{
                      marginRight: "14px",
                      width: "32px",
                      height: "32px",
                    }}
                  />
                  <div>{itemDetail?.userNickname}</div>
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
                      style={{ marginRight: "10px" }}
                    >
                      수정
                    </button>

                    <button
                      onClick={() => {
                        deleteCommunity(itemDetail.communitySeq);
                      }}
                      style={{ marginRight: "10px" }}
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
                    style={{ width: "32px", height: "32px" }}
                  />
                  <div style={{ marginLeft: "14px", whiteSpace: "nowrap" }}>
                    {itemDetail?.userNickname}
                  </div>
                  <div style={{ marginLeft: "14px" }}>
                    <div>{itemDetail?.communityDesc}</div>
                    {itemDetail ? (
                      <div style={{ marginTop: "10px" }}>{communityTime}</div>
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
                            <span
                              style={{
                                marginLeft: "14px",
                                whiteSpace: "nowrap",
                              }}
                            >
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
                            <span
                              style={{
                                marginLeft: "14px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {e.userNickname}
                            </span>

                            <div>
                              <div style={{ marginLeft: "14px" }}>
                                {e.communityCommentDesc}
                                {e.userNickname ===
                                  sessionStorage.getItem("userNickname") && (
                                  <button
                                    onClick={() => {
                                      deleteComment(e.communityCommentSeq);
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
                                {open == e.communityCommentSeq ? (
                                  <span
                                    style={{ marginLeft: "15px" }}
                                    onClick={() => {
                                      getReplyComments(e.communityCommentSeq);
                                      toggle(e.communityCommentSeq);
                                    }}
                                  >
                                    댓글 닫기
                                  </span>
                                ) : (
                                  <span
                                    style={{ marginLeft: "15px" }}
                                    onClick={() => {
                                      getReplyComments(e.communityCommentSeq);
                                      toggle(e.communityCommentSeq);
                                    }}
                                  >
                                    댓글 보기
                                  </span>
                                )}
                              </div>
                              {open === e.communityCommentSeq ? (
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
                                              margin: "0px 10px",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            {ele.userNickname}
                                          </div>
                                          {!ele.communityCommentIsDelete && (
                                            <div
                                              style={{
                                                color: "rgb(11 122 227)",
                                                whiteSpace: "nowrap",
                                              }}
                                            >
                                              @{e.userNickname}
                                            </div>
                                          )}
                                          <div
                                            style={{
                                              marginLeft: "7px",
                                            }}
                                          >
                                            {ele.communityCommentDesc}
                                            {ele.communityCommentIsDelete ? (
                                              <></>
                                            ) : (
                                              <>
                                                {" "}
                                                {ele.userNickname ===
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
                                              </>
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
                  {tagName && (
                    <div
                      style={{
                        color: "rgb(11 122 227)",
                        width: "150px",
                      }}
                    >
                      {tagName}
                      <button
                        onClick={() => {
                          setTagName("");
                          setCommunityCommentLayer(1);
                        }}
                      >
                        x
                      </button>
                    </div>
                  )}

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
        <Stack spacing={2}>
          <Pagination
            count={lastPage}
            shape="rounded"
            onChange={onchangePage}
          />
        </Stack>
      </div>
    </TableWrapper>
  );
};
export default Mypost;
