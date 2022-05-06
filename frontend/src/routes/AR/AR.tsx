import AR_bg from "../../assets/img/AR_bg.png";
import ArCard from "../../components/AR/ArCard";
const AR = () => {
  return (
    <div>
      <img
        src={AR_bg}
        alt=""
        style={{ position: "absolute", width: "100%", height: "80%" }}
      />
      <ArCard />
    </div>
  );
};
export default AR;
