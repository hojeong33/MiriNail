import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUserCommunity } from "../../store/apis/community";
import { TailSpin } from "react-loader-spinner";
import { convertDate } from "../Commons/functions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

interface IState {
  post: {
    no: number;
    title: string;
    date: string;
  };
}

interface CommunityImgProp {
  communityImgSeq: number;
  communityImgUrl: string;
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

const Mypost = () => {
  const [posts, setPosts] = useState<IState["post"][]>([
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
    {
      no: 10,
      title: "네일자랑글",
      date: "2022.03.28",
    },
  ]);
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const [commentData, setCommentData] = useState<CommentDataProp[]>([]);
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("token");
  const [itemDetail, setItemDetail] = useState<CommunityDetailProp>();
  const [currentCommunitySeq, setCurrentCommunitySeq] = useState<number>(0);
  const [communityCommentLayer, setCommunityCommentLayer] = useState<number>(1);
  const [currentCommentSeq, setCurrentCommentSeq] = useState<number>(0);
  const [replyData, setreplyData] = useState<CommentDataProp[]>([]);
  // 모달
  const [modalStatus, setModalStatus] = useState(false);
  const handleOpen = () => setModalStatus(true);
  const handleClose = () => setModalStatus(false);

  const { data, isLoading } = useQuery<any, Error>(
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

  const getComments = async (communitySeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/comment/${communitySeq}`,
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

  //게시글 상세 정보 받아오기
  const getDetail = async (communitySeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/${communitySeq}`,
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

  const getReplyComments = async (communityCommentSeq: number) => {
    if (ACCESS_TOKEN) {
      axios({
        method: "get",
        url: `http://k6e101.p.ssafy.io/api/community/comment/layer/${communityCommentSeq}`,
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

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    setPage(page);
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
        url: `http://k6e101.p.ssafy.io/api/community/comment`,
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

  // 답글 달기
  const [inputVal, setInputVal] = useState("");
  const tagUser = (userName: string, communityCommentSeq: number) => {
    setInputVal("@" + userName + " ");
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
                <tr key={idx} onClick={() => getDetail(post.communitySeq)}>
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
