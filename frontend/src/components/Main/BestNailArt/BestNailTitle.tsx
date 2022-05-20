import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  :hover {
    background-color: #333;
    color: #fff;
  }
`;
const BestNailTitle = () => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "20PX" }}>
      <div style={{ fontSize: "3rem", fontWeight: "500" }}>BEST</div>
      <div style={{ fontSize: "3rem", fontWeight: "500" }}>NAIL ART</div>
      <div style={{ fontSize: "1.25rem", fontWeight: "400" }}>네일 베스트</div>
      <Btn
        style={{
          border: "0.1rem solid",
          marginTop: "10px",
          padding: "4px 15px",
        }}
        onClick={() => navigate("/nft")}
      >
        VIEW MORE
      </Btn>
    </div>
  );
};
export default BestNailTitle;
