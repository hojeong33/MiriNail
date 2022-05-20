import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Divider = styled.div`
  margin: 15px auto;
  width: 30px;
  border-bottom: 3px solid #3d3c3a;
`;

const CommunityTitle = () => {
  return (
    <div style={{ marginTop: "10%", textAlign: "center" }}>
      <Divider />
      <Typography
        variant="h3"
        style={{ fontFamily: "Playfair Display, serif", fontWeight: "600" }}
      >
        COMMUNITY
      </Typography>
      <div>다른 사용자와 소통해보세요</div>
    </div>
  );
};
export default CommunityTitle;
