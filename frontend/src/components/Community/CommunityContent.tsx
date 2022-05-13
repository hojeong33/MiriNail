import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CommunityImgList from "./CommunityImgList2";
import axios from "axios";

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
            padding: "5px 0",
          }}
          onClick={() => {
            navigate("/community/create");
          }}
        >
          <div>작성하기</div>
        </button>
      </div>
      <CommunityImgList></CommunityImgList>
    </div>
  );
};
export default CommunityContent;
