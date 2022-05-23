import styled from "styled-components";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IDesigner } from "../../routes/Designerpage/Designerpage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { designerAtom } from "../../store/atoms";
import { deleteFollow, postFollow } from "../../store/apis/follow";
import { useMutation, useQuery } from "react-query";
import { getDesignerinfo } from "../../store/apis/designer";
import { TailSpin } from "react-loader-spinner";
import { convertImgToThumnail } from "../Commons/functions"
const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }
  overflow: hidden;
  position: relative;
  /* height: 600px; */
  height: 450px;
  border-bottom: 1px solid #d2d2d0;
  .row {
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;
  }

  .pageHeader {
    .designername {
      font-family: "Playfair Display", serif;
      font-weight: 600;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 40px;
    width: 600px;
    margin-left: -300px;
    margin-top: -90px;
    padding-top: 20px;
    line-height: 80px;
    text-align: center;
    color: #3d3c3a;
    font-weight: 500;
    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    .buttons {
      display: flex;
      font-size: 16px;
      margin-top: 10px;
      .selected {
        background-color: #e0e0e0;
      }
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 40px;
        border: 1px solid #d2d2d0;
        svg {
          margin-right: 5px;
        }
        :hover {
          background-color: #e0e0e0;
        }
        :active {
          background-color: #d2d2d0;
        }
      }
    }
  }

  .pageHeaderNavigation {
    position: absolute;
    width: 400px;
    height: 30px;
    bottom: 10px;
    font-size: 14px;
    color: #bfbfbd;
    .NavElement {
      position: absolute;
      display: flex;
      align-items: center;
      width: 400px;
      height: 30px;
      bottom: 10px;
      font-size: 14px;
      color: #bfbfbd;
      * {
        margin-right: 15px;
      }

      span {
        margin-top: 0px;
      }
    }
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

interface IProps {
  designer?: IDesigner;
  refetch: any;
}

const Header: React.FC<IProps> = ({ refetch }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const designer = useRecoilValue(designerAtom);
  const [selected, setSelected] = useState(0);
  const [selectedByDesigner, setSelectedByDesigner] = useState(0);
  const navigate = useNavigate();
  const { userSeq } = useParams();
  const location = useLocation();
  const temp = location.pathname.split("/");
  // console.log(temp[temp.length - 1])

  const {
    data,
    isLoading,
    refetch: designerRefetch,
  } = useQuery<any, Error>(
    ["getDesigner", userSeq],
    async () => {
      return await getDesignerinfo(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        findIsFollow(res)
      },
      onError: (err: any) => console.log(err),
    }
  );

  const follow = useMutation<any, Error>(
    ["follow"],
    async () => {
      return await postFollow(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        designerRefetch();
      },
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
        }
      },
      retry : false,
    }
  );

  const unFollow = useMutation<any, Error>(
    ["unFollow"],
    async () => {
      return await deleteFollow(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        designerRefetch();
      },
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401) {
          window.location.href = "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
        }
      },
      retry : false,
    }
  );

  const onClickOneToOne = (e:any) => {
    e.preventDefault()
    const mySeq = sessionStorage.getItem("userSeq")
    if (!mySeq) {
      alert("로그인이 필요합니다.");
      window.location.replace(
        "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
      );
    } else {
      navigate("createask")
    }
  }


  const findIsFollow = (res:any) => {
    const me = Number(sessionStorage.getItem("userSeq"));
    setIsFollow(
      res.follower?.some(function (ele: any, idx: any) {
        return ele.userSeq === me;
      })
    );
  };

  const onClickFollow = () => {
    follow.mutate();
  };

  const onClickUnFollow = () => {
    unFollow.mutate();
  };

  useEffect(() => {
    // findIsFollow();
  }, [userSeq]);
  return (
    <>
      {isLoading ? (
        <LoadingBox className="loading">
          <TailSpin height={50} width={50} color="gray" />
        </LoadingBox>
      ) : (
        <Wrapper>
          <div className="row">
            <div className="pageHeader">
              <img
                src={
                  data.designerInfo.designerProfileImgUrl
                    ? data.designerInfo.designerProfileImgUrl                      
                    : "/assets/images/default_profile.png"
                }
                alt=""
              />
              <div className="designername">
                {data.designerInfo.designerShopName}
              </div>
              {sessionStorage.getItem("userSeq") === userSeq ? (
                <div className="buttons">
                  <Link to="updateimg">
                    <button
                      className={`${
                        temp[temp.length - 1] === "updateimg" ? "selected" : ""
                      }`}
                    >
                      <AccountBoxIcon />
                      사진변경
                    </button>
                  </Link>
                  <Link to="reservationcheck">
                    <button
                      className={`${
                        temp[temp.length - 1] === "reservationcheck"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <CalendarMonthIcon />
                      예약확인
                    </button>
                  </Link>
                  <Link to="followers">
                    <button
                      className={`${
                        temp[temp.length - 1] === "followers" ? "selected" : ""
                      }`}
                    >
                      <PeopleIcon />
                      팔로워들
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="buttons">
                  <Link to="createask">
                    <button
                      className={`${
                        temp[temp.length - 1] === "createask" ? "selected" : ""
                      }`}
                      onClick={(e) => onClickOneToOne(e)}
                    >
                      <CreateIcon />
                      1:1 문의
                    </button>
                  </Link>
                  <Link to="reservation">
                    <button
                      className={`${
                        temp[temp.length - 1] === "reservation"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <CalendarMonthIcon />
                      예약하기
                    </button>
                  </Link>
                  {isFollow ? (
                    <button onClick={onClickUnFollow}>
                      <FavoriteIcon color="error" />
                      언팔로우
                    </button>
                  ) : (
                    <button onClick={onClickFollow}>
                      <FavoriteBorderIcon color="error" />
                      팔로우
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="pageHeaderNavigation">
              <div className="NavElement">
                <span>DESIGNER</span>
                <ChevronRightIcon />
                <span>디자이너페이지</span>
              </div>
            </div>
          </div>
          <div></div>
        </Wrapper>
      )}
    </>
  );
};

export default Header;
