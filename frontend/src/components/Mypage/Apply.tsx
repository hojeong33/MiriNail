import styled from "styled-components";
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .menu {
    margin-top: 20px;
    width: 100%;
    border: 1px solid #d1d1d1;
    padding: 20px;
    .menuSelectText {
      display: flex;
      font-size: 22px;
      margin: 10px;
      font-weight: 600;
    }
    .typebox {
      display: flex;
      button {
        padding: 20px;
      }
    }
    .menucontent {
      padding: 30px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-top: 1px solid black;
    }
  }
  .submitbutton {
    margin-top: 20px;
    width: 100%;
    background-color: rgb(51, 51, 51);
    padding: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    :hover {
      background-color: #1d1d1d;
    }
  }
  .rvtext {
    display: flex;
    font-size: 22px;
    margin: 10px 0 30px 10px;
    font-weight: 600;
  }
  .postcode {
    display: 'block';
    position: 'relative';
    top: '0%';
    width: '400px';
    height: '400px';
    padding: '7px';
  }
`;

const Divider = styled.div`
  margin: 20px auto;
  width: 95%;
  border-bottom: 1px solid #bcbcbc;
`;

const Apply = () => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false);

 
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data:any) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };
  // const { data } = useQuery(
  //   ["logDate", month],
  //   async () => {
  //     const result = await axios.get(
  //       `/api/healthLogs?health_log_type=DIET`
  //     );
  //     return result.data;
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       setMark(data);
  //      // ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 가져옴
  //     },
  //   }
  // );

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '400px',
    height: '400px',
    padding: '7px',
  };


  return (
    <Wrapper>
      <FormWrapper>
        <div className="menu">
          <div className="menuSelectText">디자이너 등록 정보</div>
          <div className="menucontent">
            <input type="text" placeholder="네일 샵 명"/>
            <button onClick={onChangeOpenPost}>dd</button>
            {isOpenPost  ? (
         <DaumPostcode className="postcode" autoClose onComplete={onCompletePost } />
      ) : null}
            <input type="text" placeholder="연락처"/>
          </div>
        </div>
        <button className="submitbutton">예약하기</button>
      </FormWrapper>
    </Wrapper>
  );
}
export default Apply;