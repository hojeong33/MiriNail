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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "rgba( 0, 0, 0, 0 )",
    color: "black",
  },
});
const CustomMenu = styled(Menu)`
  .MuiPaper-root {
    box-shadow: none;
    background-color: rgba(0, 0, 0, 5%);
  }
`;
const CustomIconButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba( 0, 0, 0, 0 )",
  },
});
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
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  //회원정보
  const userNickname = sessionStorage.getItem("userNickname");
  const userProfileImg = sessionStorage.getItem("userProfileImg");
  useEffect(() => {
    if (userNickname) {
      setIsLogin(true);
    }
  }, []);
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsLogin(false);
    navigate("/");
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
    console.log("열림");
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
    console.log("닫힘");
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
            color="black"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => navigate(`/`)}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <CustomButton
              disableRipple
              onClick={() => navigate(`/ar`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              AR
            </CustomButton>
            <CustomButton
              disableRipple
              onMouseEnter={handleOpenUserMenu2}
              // onMouseLeave={handleCloseUserMenu2}
              // onClick={handleOpenUserMenu2}
              sx={{
                my: 2,
                color: "black",
                display: "block",
              }}
            >
              ART
            </CustomButton>
            <CustomMenu
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
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu2();
                  navigate(`/nft`);
                }}
              >
                <Typography textAlign="center">NAIL NFT</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu2();
                  navigate(`/designer`);
                }}
              >
                <Typography textAlign="center">DESIGNER</Typography>
              </MenuItem>
            </CustomMenu>
            <CustomButton
              disableRipple
              onClick={() => navigate(`/community`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              COMMUNITY
            </CustomButton>
            <CustomButton
              disableRipple
              onClick={() => navigate(`/event`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              EVENT
            </CustomButton>
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
            {!userProfileImg ? (
              <CustomButton
                disableRipple
                href="https://k6e101.p.ssafy.io/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Kakao Login
              </CustomButton>
            ) : (
              <>
                <CustomIconButton
                  disableRipple
                  onMouseEnter={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src={userProfileImg} />
                  <Typography
                    textAlign="center"
                    style={{ color: "black", marginLeft: "5px" }}
                  >
                    {userNickname}
                  </Typography>
                </CustomIconButton>
                <CustomMenu
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
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate(`/mypage`);
                    }}
                  >
                    <Typography textAlign="center">Mypage</Typography>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </CustomMenu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
