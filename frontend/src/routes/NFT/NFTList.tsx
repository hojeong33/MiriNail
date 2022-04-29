import PageHeader from "../../components/Layout/PageHeader";
import PageContent from "../../components/Layout/PageContent";
import PageContentColor from "../../components/Layout/PageContentColor";
import { useEffect, useState } from "react";

const NFTList = () => {
  const [flag,setFlag] = useState(true)
  
  const test = (e:boolean) => {
    setFlag(e)
  }

  useEffect(() => {
    console.log(flag)
  },[flag])
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
