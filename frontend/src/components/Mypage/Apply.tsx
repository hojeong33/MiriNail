import styled from "styled-components";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import AddressModal from "./AddressModal";
import { useMutation, useQuery } from "react-query";
import { getApplyDetail, postApply } from "../../store/apis/authentication";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { TailSpin } from "react-loader-spinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ing = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
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
    display: "block";
    position: "relative";
    top: "0%";
    width: "400px";
    height: "400px";
    padding: "7px";
  }
  .underline {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
    width: 200px;
    margin-top: 20px;
    padding: 5px;
  }

  input:focus {
    outline: none;
  }
  .addressbtn {
    input {
      width: 400px;
      border-bottom-width: 2px;
    }
    button {
      padding: 6px 15px;
      margin-left: 15px;
      background-color: #333;
      color: white;
    }
  }
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    position: relative;
    margin: 30px;
    color: black;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 5px;
    .filelabel {
      display: flex;
      border: 1px solid #333;
      width: 250px;
      justify-content: space-between;
      align-items: center;
      .labelleft {
        padding: 5px;
      }
      .labelright {
        background-color: #333;
        color: white;
        padding: 5px 15px;
        cursor: pointer;
      }
    }
  }
  .file {
    display: none;
  }
  .file-name {
    margin-left: 15px;
    font-weight: bold;
    font-size: 18px;
    color: #6225e6;
    text-align: left;
    p {
      margin: 0;
    }
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

const Apply = () => {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const onChangeShopName = (e: any) => {
    setShopName(e.target.value);
  };

  const onChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    console.log("메인파일변화");
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
  };

  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpen(false);
  };

  const { data, isLoading } = useQuery<any, Error>(
    ["getApplyInfo"],
    async () => {
      return await getApplyDetail(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const apply = useMutation<any, Error>(
    "apply",
    async () => {
      const formData = new FormData();
      formData.append("designerAddress", addressDetail);
      formData.append("designerShopName", shopName);
      formData.append("designerTel", phoneNumber);
      formData.append("registrationFile", file);
      formData.append("userSeq", String(userSeq));
      return await postApply(formData);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        alert("성공적으로 신청되었습니다");
        navigate(`/mypage/${sessionStorage.getItem("userSeq")}/like`);
      },
      onError: (err: any) => {
        console.log(err)
        alert("신청중 오류가 발생하였습니다");
        if (err.response.status === 401) { 
          navigate("https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect")
        }
      },
    }
  );

  const cutWordLength = (word: string) => {
    if (!word) return;
    let result = word;
    if (word.length > 10) {
      result = result.slice(0, 10) + "...";
    }
    return result;
  };

  const onClickSubmit = () => {
    apply.mutate();
  };

  return isLoading ? (
    <LoadingBox className="loading">
      <TailSpin height={50} width={50} color="gray" />
    </LoadingBox>
  ) : data.data?.designerAuthStatus === 0 ? (
    <Ing>
      <CheckIcon />
      신청등록 심사중입니다.
    </Ing>
  ) : (
    <Wrapper>
      {data.data?.designerAuthStatus === 2 && (
        <div>이전의 신청등록이 거절되었습니다.</div>
      )}
      <FormWrapper>
        <div className="menu">
          <div className="menuSelectText">디자이너 정보 입력</div>
          <div className="menucontent">
            <input
              className="underline"
              type="text"
              onChange={onChangeShopName}
              defaultValue={shopName}
              spellCheck="false"
              placeholder="디자이너명"
            />
            <input
              className="underline"
              type="tel"
              onChange={onChangePhoneNumber}
              defaultValue={phoneNumber}
              spellCheck="false"
              placeholder='연락처 ("-"제외하고 입력)'
            />
            <div className="addressbtn">
              <input
                className="underline"
                type="text"
                placeholder="주소 입력"
                spellCheck="false"
                onClick={handleModalOpen}
                defaultValue={addressDetail}
              />
              <button className="addressbtn" onClick={handleModalOpen}>
                주소찾기
              </button>
            </div>
          </div>
        </div>
        <div className="menu">
          <div className="menuSelectText">사업자 등록증 첨부</div>
          <UploadBox>
            <label className={file?.type.slice(0, 5)} htmlFor="chooseFile">
              <div className="filelabel">
                <div className="labelleft">{cutWordLength(file?.name)}</div>
                <div className="labelright">파일첨부</div>
              </div>
            </label>
            <input
              className="file"
              id="chooseFile"
              type="file"
              accept="image/*"
              onChange={handleFileOnChange}
            ></input>
            {/* <div className="file-name">
            <p>{file?.name}</p>
          </div>
           */}
            {/* {file?.type.slice(0, 5)} */}
          </UploadBox>
        </div>
        <button className="submitbutton" onClick={onClickSubmit}>
          등록 신청하기
        </button>
      </FormWrapper>

      <div>
        <AddressModal
          visible={isOpen}
          onClose={handleModalClose}
          onCompletePost={onCompletePost}
        ></AddressModal>
      </div>
    </Wrapper>
  );
};
export default Apply;
