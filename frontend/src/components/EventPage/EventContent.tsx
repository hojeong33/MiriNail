import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/img/new_bg1.jpg";
import bg2 from "../../assets/img/new_bg2.jpg";
import bg3 from "../../assets/img/new_bg3.jpg";
const items: Array<string> = [bg1, bg2, bg3];
interface Props {
  flag: string;
}

const EventContent = (flag: Props) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "30px" }}>
      {flag.flag === "종료된 이벤트" ? (
        <div style={{ textAlign: "center", minHeight: "500px" }}>
          종료된 이벤트가 없습니다
        </div>
      ) : (
        <>
          {items.map((item, idx) => {
            return (
              <div style={{ display: "flex", justifyContent: "center", margin: "60px 0"}}>
                <img
                  src={item}
                  alt=""
                  style={{ width: "50%", height: "50%", margin: "10px 0px", cursor: "pointer" }}
                  onClick={() => navigate(`/event/${idx + 1}`)}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default EventContent;
