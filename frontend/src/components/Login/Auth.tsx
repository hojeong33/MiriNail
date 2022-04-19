import React from "react";

const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
const REDIRECT_URI = "http://localhost:3000/api/users/login";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return <div>{code}</div>;
};
export default Auth;
