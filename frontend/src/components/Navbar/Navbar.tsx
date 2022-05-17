import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import sc from "styled-components";

const Logo = sc.button`
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 300;
  font-size: 32px;
  color: black;
  margin: 5px 10px 0;
`;

const Btn1 = sc.button`
  width: 60px;
  :hover {
    font-weight: 500;
  }
`;
const Btn2 = sc.button`
  width: 140px;
  :hover {
    font-weight: 500;
  }
`;

const Btn3 = sc.button`
  width: 75px;
  :hover {
    font-weight: 500;
  }
`;

const MenuBtn = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  .menu li :hover {
    font-weight: 500;
  }

  .menu {
    display: none;
  }
  .menu li {
    display: block;
  }
  :hover .menu {
    display: block;
  }
`;
const MenuBtn2 = styled("div")`
  :hover .menu2 {
    display: block;
  }
  .menu2 {
    display: none;
  }
  .menu2 li {
    display: block;
  }

  .menu2 li :hover {
    font-weight: 500;
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
          <Logo onClick={() => navigate(`/`)}>MIRINAIL</Logo>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Btn1 onClick={() => navigate(`/ar`)}>AR</Btn1>
            <MenuBtn>
              <Btn1 onClick={() => navigate(`/nft`)}>ART</Btn1>
              <ul
                className="menu"
                style={{
                  position: "absolute",
                  top: "65px",
                  left: "210px",
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
            <Btn2 onClick={() => navigate(`/community`)}>COMMUNITY</Btn2>
            <Btn3 onClick={() => navigate(`/event`)}>EVENT</Btn3>
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
                href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect"
                sx={{ my: 1, color: "black", display: "block" }}
              >
                Kakao Login
              </CustomButton>
            ) : (
              <>
                <MenuBtn2>
                  <CustomIconButton
                    disableRipple
                    sx={{ p: 0, minHeight: "64px" }}
                    onClick={() => {
                      navigate(
                        `/mypage/${sessionStorage.getItem(
                          "userSeq"
                        )}/myreservation`
                      );
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={userProfileImg} />
                    <div
                      style={{
                        textAlign: "center",
                        color: "black",
                        marginLeft: "5px",
                        fontWeight: "400",
                        fontSize: "17px",
                      }}
                    >
                      {userNickname}
                    </div>
                  </CustomIconButton>
                  <ul
                    className="menu2"
                    style={{
                      position: "absolute",
                      top: "65px",
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
                              `/mypage/${sessionStorage.getItem(
                                "userSeq"
                              )}/myreservation`
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
