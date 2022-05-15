import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
const MenuBtn = styled("div")`
  :hover .menu {
    opacity: 1;
  }
  .menu {
    opacity: 0;
  }
`;
const MenuBtn2 = styled("div")`
  :hover .menu2 {
    opacity: 1;
  }
  .menu2 {
    opacity: 0;
  }
`;
const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "rgba( 0, 0, 0, 0 )",
    color: "black",
  },
});
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
  const [searchValue, setSearchValue] = React.useState("");
  //회원정보
  const userNickname = sessionStorage.getItem("userNickname");
  const userProfileImg = sessionStorage.getItem("userProfileImg");
  const userRole = sessionStorage.getItem("userRole");
  useEffect(() => {
    const myNavbar = document.getElementById("myNavbar");
    console.log("myNavbar", myNavbar);
    if (myNavbar) {
      window.addEventListener("scroll", function () {
        var top =
          window.scrollY ||
          window.pageXOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;

        if (top > 200) {
          myNavbar.classList.add(styles.active);
          myNavbar.classList.remove(styles.top);
        } else {
          myNavbar.classList.remove(styles.active);
          myNavbar.classList.add(styles.top);
        }
      });
    }
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
  // URL 이동
  const navigate = useNavigate();

  const onKeyDownEnter = (e: any) => {
    if (e.code === "Enter") {
      console.log("엔터");
      console.log(searchValue);
      if (searchValue === "") {
        alert("검색어를 입력해주세요");
        return;
      }
      navigate(`/search/${searchValue}`);
      // otherOneTouch(e)
      // setSearchValue("")
    }
  };

  const otherOneTouch = React.useCallback((event: TouchEvent) => {
    (document.activeElement as HTMLElement).blur();
  }, []);

  return (
    <AppBar
      id="myNavbar"
      position="fixed"
      style={{
        boxShadow: "none",
        borderBottom: "1px solid rgba(61,60,58,0.5)",
      }}
      className={styles.top}
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
            Miri Nail
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <CustomButton
              disableRipple
              onClick={() => navigate(`/ar`)}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              AR
            </CustomButton>
            <MenuBtn>
              <CustomButton
                disableRipple
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                }}
              >
                ART
              </CustomButton>
              <ul
                className="menu"
                style={{
                  position: "absolute",
                  top: "70px",
                  left: "130px",
                  color: "black",
                  backgroundColor: "rgba(0, 0, 0, 5%)",
                  padding: "10px",
                }}
              >
                <li>
                  <button
                    onClick={() => {
                      navigate(`/nft`);
                    }}
                  >
                    NFT NAIL
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate(`/designer`);
                    }}
                  >
                    DESIGNER
                  </button>
                </li>
              </ul>
            </MenuBtn>
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => onKeyDownEnter(e)}
              spellCheck="false"
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            {!userProfileImg ? (
              <CustomButton
                disableRipple
                href="https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect"
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Kakao Login
              </CustomButton>
            ) : (
              <>
                <MenuBtn2>
                  <CustomIconButton disableRipple sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={userProfileImg} />
                    <Typography
                      textAlign="center"
                      style={{
                        color: "black",
                        marginLeft: "5px",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                    >
                      {userNickname}
                    </Typography>
                  </CustomIconButton>
                  <ul
                    className="menu2"
                    style={{
                      position: "absolute",
                      top: "70px",
                      color: "black",
                      backgroundColor: "rgba(0, 0, 0, 5%)",
                      padding: "10px",
                    }}
                  >
                    <li>
                      {userRole === "ROLE_USER" && (
                        <button
                          onClick={() => {
                            navigate(
                              `/mypage/${sessionStorage.getItem("userSeq")}/myreservation`
                            );
                          }}
                        >
                          MyPage
                        </button>
                      )}
                      {userRole === "ROLE_ARTIST" && (
                        <button
                          onClick={() => {
                            navigate(
                              `/designerpage/${sessionStorage.getItem(
                                "userSeq"
                              )}/new`
                            );
                          }}
                        >
                          DesignerPage
                        </button>
                      )}
                      {userRole === "ROLE_ADMIN" && (
                        <button
                          onClick={() => {
                            navigate(`/admin/applylist`);
                          }}
                        >
                          Admin
                        </button>
                      )}
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </MenuBtn2>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
