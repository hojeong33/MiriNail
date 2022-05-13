import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const BestNailTitle = () => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "20PX" }}>
      <Typography variant="h3">BEST</Typography>
      <Typography variant="h3">NAIL ART</Typography>
      <Typography variant="h6">네일 베스트</Typography>
      <button
        style={{
          border: "0.1rem solid",
          padding: "4px 15px",
        }}
      >
        <Typography variant="button" onClick={() => navigate("/nft")}>
          VIEW MORE
        </Typography>
      </button>
    </div>
  );
};
export default BestNailTitle;
