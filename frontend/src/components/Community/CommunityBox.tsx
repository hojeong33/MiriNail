import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
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
          {" "}
          <Typography variant="h5">공유</Typography>
          <Typography variant="h6">내가 얻은 정보를 공유해봐요</Typography>
        </Item>
        <Item>자랑</Item>
        <Item>대화</Item>
        <Item>기록</Item>
      </Stack>
    </div>
  );
};
export default CommunityBox;
