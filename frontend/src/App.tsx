import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Community from "./routes/Community/Community";
import Main from "./routes/Main/Main";
import Mypage from "./routes/Mypage/Mypage";
import Tutorial from "./routes/Guide/Tutorial";
import GlobalStyle from "./styles/global";
import FAQ from "./routes/Guide/FAQ";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
