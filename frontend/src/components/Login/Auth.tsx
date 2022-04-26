import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

// export const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
// export const REDIRECT_URI = "http://localhost:8080/login/oauth2/code/kakao";
// export const CLIENT_SECRET = "	NV3RngHnenLaV43dsr8pCMqaVdTQq9lY";
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const Auth = () => {
  const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("token");
  console.log(ACCESS_TOKEN)
  const navigate = useNavigate();
  const fetchData = async () => {
    if (ACCESS_TOKEN) {
      const result = await axios({
        method: "get",
        url: `http://localhost:8080/api/users/`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      console.log(result)

      const test = await axios({
        method: "get",
        url: `http://localhost:8080/api/users/${result.data.body.user.userSeq}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      console.log(test)
      
      // sessionStorage에 저장
      sessionStorage.setItem("userId", test.data.userId);
      sessionStorage.setItem("userProfileImg", test.data.userProfileImg);
      sessionStorage.setItem("userNickname", test.data.userNickname);
    }
  };
  if (ACCESS_TOKEN) {
    localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
    fetchData();
    navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
  }
  console.log("auth 페이지", { ACCESS_TOKEN });

  return <div></div>;
};
export default Auth;
