import BestNailContent from "./BestNailContent";
import BestNailTitle from "./BestNailTitle";

const BestNailArt = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 0px",
      }}
    >
      <BestNailTitle></BestNailTitle>
      <BestNailContent></BestNailContent>
    </div>
  );
};
export default BestNailArt;
