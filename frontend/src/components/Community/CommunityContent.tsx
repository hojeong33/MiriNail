import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CommunityImgList from "./CommunityImgList";
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
        <button
          style={{
            border: "0.1rem solid",
            marginBottom: "50px",
          }}
          onClick={() => {
            navigate("/community/create");
          }}
        >
          <Typography variant="button">작성하기</Typography>
        </button>
      </div>
      <CommunityImgList></CommunityImgList>
    </div>
  );
};
export default CommunityContent;
