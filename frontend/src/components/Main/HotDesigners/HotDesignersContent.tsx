import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Cards from "../../Commons/Cards";
import { getHotDesigner } from "../../../store/api";
import { useQuery } from "react-query";


export interface IHotDesigner {
  designer_seq : number;
  designerNickName : string;
  designerImgUrl : string;
  // designer_shop_name : string;
  followerNum : number;
  nailartCount : number; 
}


// export interface DesignersProps {
//   img: string;
//   id: number;
//   name: string;
//   followerCnt: number;
//   designsCnt: number;
// }
const HotDesignersContent = () => {

  //디자이너 데이터 가져오기
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
  //   console.log("디자이너 데이터 가져오기");
  // }, []);
  // const designers: IHotDesigner[] = [
  //   {
  //     designer_seq: 1,
  //     user_nickname: "Designer1",
  //     user_profile_img:
  //       "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
  //     designer_shop_name: "Nailshop1",
  //     follow_follower_length: 50,
  //     designs: 40,
  //   },
  //   {
  //     designer_seq: 2,
  //     user_nickname: "Designer1",
  //     user_profile_img:
  //       "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
  //     designer_shop_name: "Nailshop1",
  //     follow_follower_length: 50,
  //     designs: 40,
  //   },
  //   {
  //     designer_seq: 3,
  //     user_nickname: "Designer1",
  //     user_profile_img:
  //       "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
  //     designer_shop_name: "Nailshop1",
  //     follow_follower_length: 50,
  //     designs: 40,
  //   },
  //   {
  //     designer_seq: 4,
  //     user_nickname: "Designer1",
  //     user_profile_img:
  //       "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202010/22/2182ecd3-b8cc-4993-98a7-8c2568f9fbbc.jpg",
  //     designer_shop_name: "Nailshop1",
  //     follow_follower_length: 50,
  //     designs: 40,
  //   },
  // ];

  const {isLoading:designerLoading, data : designerData} = useQuery('hotDesigner',getHotDesigner)

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {designerData && designerData.slice(0,4).map((item:any, idx:string) => (
        <div key={idx} style={{ margin: "10px 20px" }}>
          <Cards info={item} />
        </div>
        // <Grid key={idx} style={{ margin: "20PX" }}>
        //   <img
        //     src={item.img}
        //     alt=""
        //     style={{ width: "250px", height: "250px", position: "absolute" }}
        //   />
        //   <Typography
        //     variant="h5"
        //     style={{ position: "relative", fontWeight: "bold" }}
        //   >
        //     {item.name}
        //   </Typography>
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-around",
        //       marginTop: "180px",
        //     }}
        //   >
        //     <Typography
        //       style={{
        //         position: "relative",
        //         margin: "10px",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       followerCnt:
        //       {item.followerCnt}
        //     </Typography>
        //     <Typography
        //       style={{
        //         position: "relative",
        //         margin: "10px",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       designCnt:{item.designsCnt}
        //     </Typography>
        //   </div>
        // </Grid>
      ))}
    </div>
  );
};
export default HotDesignersContent;
