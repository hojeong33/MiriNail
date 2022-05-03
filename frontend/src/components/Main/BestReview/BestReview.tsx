import { useEffect, useState } from "react";
import BestReviewCarousels from "./BestReviewCarousels";
import BestReviewTitle from "./BestReviewTitle";
import axios from "axios";
interface BestReviewProps {
  nailart: NailArtProps;
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
        url: `http://localhost:8080/api/review/cnt`,
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
  // const bestReview: BestReviewProps[] = [
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  //   {
  //     img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
  //     name: "글레이즈-레드",
  //     price: 5000,
  //     tags: ["#겨울", "#Designer1"],
  //   },
  // ];
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
