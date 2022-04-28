import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const ACCESS_TOKEN = new URL(window.location.href).searchParams.get("token");
  console.log(ACCESS_TOKEN);
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
      console.log(result);

      const test = await axios({
        method: "get",
        url: `http://localhost:8080/api/users/${result.data.body.user.userSeq}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      console.log(test);

      // sessionStorage에 저장
      sessionStorage.setItem("userSeq", test.data.userSeq);
      sessionStorage.setItem("userId", test.data.userId);
      sessionStorage.setItem("userProfileImg", test.data.userProfileImg);
      sessionStorage.setItem("userNickname", test.data.userNickname);
      sessionStorage.setItem("userRole", test.data.userRole);
      sessionStorage.setItem("userSeq", test.data.userSeq);
      navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    }
  };
  if (ACCESS_TOKEN) {
    localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
    fetchData();
  }
  console.log("auth 페이지", { ACCESS_TOKEN });

  return <div></div>;
};
export default Auth;
