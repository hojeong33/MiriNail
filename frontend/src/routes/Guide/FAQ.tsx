import React from 'react';
import styled from "styled-components";
import Accordion from '../../components/FAQ/Accordion';

//style

const Header = styled.div`
  text-align : left;
  font-size : 40px;
`

const Main = styled.div`

  margin-top: 60px;

`


//component
export default function FAQ() {
  const Q1 = "가상 피팅 서비스는 어떻게 이용하나요? ?"
  const A1 =
    "상단의 AR 피팅하기 버튼을 클릭합니다.\n \n AR서비스를 이용하기 위해서는 MIRINAIL사이트에 로그인이 필요합니다. \n또한 NFT의 소유권은 디지털 자산에 대한 저작권을 부여하지 않습니다.\n쉽게말해 NFT의 소유권과 저작권이 분리가 되어있어서 내가 NFT를 소유했다고 해서 저작권까지 내 것이 되는것은 아닙니다.\n";
  
  const Q2 = "마음에 드는 작품에 대한 문의는 어떻게 하나요??"
  const A2 = "먼저 로그인을 한 후에 하단에 있는 문의 등록을 클릭하여 해당 작품에 문의글을 남길 수 있습니다.\n 문의 시 작품 혹은 디자이너에게 문의 글을 남길 수 있으며 심한 욕설 혹은 비방은 삼가해주시면 감사하겠습니다."

  const Q3 = "실제로 예약을 할려면 어떻게 하나요??"
  const A3 = "MIRINAIL사이트에서 디자이너 예약기능을 통해 네일 예약을 할 수 있습니다.\n 본인이 원하는 디자이너의 마이페이지 - 예약하기 탭에서 예약을 진행해 주세요.\n 예약의 주체는 디자이너와 본인에게 있으며 불법행위에 유의해 주시기 바랍니다."

  const Q4 = "디자이너에 대한 정보는 어떻게 확인하나요??"
  const A4 = "디자이너별 마이페이지에서 확인 하실 수 있습니다..\n MIRINAIL의 디자이너들은 모두 디자이너 신청을 통해 신분을 인증 받은 회원입니다. \n 기본적인 디자이너의 소속 네일샵 및 신분 외에 다양한 소식들 또한 만나보실 수 있습니다.\n\n"

  const Q5 = "AR 피팅이 제대로 작동하지 않아요"
  const A5 = "우선 카메라가 제대로 작동하는지 확인해주세요.\nAR 서비스의 경우 다양한 변수로 인한 오류가 생길 수 있습니다.\n 오류가 날 경우 당황하지 말고 아래 문의게시판에 해당 내용을 작성해 주시면 감사하겠습니다."

  // const Q6 = "구매는 어떻게 하나요?"
  // const A6 = "상단 메뉴의 Store 또는 특정 유저의 프로필에서 판매 등록된 작품을 조회할 수 있습니다.\n판매 등록된 작품은 일반판매등록, 경매등록 두가지의 종류가 있습니다.\n\n일반 판매등록된 작품을 구매하기 위해서는 구매버튼을 눌러 등록된 판매가를 보내면 작품을 구매할 수 있습니다.\n경매등록된 작품을 구매하기 위해서는 현재 작품에 제시된 최고가보다 높은 가격을 제시하여 경매 종료 시점에 내가 등록한 제시가보다 더 높은 가격에 제시한 유저가 없을 경우 작품이 구매됩니다."

  return (
    <>
      <Header>
        FAQ
      </Header>
      <Main>
        <Accordion title={Q1} contents={A1}></Accordion>
        <Accordion title={Q2} contents={A2}></Accordion>
        <Accordion title={Q3} contents={A3}></Accordion>
        <Accordion title={Q4} contents={A4}></Accordion>
        <Accordion title={Q5} contents={A5}></Accordion>
        {/* <Accordion title={Q6} contents={A6}></Accordion> */}
      </Main>
    </>
  );
}
