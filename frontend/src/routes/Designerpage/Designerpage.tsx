import styled from "styled-components"
import Header from "../../components/Designerpage/Header"
import Content from "../../components/Designerpage/Content"
import { designerAtom, refetchDesigner } from "../../store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDesignerinfo } from "../../store/apis/designer";

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
  const { userSeq } = useParams();
  const setterFn = useSetRecoilState(designerAtom)
  const designerRefetch = useSetRecoilState(refetchDesigner)

  const { data, isLoading, refetch} = useQuery<any, Error>(
    ["getDesigner"],
    async () => {
      return await getDesignerinfo(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        // console.log(res);
        setterFn(res)
      },
      onError: (err: any) => console.log(err),
    }
  );

  return (
    <>
      <Header refetch={refetch}></Header>
      <Content refetch={refetch}></Content>
    </>
  );
}

export default DesignerPage