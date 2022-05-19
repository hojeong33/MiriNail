import { useState } from "react";
import styled from "styled-components";
import SearchNailart from "./SearchNailart";
import SearchDesigner from "./SearchDesigner";

const Wrapper = styled.div`
  margin: 160px auto;
  min-height: 100vh;
  width: 1200px;
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

const Search = () => {
  const [searchType, setSearchType] = useState(1)

  return (
    <Wrapper>
      <div className="buttons">
        <button
          className={`${searchType === 1 ? "selected" : ""}`}
          onClick={() => setSearchType(1)}
        >
          디자이너
        </button>
        <button
          className={`${searchType === 0 ? "selected" : ""}`}
          onClick={() => setSearchType(0)}
        >
          네일아트
        </button>
      </div>
      {searchType === 0 && <SearchNailart />}
      {searchType === 1 && <SearchDesigner />}
    </Wrapper>
  );
}

export default Search