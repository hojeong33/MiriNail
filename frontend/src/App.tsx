import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Community from './routes/Community/Community';
import Main from './routes/Main/Main';
import Mypage from './routes/Mypage/Mypage';
import Tutorial from './routes/Guide/Tutorial';
import GlobalStyle from './styles/global';
import FAQ from './routes/Guide/FAQ';
import NFTList from './routes/NFT/NFTList';
import NFTDetail from './routes/NFT/NFTDetail';
import 'bootstrap/dist/css/bootstrap.css';
import NFTRegister from './routes/NFT/NFTRegister';
import DesignerList from './routes/Designer/DesignerList';

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import KakaoRedirect from "./components/Login/KakaoRedirect";
// import Cards from './components/Commons/Cards';




function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/mypage" element={<Mypage />}/>
          <Route path="/Community" element={<Community />}/>
          <Route path="/tutorial" element={<Tutorial />}/>
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/nft" element={<NFTList />} />
          <Route path="/nft/detail" element={<NFTDetail />} />
          <Route path="/nft/register" element={<NFTRegister />} />
          <Route path="/designer" element={<DesignerList />} />
          <Route path="/api/users/login" element={<KakaoRedirect />} />
          {/* <Route path="/test" element={<Cards />} /> */}
      
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
