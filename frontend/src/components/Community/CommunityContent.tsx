import { useNavigate } from "react-router-dom";
import CommunityImgList from "./CommunityImgList2";
import styled from "styled-components";

const Btn = styled.button`
  :hover {
    background-color: #333;
    color: #fff;
  }
`;
const CommunityContent = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px",
          justifyContent: "end",
        }}
      >
        <Btn
          style={{
            border: "0.1rem solid",
            marginBottom: "50px",
            padding: "5px 0",
          }}
          onClick={() => {
            if (sessionStorage.getItem("userSeq")) {
              navigate("/community/create");
            } else {
              alert("로그인이 필요합니다.");
              window.location.replace(
                "https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
              );
            }
          }}
        >
          작성하기
        </Btn>
      </div>
      <CommunityImgList></CommunityImgList>
    </div>
  );
};
export default CommunityContent;
