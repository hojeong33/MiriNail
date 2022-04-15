import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Community from './routes/Community/Community';
import Main from './routes/Main/Main';
import Mypage from './routes/Mypage/Mypage';
import Tutorial from './routes/Guide/Tutorial';
import GlobalStyle from './styles/global';
import FAQ from './routes/Guide/FAQ';
import NFTList from './routes/NFT/NFTList';
import Like from './components/Mypage/Like';
import Capture from './components/Mypage/Capture';
import Mypost from './components/Mypage/Mypost';
import Myreview from './components/Mypage/Myreview';
import Myask from './components/Mypage/Myask';
import FollowingDesigner from './components/Mypage/FollowingDesigner';
import MyReservation from './components/Mypage/MyReservation';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/mypage" element={<Mypage />}>
            <Route path="like" element={<Like />}></Route>
            <Route path="capture" element={<Capture />}></Route>
            <Route path="mypost" element={<Mypost />}></Route>
            <Route path="myreview" element={<Myreview />}></Route>
            <Route path="myask" element={<Myask />}></Route>
            <Route path="followingdesigner" element={<FollowingDesigner />}></Route>
            <Route path="myreservation" element={<MyReservation />}></Route>
          </Route>
          <Route path="/Community" element={<Community />}/>
          <Route path="/tutorial" element={<Tutorial />}/>
          <Route path="/faq" element={<FAQ />}/>
          <Route path="/nft" element={<NFTList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
