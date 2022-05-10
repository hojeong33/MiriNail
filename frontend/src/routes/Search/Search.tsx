import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import { getSearchDesigner } from "../../store/apis/designer";
import { getSearchNailart } from "../../store/apis/nailart";
import { TailSpin } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import SearchNailart from "./SearchNailart";
import SearchDesigner from "./SearchDesigner";

const Wrapper = styled.div`
  margin: 160px 120px;
  .buttons {
    display: flex;

    width: 90%;
    button {
      padding: 5px 20px;
      border: 1px solid #3d3c3a;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .selected {
      background-color: #3d3c3a;
      color: white;
    }
  }
`

const ItemCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  margin: 20px 0 0 40px;
  /* &:last-child {
    margin-right: auto;
  } */
`;

const ItemCard = styled.div`
  height: 300px;
  /* border: 1px solid black; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 15px 30px;
  .cardwrapper {
    width: 230px;
    height: 230px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #d2d2d0;
    }
    svg {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
  .category {
    color: #6e6e6e;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 768px;
`;

const Search = () => {
  const [searchType, setSearchType] = useState(0)
  const [lastPage, setLastPage] = useState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const { searchvalue } = useParams();

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    console.log(page);
    setPage(page);
  };



  return (
    <Wrapper>
      {searchvalue}
      <div className="buttons">
        <button
          className={`${searchType === 0 ? "selected" : ""}`}
          onClick={() => setSearchType(0)}
        >
          네일아트
        </button>
        <button
          className={`${searchType === 1 ? "selected" : ""}`}
          onClick={() => setSearchType(1)}
        >
          디자이너
        </button>
      </div>
      {searchType === 0 && <SearchNailart />}
      {searchType === 1 && <SearchDesigner />}
    </Wrapper>
  );
}

export default Search