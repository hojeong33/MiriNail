import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//카카오로그인 토큰 받아오기
const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [user_id, setUserId] = useState<number>(0);
  const [nickName, setNickName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const kakaoLogin = (code: string) => {
    return function () {
      axios({
        method: "GET",
        url: `http://localhost:8080/?code=${code}`,
      })
        .then((res) => {
          console.log(res); // 토큰이 넘어올 것임

          const ACCESS_TOKEN = res.data.accessToken;

          localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

          navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        })
        .catch((err: any) => {
          console.log("소셜로그인 에러", err);
          window.alert("로그인에 실패하였습니다.");
          navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
        });
    };
  };
  //프로필 데이터 가져오기
  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    const fetchData = async () => {
      if (code !== null) {
        await kakaoLogin(code);
        // getProfile();
        // console.log(code);
      }
    };
    fetchData();
    // navigate("/");
  }, []);

  return <div></div>;
};

export default KakaoRedirect;
