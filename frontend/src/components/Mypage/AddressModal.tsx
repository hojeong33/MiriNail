import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  onCompletePost: (data:any) => void;
};

//// style
// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// components
const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
  font-family: "Noto Sans KR", sans-serif;
  width: 600px;
  height: 600px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  border: 1px solid black;
  border-radius: 2px;
  /* box-shadow: 0 0 30px rgba(30, 30, 30, 0.185); */
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  ${(props) => modalSettings(props.visible)}

  .postcode {
    padding: '10px';
    width: 95%;
  }
`;

const Title = styled.h1<{ visible: boolean }>`
  margin: 40px 0 40px;
  font-size: 30px;
  text-align: center;
  ${(props) => modalSettings(props.visible)}
`;

const Divider = styled.hr`
  border: solid 1px #333 ;
  width: 65%;
  margin: 20px auto 30px;
`;






const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`; 



//// component
const AddressModal = ({
  children,
  visible,
  onClose,
  onCompletePost
}: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <Background visible={visible} onClick={onClose} />
      <ModalSection visible={visible}>
        <CloseButton onClick={onClose}></CloseButton>
        <Title visible={visible}>주소검색</Title>
        {/* <Divider /> */}
        <div className="postcode">

        <DaumPostcode autoClose onComplete={onCompletePost } />
        </div>
      </ModalSection>
    </div>
  );
};

export default AddressModal;
