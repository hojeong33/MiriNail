import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { nftFilter, page, page2 } from "../../store/atoms";
import { fetchDesigns } from "../../store/api";
import { useQuery } from "react-query";

const Paginations = () => {
  const [mypage,setMyPage] = useRecoilState(nftFilter)
  // const {isLoading, data } = useQuery(["nfts",mypage], fetchDesigns)

  const onPageChange = async(e: any, pages: number) => {
    console.log(pages)
    await setMyPage({...mypage,page:pages})   
  };
  

  return (
    <>
      <Stack spacing={2} className="dd">
        <Pagination count={5} shape="rounded" onChange={onPageChange}/>
        {/* <Pagination count={5} variant="outlined" shape="rounded" /> */}
      </Stack>
    </>
  );
};

const Paginations2 = () => {
  const [mypage,setMyPage] = useRecoilState(page2)
  
  const onPageChange = async(e: any, pages: number) => {
    console.log(pages)
    await setMyPage(pages)   
  };
  return (
    <>
      <Stack spacing={2} className="dd">
        <Pagination count={5} variant="outlined" shape="rounded" onChange={onPageChange}/>
      </Stack>
    </>
  );
};

export { Paginations, Paginations2 };
