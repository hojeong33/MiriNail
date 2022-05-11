import Header from "../Header";
import bg3 from "../../../assets/img/new_event3.png";
const Sample3 = () => {
  const isShow = false;
  const title = "베스트 NFT & AR 이벤트";
  const days = "2022.05.12 - 2022.05.31";
  return (
    <>
      <Header isShow={isShow} title={title} days={days}></Header>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <img
          src={bg3}
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
export default Sample3;
