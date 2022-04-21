import React from "react";
import { useNavigate } from "react-router-dom";

export const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
export const REDIRECT_URI = "http://localhost:8080/login/oauth2/code/kakao";
export const CLIENT_SECRET = "	NV3RngHnenLaV43dsr8pCMqaVdTQq9lY";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  return <div>{code}</div>;
};
export default Auth;
