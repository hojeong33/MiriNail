import { Typography } from "@mui/material";

const CommunityTitle = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h3">COMMUNITY</Typography>
      <Typography variant="h6">다른 사용자와 소통해보세요</Typography>
      <button style={{ border: "0.1rem solid" }}>
        <Typography variant="button">VIEW MORE</Typography>
      </button>
    </div>
  );
};
export default CommunityTitle;
