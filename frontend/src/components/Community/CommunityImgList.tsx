import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import image66 from "../../assets/img/sample/image66.png";
import image67 from "../../assets/img/sample/image67.png";
import image68 from "../../assets/img/sample/image68.png";
import image69 from "../../assets/img/sample/image69.png";
import image70 from "../../assets/img/sample/image70.png";
import image71 from "../../assets/img/sample/image71.png";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CommunityImgList() {
  return (
    <ImageList
      //   sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={5}
      //   rowHeight={500}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: image66,
    title: "sample",
    rows: 2,
    cols: 2,
  },
  {
    img: image67,
    title: "sample",
  },
  {
    img: image68,
    title: "sample",
    cols: 2,
  },
  {
    img: image69,
    title: "sample",
    cols: 3,
  },
  {
    img: image70,
    title: "sample",
    cols: 3,
  },
  {
    img: image71,
    title: "sample",
  },
  {
    img: image67,
    title: "sample",
  },
];
