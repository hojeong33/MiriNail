import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./routes/Community/Community";
import Main from "./routes/Main/Main";
import Mypage from "./routes/Mypage/Mypage";
import Tutorial from "./routes/Guide/Tutorial";
import GlobalStyle from "./styles/global";
import FAQ from "./routes/Guide/FAQ";
import NFTList from "./routes/NFT/NFTList";
import NFTDetail from "./routes/NFT/NFTDetail";
import "bootstrap/dist/css/bootstrap.css";
import NFTRegister from "./routes/NFT/NFTRegister";
import DesignerList from "./routes/Designer/DesignerList";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import KakaoRedirect from "./components/Login/KakaoRedirect";
// import Cards from './components/Commons/Cards';
import Like from "./components/Mypage/Like";
import Capture from "./components/Mypage/Capture";
import Mypost from "./components/Mypage/Mypost";
import Myreview from "./components/Mypage/Myreview";
import Myask from "./components/Mypage/Myask";
import FollowingDesigner from "./components/Mypage/FollowingDesigner";
import MyReservation from "./components/Mypage/MyReservation";
import Test from "./components/Commons/Test";
import DesignerPage from "./routes/Designerpage/Designerpage";
import New from "./components/Designerpage/New";
import Introduction from "./components/Designerpage/Introduction";
import NFTs from "./components/Designerpage/NFTs";
import Reviews from "./components/Designerpage/Reviews";
import ReservationCheck from "./components/Designerpage/ReservationCheck";
import CreateCommunity from "./routes/Community/CreateCommunity";
import Auth from "./components/Login/Auth";
import CreateReservation from "./components/Designerpage/CreateReservation";
import Ask from "./components/Designerpage/AskList";
import CreateFeed from "./components/Designerpage/CreateFeed";
import AskList from "./components/Designerpage/AskList";
import CreateAsk from "./components/Designerpage/CreateAsk";
import Apply from "./components/Mypage/Apply";
import UpdateIntroduction from "./components/Designerpage/UpdateIntroduction";
import NFTRevise from "./routes/NFT/NFTRevise";
import PageNotFound from "./components/PageNotFound";
import AskDetail from "./components/Designerpage/AskDetail";
import UpdateAsk from "./components/Designerpage/UpdateAsk";
import Followers from "./components/Designerpage/Followers";
import TopButton from "./components/Navbar/TopButton";
import Admin from "./routes/Admin/Admin";
import ApplyList from "./components/Admin/ApplyList";
import UpdateImg from "./components/Designerpage/UpdateProfileImg";
import ScrollToTop from "./components/ScrollToTop";
import UpdateCommunity from "./routes/Community/UpdateCommunity";
import AR from "./routes/AR/AR";
import Event from "./routes/EventPage/Event";
import Sample1 from "./components/EventPage/EventDetail/Sample1";
import Sample2 from "./components/EventPage/EventDetail/Sample2";
import Sample3 from "./components/EventPage/EventDetail/Sample3";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage/:userSeq" element={<Mypage />}>
            <Route path="like" element={<Like />}></Route>
            <Route path="capture" element={<Capture />}></Route>
            <Route path="mypost" element={<Mypost />}></Route>
            <Route path="myreview" element={<Myreview />}></Route>
            <Route path="myask" element={<Myask />}></Route>
            <Route
              path="followingdesigner"
              element={<FollowingDesigner />}
            ></Route>
            <Route path="myreservation" element={<MyReservation />}></Route>
            <Route path="apply" element={<Apply />}></Route>
          </Route>
          <Route path="/designerpage/:userSeq" element={<DesignerPage />}>
            <Route path="new" element={<New />}></Route>
            <Route path="introduction" element={<Introduction />}></Route>
            <Route path="NFTs" element={<NFTs />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
            <Route path="reservation" element={<CreateReservation />}></Route>
            <Route
              path="reservationcheck"
              element={<ReservationCheck />}
            ></Route>
            <Route path="asklist" element={<AskList />}></Route>
            <Route path="askdetail/:qnaSeq" element={<AskDetail />}></Route>
            <Route path="updateask/:qnaSeq" element={<UpdateAsk />}></Route>
            <Route path="createfeed" element={<CreateFeed />}></Route>
            <Route path="createask" element={<CreateAsk />}></Route>
            <Route
              path="updateintroduction"
              element={<UpdateIntroduction />}
            ></Route>
            <Route path="followers" element={<Followers />}></Route>
            <Route path="updateimg" element={<UpdateImg />}></Route>
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="applylist" element={<ApplyList />}></Route>
          </Route>
          <Route path="/community" element={<Community />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/ar" element={<AR />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/nft" element={<NFTList />} />
          <Route path="/nft/:id" element={<NFTDetail />} />
          <Route path="/nft/register" element={<NFTRegister />} />
          <Route path="/nft/revise" element={<NFTRevise />} />
          <Route path="/designer" element={<DesignerList />} />
          <Route path="/api/users/login" element={<KakaoRedirect />} />
          <Route path="/test" element={<Test />} />
          <Route path="/community/create" element={<CreateCommunity />} />
          <Route path="/community/update" element={<UpdateCommunity />} />
          <Route path="/oauth2/redirect" element={<Auth />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/1" element={<Sample1 />} />
          <Route path="/event/2" element={<Sample2 />} />
          <Route path="/event/3" element={<Sample3 />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <TopButton />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
