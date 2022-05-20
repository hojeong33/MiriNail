import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalTest from "../../Community/Modal";
// import { convertImgToThumnail } from "../../Commons/functions";
interface CommunityImgProp {
  communityImgSeq: number;
  communityImgUrl: string;
}
interface CommunityContentProps {
  communityImg: CommunityImgProp[];
  communitySeq: number;
}
const CustomImageListItem = styled(ImageListItem)`
  .MuiImageListItem-img {
    height: 160px;
    width: 160px;
    cursor: pointer;
  }
`;
const CommunityContent = () => {
  const [contents, setContens] = useState<CommunityContentProps[]>([]);
  const [modalState, setModalState] = useState(false);
  const [curCommunitySeq, setCurCommunitySeq] = useState(0);
  // 소통게시글 데이터 가져오기
  const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("token");
  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `https://k6e101.p.ssafy.io/api/community/cnt`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          setContens(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  // 최신 소통게시글 20개

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ImageList
        sx={{ width: 820, height: 652, overflowY: "hidden" }}
        cols={5}
        rowHeight={160}
      >
        {contents.map((item, idx) => (
          <CustomImageListItem key={idx}>
            <img
              src={item.communityImg[0].communityImgUrl}
              alt=""
              onClick={() => {
                if (sessionStorage.getItem("userSeq")) {
                  setModalState((prev: any) => !prev);
                  setCurCommunitySeq(item.communitySeq);
                } else {
                  alert("로그인이 필요합니다.");
                  window.location.replace(
                    "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
                  );
                }
              }}
            />
          </CustomImageListItem>
        ))}
        {modalState && (
          <ModalTest
            itemData={contents}
            communitySeq={curCommunitySeq}
            state={modalState}
          />
        )}
      </ImageList>
    </div>
  );
};

export default CommunityContent;
