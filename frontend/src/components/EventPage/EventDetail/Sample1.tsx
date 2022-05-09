import Header from "../Header";
import bg1 from "../../../assets/img/new_bg1.jpg";
const Sample1 = () => {
  const isShow = false;
  const title = "오픈 기념 7일 페스티벌!";
  return (
    <>
      <Header isShow={isShow} title={title}></Header>
      <img src={bg1} alt="" style={{ width: "50%", height: "50%" }} />
    </>
  );
};
export default Sample1;
