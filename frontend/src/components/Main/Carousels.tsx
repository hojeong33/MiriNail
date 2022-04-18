import { styled } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import bg1 from "../../assets/img/bg1.jpg";
import bg2 from "../../assets/img/bg2.jpg";
import bg3 from "../../assets/img/bg3.jpg";

export function MainBackgroundPart({ background }: any) {
  const MainBackgroundContainerStyle = styled("div")(({ theme }) => ({
    width: "100%",
    height: 450,
  }));

  const MainBackgroundStyle = styled("img")({
    width: "100%",
  });
  return (
    <MainBackgroundContainerStyle>
      <MainBackgroundStyle src={background} alt="background" />
    </MainBackgroundContainerStyle>
  );
}

function Carousels() {
  return (
    <Carousel>
      <MainBackgroundPart background={bg1}></MainBackgroundPart>
      <MainBackgroundPart background={bg2}></MainBackgroundPart>
      <MainBackgroundPart background={bg3}></MainBackgroundPart>
    </Carousel>
  );
}
export default Carousels;
