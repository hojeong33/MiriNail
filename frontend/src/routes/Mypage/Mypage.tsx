
import styled from "styled-components"
import Header from "../../components/Mypage/Header"
import Content from "../../components/Mypage/Content"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import Like from "../../components/Mypage/Like";


const Mypage = () => {

  return (
    <>
      <Header></Header>
      <Content></Content>
    </>
  );
}

export default Mypage