import styled from "styled-components"
import Header from "../../components/Designerpage/Header"
import Content from "../../components/Designerpage/Content"
import { designerAtom } from "../../store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export interface IDesigner {
  id: number;
  name: string;
  imgurl: string;
  isfollow: boolean;
  new: any[];
  reservations: any[];
  asks: any[];
  reviews: any[];
  location: string;
  number: string;
  desc: string;
  descImgurl: string;
  designerShopOpen: string;
  designerShopClose: string;
}

const DesignerPage = () => {
  const [designer, setDesigner] = useState<IDesigner>({
    id: 1,
    name: "김다미네일",
    number: "010-9323-0344",
    imgurl: "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjRfMjU1/MDAxNTgyNTExOTM4NzI3.lxzK3zwTMmFs3FhkmLOWdaE0AMaPntOjtQnguqaL-Oog.ArD3XUOanpM9MqeHZRjuBTv5iifeuOG4oANhuDe8Lf0g.JPEG.pola0216/%EA%B9%80%EB%8B%A4%EB%AF%B8%EC%97%AC%EC%B9%9C%EC%A7%A401.jpg?type=w800",
    isfollow: true,
    new: ["새소식1"],
    reservations: ["예약날짜1"],
    asks: ["문의글1"],
    reviews: ["후기1"],
    location: "경기도 고양시 성신로 99",
    desc: "dadaism__official 🐯 안녕하세요. 다다이즘입니다 ✋🏻 수많은 조언과 아이디어로 생각한게 루미원장 마음대로 ! \"오마카세 아트\" 선보일까 하는데 저렴한 가격으로 할거에오 👼🏻 🤍 너낌은 알아야 하니까 동영상 첨부 해봅니다..! 많관부〰️🖤",
    descImgurl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDlfMjYw%2FMDAxNjI4NTAwNDU3NjQ2.y6HMk-12DUgv3FSOysuLr0GYz9OdQkSq6-VVPiQmxi8g.NvqUANKYigGgV6v-ysx4GotLQxFl384ExMedS_S_nAkg.JPEG.hery3436%2FIMG_4464.jpg&type=sc960_832",
    designerShopOpen: "10:00",
    designerShopClose: "19:00"
  })
  const { userSeq } = useParams();
  console.log(userSeq)
  const setterFn = useSetRecoilState(designerAtom)



  useEffect(() => {
    setterFn(designer)
  }, [])
  return (
    <>
      <Header designer={designer}></Header>
      <Content designer={designer}></Content>
    </>
  );
}

export default DesignerPage