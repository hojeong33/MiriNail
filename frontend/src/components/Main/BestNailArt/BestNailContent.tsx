import { Grid } from "@mui/material";
import { useEffect } from "react";
import { fetchDesigns } from "../../../store/api";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { bestFilter, nftFilter } from "../../../store/atoms";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = styled.div`
  :hover img {
    filter: brightness(30%);
  }
  button {
    display: none;
  }
  :hover button {
    display: block;
  }
`;
const BestNailContent = () => {
  const navigate = useNavigate();

  const [myFilter, setMyFilter] = useRecoilState(bestFilter);
  const { isLoading: bestReviewLoading, data: bestReviewData } = useQuery(
    ["bestReview", myFilter],
    fetchDesigns
  );
  console.log(bestReviewData, "!!!!!!!!!!!!!!!!");

  //베스트 네일 데이터 가져오기
  return (
    <div style={{ display: "flex" }}>
      {bestReviewData?.map((item: any, idx: number) => (
        <Grid key={idx} style={{ margin: "20PX" }}>
          <Item style={{ position: "relative" }}>
            <img
              src={item.nailartThumbnailUrl}
              alt=""
              style={{ width: "250px", height: "250px" }}
            />
            <button
              style={{
                border: "1px solid #fff",
                position: "absolute",
                padding: "10px 20px",
                top: "40%",
                left: "30%",
                color: "#fff",
              }}
              onClick={() => navigate(`/nft/${item.nailartSeq}`)}
            >
              Go Detail
            </button>
          </Item>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <div>
              {item.nailartType} - {item.nailartDetailColor}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              #{item.nailartWeather} #{item.nailartColor} #
              {item.designerNickname}
            </div>
            <div>
              {item.nailartPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </div>
          </div>
        </Grid>
      ))}
    </div>
  );
};
export default BestNailContent;
