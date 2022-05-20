import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  :hover {
    background-color: #333;
    color: #fff;
  }
`;
const CommunityTitle = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: "3rem", fontWeight: "500" }}>COMMUNITY</div>
      <div style={{ fontSize: "1.25rem", fontWeight: "400" }}>
        다른 사용자와 소통해보세요
      </div>
      <Btn
        style={{
          border: "0.1rem solid",
          padding: "8px 30px",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/community`)}
      >
        VIEW MORE
      </Btn>
    </div>
  );
};
export default CommunityTitle;
