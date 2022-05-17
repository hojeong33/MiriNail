import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { fetchDesigns } from "../../../store/api";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { bestFilter, nftFilter } from "../../../store/atoms";
import { useNavigate } from "react-router-dom";

const BestNailContent = () => {
  const navigate = useNavigate();
  // 베스트 리뷰 데이터
  const [myFilter, setMyFilter] = useRecoilState(bestFilter);
  const { isLoading: bestReviewLoading, data: bestReviewData } = useQuery(
    ["bestReview", myFilter],
    fetchDesigns
  );
  

  //베스트 네일 데이터 가져오기
  return (
    <div style={{ display: "flex" }}>
      {bestReviewData?.map((item: any, idx: number) => (
        <Grid key={idx} style={{ margin: "20PX" }}>
          <img
            src={item.nailartThumbnailUrl}
            alt=""
            style={{ width: "250px", height: "250px" }}
            onClick={() => navigate(`/nft/${item.nailartSeq}`)}
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Typography>
              {item.nailartType} - {item.nailartDetailColor}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              #{item.nailartWeather} #{item.nailartColor} #
              {item.designerNickname}
            </div>
            <Typography>
              {item.nailartPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </Typography>
          </div>
        </Grid>
      ))}
    </div>
  );
};
export default BestNailContent;
