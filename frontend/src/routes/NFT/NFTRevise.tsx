import react from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PageContentRevise from "../../components/Layout/ReviseComponents/PageContentRevise";
import PageHeader from "../../components/Layout/ReviseComponents/PageHeader";
// import PageHeader from '../../Layout/PageHeader'
const NFTRegister = () => {
  const abc = useLocation().state
  console.log(abc)
  return (
    <div>
      <PageHeader />
      {/* <PageContent /> */}
      <PageContentRevise />
    </div>
  );
};

export default NFTRegister;
