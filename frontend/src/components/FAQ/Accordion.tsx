import React, {useRef, useState, useCallback} from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface AccordionProps {
  title?: string | React.ReactNode;
  contents?: string | React.ReactNode;
};

// style
const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;
  margin-bottom: 5px;
  span {
    font-size: 24px;

    margin-right: 12px;
  }
  padding-left:"15px"
`;

const Question = styled.div`
  padding: 5px 10px !important;
  font-size: 20px;
  width:100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 40px;
  margin: 0 32px 0 20px;
  
  .btn {
    right:30px;
    font-size: 14px;
    position: absolute;

    @media screen and (max-width: 767px) {
      display:none;
    }
  }
`;



const ContentsWrapper = styled.div`
  height: 0;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.2s ease, background 0.2s ease;
  border-radius:0 0 10px 10px;
`;

const Contents = styled.div`
  padding: 12px 12px !important;
  // padding: 12px;
  p {
    margin: 0;
    font-weight: 500;
    font-size: 18px;
    display: inline;
  }
  div {
    display: inline;
  }
  a {
    color: #3653b3 ;
  }
`;

// component
function Accordion(props: AccordionProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        parentRef.current.style.background = "none";
      } else {
        parentRef.current.style.height = `${
          props.contents ? childRef.current.clientHeight : 0
        }px`;
        parentRef.current.style.backgroundColor = "rgb(236 236 236)";
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText =
    parentRefHeight === "0px" ? <ExpandMoreIcon /> : <ExpandLessIcon />;

  const enter = (sentence:any) => {
    return (
      <>
        <span>A.</span>
        {sentence.split("\n").map((txt:any, idx:number) => (
          <div key={idx}>
            {txt.slice(0,4) === "http" ? <a href={txt} target="blank">{txt}</a> : <p>{txt}</p>}
            <br />
          </div>
        ))}
      </>
    );
  }

  return (
    <Container>
      <Question onClick={handleButtonClick}>
        <div style={{padding:"5px 0 !important"}}>
          <span>Q.</span>
          {props.title}
        </div>
        <div className="btn">{buttonText}</div>
      </Question>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{enter(props.contents)}</Contents>
      </ContentsWrapper>
    </Container>
  );
}


export default React.memo(Accordion);
