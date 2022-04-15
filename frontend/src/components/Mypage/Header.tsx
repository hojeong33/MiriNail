import React from "react"
import styled from "styled-components"

interface IProps {
  title: string
} 

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  border-bottom: 1px solid black;
`
const Line = styled.div`
  width: 20px;
  height: 0;
  border-top: 2px solid black;
`
const Title = styled.div`
  font-family: "Playfair Display";
  margin-top: 5px;
  font-size: 40px;
  font-weight: 500;
  color: "#333";
`
const Header:React.FC<IProps> = ({ title }) => {
  return (
    <Wrapper>
      <Line />
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default Header