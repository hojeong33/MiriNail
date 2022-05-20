import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import talk from "../../assets/img/talk.png";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "300px",
  height: "200px",
  border: "0.1rem solid #C4C4C4",
  borderRadius: "0",
  boxShadow: "none",
}));

const CommunityBox = () => {
  return (
    <div
      style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>
          <div style={{ position: "relative" }}>
            <img src={talk} alt="" />
            <Typography
              variant="h5"
              style={{
                position: "absolute",
                marginTop: "-23%",
                marginLeft: "47%",
              }}
            >
              1
            </Typography>
          </div>
          <Typography variant="h5">공유</Typography>
          <Typography variant="subtitle1">내가 얻은 정보를</Typography>
          <Typography variant="subtitle1">공유해봐요</Typography>
        </Item>
        <Item>
          <div style={{ position: "relative" }}>
            <img src={talk} alt="" />
            <Typography
              variant="h5"
              style={{
                position: "absolute",
                marginTop: "-23%",
                marginLeft: "47%",
              }}
            >
              2
            </Typography>
          </div>
          <Typography variant="h5">자랑</Typography>
          <Typography variant="subtitle1">예쁜 나의 네일을 </Typography>
          <Typography variant="subtitle1">자랑해봐요</Typography>
        </Item>
        <Item>
          <div style={{ position: "relative" }}>
            <img src={talk} alt="" />
            <Typography
              variant="h5"
              style={{
                position: "absolute",
                marginTop: "-23%",
                marginLeft: "47%",
              }}
            >
              3
            </Typography>
          </div>
          <Typography variant="h5">대화</Typography>
          <Typography variant="subtitle1">다른 유저와 의견을</Typography>
          <Typography variant="subtitle1">나눠봐요</Typography>
        </Item>
        <Item>
          <div style={{ position: "relative" }}>
            <img src={talk} alt="" />
            <Typography
              variant="h5"
              style={{
                position: "absolute",
                marginTop: "-23%",
                marginLeft: "47%",
              }}
            >
              4
            </Typography>
          </div>
          <Typography variant="h5">기록</Typography>
          <Typography variant="subtitle1">나의 네일 이야기를</Typography>
          <Typography variant="subtitle1">기록해봐요</Typography>
        </Item>
      </Stack>
    </div>
  );
};
export default CommunityBox;
