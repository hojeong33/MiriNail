import { Grid, Typography } from "@mui/material";

export interface DesignersProps {
  img: string;
  id: number;
  name: string;
  followerCnt: number;
  designsCnt: number;
}
const HotDesignersContent = () => {
  const designers: DesignersProps[] = [
    {
      img: "https://img.sbs.co.kr/newsnet/etv/upload/2015/11/23/30000508778_1280.jpg",
      id: 1,
      name: "JOHN DOE",
      followerCnt: 50,
      designsCnt: 20,
    },
    {
      img: "https://img.sbs.co.kr/newsnet/etv/upload/2015/11/23/30000508778_1280.jpg",
      id: 1,
      name: "JOHN DOE",
      followerCnt: 50,
      designsCnt: 20,
    },
    {
      img: "https://img.sbs.co.kr/newsnet/etv/upload/2015/11/23/30000508778_1280.jpg",
      id: 1,
      name: "JOHN DOE",
      followerCnt: 50,
      designsCnt: 20,
    },
    {
      img: "https://img.sbs.co.kr/newsnet/etv/upload/2015/11/23/30000508778_1280.jpg",
      id: 1,
      name: "JOHN DOE",
      followerCnt: 50,
      designsCnt: 20,
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {designers.map((item, idx) => (
        <Grid key={idx} style={{ margin: "20PX" }}>
          <img
            src={item.img}
            alt=""
            style={{ width: "250px", height: "250px", position: "absolute" }}
          />
          <Typography
            variant="h5"
            style={{ position: "relative", fontWeight: "bold" }}
          >
            {item.name}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "180px",
            }}
          >
            <Typography
              style={{
                position: "relative",
                margin: "10px",
                fontWeight: "bold",
              }}
            >
              followerCnt:
              {item.followerCnt}
            </Typography>
            <Typography
              style={{
                position: "relative",
                margin: "10px",
                fontWeight: "bold",
              }}
            >
              designCnt:{item.designsCnt}
            </Typography>
          </div>
        </Grid>
      ))}
    </div>
  );
};
export default HotDesignersContent;
