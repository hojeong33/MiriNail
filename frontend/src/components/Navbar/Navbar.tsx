import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { KAKAO_AUTH_URL } from "../Login/Auth";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  //테스트
  const isLogin = false;
  const username = "@abcdef";
  //소셜로그인
  const kakaoLogin = () => {
    return function () {
      axios({
        method: "GET",
        url: "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http:/localhost:3000/oauth2/redirect",
        // url: `http://localhost:8080/?code=${code}`,
      })
        .then((res) => {
          console.log(res); // 토큰이 넘어올 것임

          // const ACCESS_TOKEN = res.data.accessToken;

          // localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

          // navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        })
        .catch((err: any) => {
          console.log("소셜로그인 에러", err);
          window.alert("로그인에 실패하였습니다.");
          navigate("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
        });
    };
  };

  //User 하위 메뉴창
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //ART 하위 메뉴창
  const [anchorElUser2, setAnchorElUser2] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser2(event.currentTarget);
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };
  // URL 이동
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "rgba( 0, 0, 0, 0 )",
        boxShadow: "none",
        borderBottom: "0.1rem solid black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => navigate(`/`)}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate(`/ar`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              AR
            </Button>
            <Button
              onClick={handleOpenUserMenu2}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              ART
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser2)}
              onClose={handleCloseUserMenu2}
            >
              <MenuItem onClick={() => navigate(`/nft`)}>
                <Typography textAlign="center">NAIL NFT</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`/designer`)}>
                <Typography textAlign="center">DESIGNER</Typography>
              </MenuItem>
            </Menu>
            <Button
              onClick={() => navigate(`/community`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              COMMUNITY
            </Button>
            <Button
              onClick={() => navigate(`/event`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              EVENT
            </Button>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            {!isLogin ? (
              <Button
                href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect"
                // href={KAKAO_AUTH_URL}
                // onClick={kakaoLogin}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Kakao Login
              </Button>
            ) : (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <Typography
                    textAlign="center"
                    style={{ color: "black", marginLeft: "5px" }}
                  >
                    {username}
                  </Typography>
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate(`/mypage`)}>
                    <Typography textAlign="center">Mypage</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
