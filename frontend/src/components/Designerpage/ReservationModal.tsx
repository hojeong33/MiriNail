import React, { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../Commons/functions";
import moment from "moment";

export type ModalBaseProps = {
  /** 모달에 들어갈 컴포넌트 */
  children?: ReactNode;
  /** 모달 창 생성 여부를 컨트롤할 변수 */
  visible: boolean;
  /** 닫기 버튼 혹은 백그라운드 클릭 시 실행할 함수 */
  onClose: () => void;
  info: any;
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
  width: 600px;
  height: 610px;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 500px;
  left: 50%;
  border: 1px solid black;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  ${(props) => modalSettings(props.visible)}
`;

const Title = styled.h1<{ visible: boolean }>`
  margin: 40px 0 10px;
  font-size: 30px;
  text-align: center;
  ${(props) => modalSettings(props.visible)}
`;

const Divider = styled.hr`
  border: solid 1px #000000;
  margin: 0 auto;
  width: 65%;
  margin-bottom: 30px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 5px;
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

const ContentBox = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  margin: 40px 100px;
  .tag {
    width: 100px;
    text-align: left;
    font-weight: 500;
  }
  .tagright {
    white-space: pre-wrap;
    overflow-y: auto;
  }
`;
const Ask = styled.div`
  margin: 40px 100px;
  .tag {
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  .tagright {
    border: 1px solid #d1d1d1;
    white-space: pre-wrap;
    overflow-y: auto;
    height: 100px;
    text-align: left;
    padding: 8px;
  }
`;

//// component
const ModalBase = ({ children, visible, onClose, info }: ModalBaseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
        <Title visible={visible}>
          {moment(convertDate(info?.bookDatetime)).format(
            "MM/DD HH:mm 예약정보"
          )}
        </Title>
        <Divider />
        <ContentBox>
          <Content>
            <div className="tag">예약자 :</div>
            <div className="tagright">
              <ProfileImg
                src={
                  info?.user.userProfileImg
                    ? info.user.userProfileImg
                    : "/assets/images/default_profile.png"
                }
                alt=""
              />
              {info?.user.userNickname}
            </div>
          </Content>
          <Content>
            <div className="tag">이메일</div>
            <div className="tagright">{info?.user.userEmail}</div>
          </Content>
          <Content>
            <div className="tag">예약일시</div>
            <div className="tagright">
              {moment(info?.bookRegedAt).format("YYYY/MM/DD HH:mm")}
            </div>
          </Content>
          <Content>
            <div className="tag">네일아트 명</div>
            <div className="tagright">
              {info?.nailart.nailartType} - {info?.nailart.nailartDetailColor}
            </div>
          </Content>
          <Ask>
            <div className="tag">요청사항</div>
            <div className="tagright">
              {info?.bookComment ? info?.bookComment : "요청사항 없음"}
            </div>
          </Ask>
        </ContentBox>
      </ModalSection>
    </div>
  );
};

export default ModalBase;
