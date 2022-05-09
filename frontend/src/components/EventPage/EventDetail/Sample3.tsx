import Header from "../Header";
import bg1 from "../../../assets/img/new_bg1.jpg";
const Sample3 = () => {
  const isShow = false;
  const title = "베스트 NFT & AR 이벤트";
  return (
    <>
      <Header isShow={isShow} title={title}></Header>
      <img src={bg1} alt="" style={{ width: "50%", height: "50%" }} />
    </>
  );
};
export default Sample3;
