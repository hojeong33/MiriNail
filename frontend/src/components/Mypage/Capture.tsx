import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Wrapper = styled.div`
  .pagination {
    display: flex;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
  }
`;

const ItemCards = styled.div`
  display: flex ;
  flex-wrap: wrap ;
  /* justify-content: center; */
  margin: 20px 0 0 40px;
  /* &:last-child {
    margin-right: auto;
  } */
`

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
    color: #6E6E6E;
  }
`;

interface IState {
  item: {
    title: string;
    price: number;
    category: string[];
  };
}

const Capture = () => {
  const [items, setItems] = useState<IState["item"][]>([
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
    {
      title: "글레이즈 - 루비 레드",
      price: 50000,
      category: ["겨울", "designer1"]
    },
  ])

  const onchangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event)
    console.log(page)
  }
  
  return (
    <Wrapper>
      <ItemCards>
        {items.map((item, idx) => {
          return (
            <ItemCard key={idx}>
              <div className="cardwrapper">
                <img src="/assets/images/원숭이.png" alt="" />
                <DeleteOutlineIcon />
              </div>
              <div className="title">{item.title}</div>
              <div className="category">
                {item.category.map((category, idx) => {
                  return <span key={idx}>#{category} </span>;
                })}
              </div>
            </ItemCard>
          );
        })}
      </ItemCards>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" onChange={onchangePage} />
        </Stack>
      </div>
    </Wrapper>
  );
}
export default Capture