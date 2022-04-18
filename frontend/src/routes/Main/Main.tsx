import Carousels from "../../components/Main/Carousels";
import bg1 from "../../assets/img/bg1.jpg";
import BestNailArt from "../../components/Main/BestNailArt/BestNailArt";
import VideoPlayer from "../../components/Main/ArVideo/ArVideo";
import HotDesigners from "../../components/Main/HotDesigners/HotDesigners";
import BestReview from "../../components/Main/BestReview/BestReview";
import Community from "../../components/Main/Community/Community";

const Main = () => {
  return (
    <>
      <div>
        <img src={bg1} alt="" style={{ position: "relative" }} />
      </div>
      {/* <Carousels></Carousels> */}
      <BestNailArt></BestNailArt>
      <VideoPlayer></VideoPlayer>
      <HotDesigners></HotDesigners>
      <BestReview></BestReview>
      <Community></Community>
    </>
  );
};

export default Main;
