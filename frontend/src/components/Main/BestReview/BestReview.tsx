import BestReviewTitle from "./BestReviewTitle";
export interface BestReviewProps {
  name: string;
  price: number;
  tags: Array<string>;
  img: string;
}
const BestReview = () => {
  const bestReview: BestReviewProps[] = [
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
  ];
  return (
    <div style={{ backgroundColor: "#333333" }}>
      <BestReviewTitle></BestReviewTitle>
    </div>
  );
};
export default BestReview;
