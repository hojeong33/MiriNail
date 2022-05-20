import { useEffect, useState } from "react";
import BestReviewCarousels from "./BestReviewCarousels";
import BestReviewTitle from "./BestReviewTitle";
import axios from "axios";
interface BestReviewProps {
  nailart: NailArtProps;
  designerNickname: string;
}
interface NailArtProps {
  designerSeq: number;
  nailartAvailable: false;
  nailartColor: string;
  nailartDesc: string;
  nailartDetailColor: string;
  nailartName: string;
  nailartPrice: number;
  nailartRating: number;
  nailartRegedAt: null;
  nailartSeq: number;
  nailartThumbnailUrl: string;
  nailartType: string;
  nailartWeather: string;
}

const BestReview = () => {
  const [bestReview, setBestReview] = useState<BestReviewProps[]>([]);
  // 베스트 리뷰 데이터 가져오기
  const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("token");
  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `https://k6e101.p.ssafy.io/api/review/cnt`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => {
          console.log(res, "!!!!!!!!!!!!!");
          setBestReview(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    console.log("베스트 리뷰 데이터 가져오기");
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        paddingBottom: "250px",
        paddingTop: "50px",
        paddingLeft: "20%",
      }}
    >
      <BestReviewTitle></BestReviewTitle>
      <BestReviewCarousels items={bestReview}></BestReviewCarousels>
    </div>
  );
};
export default BestReview;
