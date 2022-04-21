import styled from "styled-components"
import Header from "../../components/Designerpage/Header"
import Content from "../../components/Designerpage/Content"
import { useState } from "react"

export interface designer {
  
  id: number;
  name: string;
  imgurl: string;
  isfollow: boolean;
  new: any[];
  reservations: any[];
  asks: any[];
  reviews: any[];
}
const DesignerPage = () => {
  const [designer, setDesigner] = useState<designer>({
    id: 1,
    name: "김다미네일",
    imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
    isfollow: true,
    new: ["새소식1"],
    reservations: ["예약날짜1"],
    asks: ["문의글1"],
    reviews: ["후기1"],
  })
  return (
    <>
      <Header designer={designer}></Header>
      <Content designer={designer}></Content>
    </>
  );
}

export default DesignerPage