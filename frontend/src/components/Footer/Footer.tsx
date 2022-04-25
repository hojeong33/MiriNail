import { Container, Stack } from "@mui/material";

function Footer() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: 300,

        paddingTop: 50,
        paddingBottom: 50,
        backgroundColor: "#333333",
        color: "#eeeeee",
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          textAlign: "left",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={3}>
          <div>
            <div style={{ fontSize: 48, fontWeight: "bolder" }}>Miri Nail</div>
            <div style={{ color: "#999999" }}>
              ⓒ 2022. 영남아 네일하자 All rights reserved.
            </div>
          </div>
          <div></div>
          <div>
            <div style={{ fontSize: 32, fontWeight: "bolder" }}>Contact</div>
            <div style={{ color: "#999999" }}>mirinail@gmail.com</div>
          </div>
        </Stack>
        <Stack spacing={3}>
          <div>
            <div style={{ fontSize: 32, fontWeight: "bold" }}>SSAFY 6th.</div>
            <div style={{ color: "#999999" }}>자율프로젝트</div>
            <div style={{ color: "#999999" }}>부산 강서구 녹산산업중로 333</div>
          </div>

          <div></div>
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              부울경 1반 1조
            </div>
            <Stack direction="row" spacing={4}>
              <div>
                <Stack direction="row" spacing={1}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#999999",
                    }}
                  >
                    FE
                  </div>
                  <div>곽동현</div>
                  <div>장영남</div>
                  <div>전호정</div>
                </Stack>
              </div>
              <div>
                <Stack direction="row" spacing={1}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#999999",
                    }}
                  >
                    BE
                  </div>
                  <div>어서빈</div>
                  <div>최이삭</div>
                  <div>최호준</div>
                </Stack>
              </div>
            </Stack>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
