import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommunityTitle = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h3">COMMUNITY</Typography>
      <Typography variant="h6">다른 사용자와 소통해보세요</Typography>
      <button
        style={{
          border: "0.1rem solid",
          padding: "8px 30px",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/community`)}
      >
        <Typography variant="button" style={{ cursor: "pointer" }}>
          VIEW MORE
        </Typography>
      </button>
    </div>
  );
};
export default CommunityTitle;
