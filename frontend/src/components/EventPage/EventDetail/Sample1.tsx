import Header from "../Header";
import bg1 from "../../../assets/img/new_event1.png";
const Sample1 = () => {
  const isShow = false;
  const title = "오픈 기념 7일 페스티벌!";
  const days = "2022.05.20 - 2022.05.27";
  return (
    <>
      <Header isShow={isShow} title={title} days={days}></Header>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "60px 0" }}
      >
        <img
          src={bg1}
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
export default Sample1;
