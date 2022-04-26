import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export interface BestNailProps {
  img: string;
  name: string;
  price: number;
  tags: Array<string>;
}
const BestNailContent = () => {
  const bestNail: BestNailProps[] = [
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
    {
      img: "https://i.pinimg.com/originals/25/ce/ee/25ceee9b74f98d121484e38553ab443a.jpg",
      name: "글레이즈-레드",
      price: 5000,
      tags: ["#겨울", "#Designer1"],
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      {bestNail.map((item, idx) => (
        <Grid key={idx} style={{ margin: "20PX" }}>
          <img
            src={item.img}
            alt=""
            style={{ width: "250px", height: "250px" }}
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Typography>{item.name}</Typography>
            <Typography>{item.price}원</Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {item.tags.map((tag, i) => (
                <Typography style={{ margin: "0px 2px" }} key={i}>
                  {tag}
                </Typography>
              ))}
            </div>
          </div>
        </Grid>
      ))}
    </div>
  );
};
export default BestNailContent;
