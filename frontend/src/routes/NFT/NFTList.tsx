import PageHeader from "../../components/Layout/PageHeader";
import PageContent from "../../components/Layout/PageContent";
import PageContentColor from "../../components/Layout/PageContentColor";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { nftFilter } from "../../store/atoms";

const NFTList = () => {
  const [flag,setFlag] = useState(true)
  const [resetFilter,setResetFilter] = useRecoilState(nftFilter)
  const test = (e:boolean) => {
    setFlag(e)
 
  }


  return (
    <>
      <div>
        <PageHeader setType={test}/>
        {flag ? <PageContent /> : <PageContentColor />}
      </div>
    </>
  );
};

export default NFTList;
