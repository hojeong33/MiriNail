import Header from "../Header";
import bg2 from "../../../assets/img/new_event2.png";
const Sample2 = () => {
  const isShow = false;
  const title = "NEW DESIGNER 등록 이벤트!";
  const days = "2022.05.17-2022.05.31";
  return (
    <>
      <Header isShow={isShow} title={title} days={days}></Header>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <img
          src={bg2}
          alt=""
          style={{
            width: "50%",
            height: "50%",
          }}
        />
      </div>
    </>
  );
};
export default Sample2;
