import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export interface CommunityContentProps {
  img: string;
  id: number;
}
const CommunityContent = () => {
  //소통게시글 데이터 가져오기
  // const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("token");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (ACCESS_TOKEN) {
  //       const result = await axios({
  //         method: "get",
  //         url: `http://localhost:8080/api/community/`,
  //         headers: {
  //           Authorization: `Bearer ${ACCESS_TOKEN}`,
  //         },
  //       });
  //       console.log(result);
  //     }
  //   };
  //   fetchData();
  //   console.log("소통게시글 데이터 가져오기");
  // }, []);
  //최신 소통게시글 20개
  const contents: CommunityContentProps[] = [
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
    {
      img: "https://image.msscdn.net/data/curating/15661/15661_1_org.jpg",
      id: 1,
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ImageList
        sx={{ width: 800, height: 630, overflowY: "hidden" }}
        cols={5}
        rowHeight={50}
      >
        {contents.map((item, idx) => (
          <ImageListItem key={idx}>
            <img src={item.img} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default CommunityContent;
