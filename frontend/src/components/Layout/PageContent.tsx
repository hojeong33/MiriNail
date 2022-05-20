import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { nftFilter, pagenation } from "../../store/atoms";
import NFTItems from "./NFTItems";
import { Paginations } from "./Paginations";

const Wrapper = styled.div`
  * {
    margin: 0px;
    padding: 0px;
    position: relative;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  // height: 100vh;
`;
const MainFrame = styled.div`
  width: 1300px;
  // height: 100%;
  margin: 0 auto;

  .MainPadding {
    // height: 100%;
    margin: 0px 10px;

    .ItemList {
      padding-left: 180px;
      height: 100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 75px;

        .TypeFilter {
          div {
            display: block;
            color: #3d3c3a;
            opacity: 0.5;
            transition: all 0.3s;
            font-size: 14px;
            margin-bottom: 20px;
            cursor: pointer;
          }
          div:active {
            opacity: 1;
          }
          div:hover {
            opacity: 1;
          }
        }

        .OrderFilter {
          margin-top: 100px;
          a {
            display: block;
            color: #3d3c3a;
            opacity: 0.5;
            transition: all 0.3s;
            font-size: 14px;
            margin-bottom: 20px;
          }
          a.active {
            opacity: 1;
          }
          a:hover {
            opacity: 1;
          }
          .CheckBox {
            display: block;
            font-size: 14px;
            color: #3d3c3a;
            margin-top: 15px;
            label {
              margin-left: 7px;
            }
          }
        }
      }

      .RightBox {
        // height: 100%;
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-left: 40px;
        padding-bottom: 160px;
        text-align: center;
        display: flex;
        flex-direction: column;
        .pagination {
          margin: 0 auto;
          margin-top: 50px;
        }
      }
    }
  }

  @media screen and (max-width: 920px) {
    width: 100%;
    .MainPadding {
      .ItemList {
        padding-left: 0px;
        .LeftBox {
          position: relative;
          padding-right: 0px;
          left: auto;
          top: auto;
          z-index: 10;
          padding-top: 30px;
          text-align: left;
          .TypeFilter {
            display: flex;
            justify-content: center;

            div {
              margin: 0 10px 0 10px;
            }
          }
          .OrderFilter {
            display: none;
          }
        }

        .RightBox {
          padding-top: 30px;
          padding-left: 0px;
          width: 100%;
          border-left: 0px solid #d2d2d0;
          padding-bottom: 100px;
          text-align: center;
        }
      }
    }
  }
`;

const PageContent = () => {
  const [status, setStatus] = useState(0);
  const [myFilter, setMyFilter] = useRecoilState(nftFilter);
  const [sortFilter, setSortFilter] = useState("");
  const reset = useResetRecoilState(nftFilter);
  const [defaultCheck, setDefaultCheck] = useState(true);
  const [totalCount,setTotalCount] = useRecoilState(pagenation)
  useEffect(() => {
  }, [myFilter]);

  const onCheckbox = async (e: any) => {
    setDefaultCheck((prev) => !prev);
    setMyFilter({ ...myFilter, sort: e.target.value });
  };

  return (
    <>
      <Wrapper>
        <MainFrame>
          <div className="MainPadding">
            <div className="ItemList">
              <div className="LeftBox">
                <div className="TypeFilter">
                  <div
                    style={status === 0 ? { opacity: "1" } : {}}
                    onClick={() => {
                      reset();
                      setStatus(0);
                    }}
                  >
                    전체
                  </div>
                  <div
                    style={status === 1 ? { opacity: "1" } : {}}
                    onClick={() => {
                      setMyFilter({ ...myFilter, type: "젤", page:1 });
                      setStatus(1);
                    }}
                  >
                    GEL NAIL
                  </div>
                  <div
                    style={status === 2 ? { opacity: "1" } : {}}
                    onClick={() => {
                      setMyFilter({ ...myFilter, type: "프렌치", page:1 });
                      setStatus(2);
                    }}
                  >
                    FRENCH NAIL
                  </div>
                  <div
                    style={status === 3 ? { opacity: "1" } : {}}
                    onClick={() => {
                      setMyFilter({ ...myFilter, type: "라인스톤", page:1 });
                      setStatus(3);
                    }}
                  >
                    LINESTONE NAIL
                  </div>
                </div>
                <div className="OrderFilter">
                  <a>정렬</a>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      name="cb"
                      id="cb1"
                      onChange={onCheckbox}
                      value="last"
                      checked={defaultCheck}
                    />
                    <label htmlFor="cb1">최신순</label>
                  </div>
                  <div className="CheckBox">
                    <input
                      type="checkbox"
                      name="cb"
                      id="cb2"
                      onChange={onCheckbox}
                      checked={!defaultCheck}
                      value="like"
                    />
                    <label htmlFor="cb2">인기도순</label>
                  </div>
                </div>
              </div>
              <div className="RightBox">
                <NFTItems />
                <div className="pagination">
                  <Paginations page={totalCount}/>
                </div>
              </div>
            </div>
          </div>
        </MainFrame>
      </Wrapper>
    </>
  );
};

export default PageContent;
