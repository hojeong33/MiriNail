import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import Map from "../Commons/Map";
import { useRecoilValue } from "recoil";
import { designerAtom } from "../../store/atoms";
import AddressModal from "../Mypage/AddressModal";
import { useMutation } from "react-query";
import { getDesignerinfo, putUpdateIntroduction } from "../../store/apis/designer";
import { useNavigate, useParams } from "react-router-dom";
import { convertURLtoFile } from "../Commons/functions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .underline {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
    width: 160px;
    padding: 5px;
  }
  .infobox {
    width: 768px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    padding: 20px;
    .infocontents {
      margin: 20px;
    }
    .infocontent {
      display: flex;
      align-items: center;
      .tag {
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        width: 100px;
      }
    }
    .addressbtn {
      input {
        width: 180px;
        border-bottom-width: 2px;
      }
      button {
        padding: 6px 15px;
        margin-left: 15px;
        background-color: #333;
        color: white;
      }
    }
    .shoplocation {
      margin: 12px 0 15px;
    }
    .opentime {
      margin-top: 1px;
      .startend {
        width: 100px;
        text-align: left;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
  .introductionbox {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 768px;
    border: 1px solid #e0e0e0;
    padding: 20px;
    img {
      width: 340px;
      height: 340px;
    }
  }
  textarea {
    resize: none;
    width: 356px;
    border: 1px solid #cccccc;
    padding: 10px;
  }
  .submitbutton {
    margin-top: 20px;
    width: 768px;
    background-color: rgb(51, 51, 51);
    padding: 15px;
    color: white;
    font-size: 22px;
    font-weight: 500;
    :hover {
      background-color: #1d1d1d;
    }
  }
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    color: black;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 350px;
    border: 3px dashed lightgray;
    border-radius: 5px;
    cursor: pointer;
    div {
      img {
        max-width: 350px;
        max-height: 350px;
        object-fit: cover;
      }
    }
    .infilebox {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
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
    color: #333;
    text-align: left;
    p {
      margin: 0;
    }
  }
`;

const ExplaneBox = styled.div`
  margin-top: 8px;
  p {
    font-size: 20px;
    margin: 0;
  }
`;

const Plus = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' fill='rgb(61, 61, 61)'/%3E%3C/svg%3E");
  width: 80px;
  height: 80px;
`;

interface IState {
  content: {
    imgurl: string;
    content: string;
  };
}

function UpdateIntroduction() {
  const designer = useRecoilValue(designerAtom);
  const [shopName, setShopName] = useState(designer.designerInfo.designerShopName);
  const [phoneNumber, setPhoneNumber] = useState(designer.designerInfo.designerTel);
  const [content, setContent] = useState(designer.designerInfo.designerInfoDesc);
  const [contentImgurl, setContentImgurl] = useState("");
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(designer.designerInfo.designerAddress); // 상세주소
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [designerShopOpen, setDesignerShopOpen] = useState(
    designer.designerInfo.designerShopOpen
  );
  const [designerShopClose, setDesignerShopClose] = useState(
    designer.designerInfo.designerShopClose
  );
  const { userSeq } = useParams();
  const navigate = useNavigate();
  const onChangeShopName = (e: any) => {
    setShopName(e.target.value);
  };

  const onChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const onChangeDesignerShopOpen = (e: any) => {
    setDesignerShopOpen(e.target.value);
  };

  const onChangeDesignerShopClose = (e: any) => {
    setDesignerShopClose(e.target.value);
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    setFile((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeMainFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const encodeMainFileToBasek64 = (fileBlob: any) => {
    const reader: any = new FileReader();
    if (fileBlob) {
      reader.readAsDataURL(fileBlob);
    }
    return new Promise(() => {
      reader.onload = () => {
        setContentImgurl(reader.result);
      };
    });
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
    setIsOpen(false);
  };

  const getDesigner = useMutation<any, Error>(
    ["getDesigner"],
    async () => {
      return await getDesignerinfo(Number(userSeq));
    },
    {
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        console.log(err)
        if (err.response.status === 401) { 
          navigate("https://k6e101.p.ssafy.io:8443/oauth2/authorization/kakao?redirect_uri=https://k6e101.p.ssafy.io/oauth2/redirect")
        }
      },
    }
  );

  const update = async () => {
    try {
      const files = new FormData();
      const data = {
        designerSeq: userSeq,
        designerShopName: shopName,
        designerAddress: addressDetail,
        designerInfoDesc: content,
        designerShopOpen: designerShopOpen,
        designerShopClose: designerShopClose,
        designerTel: phoneNumber,
      };
      files.append("jsonList", JSON.stringify(data));
      files.append("file", file);

      const res =  await putUpdateIntroduction(files);
      alert("정보가 수정되었습니다.")
      getDesigner.mutate();
      navigate(`/designerpage/${userSeq}/new`)
    } catch (error) {
      console.log(error)
    }
  }


  const onClickUpdate = () => {
    update()
  }

  const previewMainImage = () => {
    if (contentImgurl) {
      return (
        <div className="preview">
          {" "}
          {contentImgurl && <img src={contentImgurl} alt="preview-img" />}{" "}
        </div>
      );
    } else {
      return (
        <div className="infilebox">
          <Plus></Plus>
          <ExplaneBox>
            <p className="secondpart">10MB를 넘지않는</p>
            <p>JPG, PNG, GIF, SVG</p>
            <p>파일만 가능합니다.</p>
          </ExplaneBox>
        </div>
      );
    }
  };

  return (
    <Wrapper>
      <div className="infobox">
        <div className="infocontents">
          <div className="infocontent">
            <div className="tag">샵 이름</div>
            <input
              type="text"
              className="underline"
              spellCheck="false"
              onChange={onChangeShopName}
              defaultValue={shopName}
            />
          </div>
          <div className="infocontent">
            <div className="tag">연락처</div>
            <input
              type="text"
              className="underline"
              spellCheck="false"
              onChange={onChangePhoneNumber}
              defaultValue={phoneNumber}
            />
          </div>
          <div className="shoplocation">
            <div className="infocontent">
              <div className="tag">샵 위치</div>
            </div>
            <div className="infocontent">
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
          <div className="opentime">
            <div className="infocontent">
              <div className="tag">영업시간</div>
            </div>
            <div className="infocontent">
              <div className="startend">시작</div>
              <input
                defaultValue={designerShopOpen}
                onChange={onChangeDesignerShopOpen}
                type="text"
                spellCheck="false"
                className="underline"
              />
            </div>
            <div className="infocontent">
              <div className="startend">종료</div>
              <input
                defaultValue={designerShopClose}
                onChange={onChangeDesignerShopClose}
                type="text"
                spellCheck="false"
                className="underline"
              />
            </div>
          </div>
        </div>
        <Map location={designer.location} shopName={shopName} />
      </div>
      <div className="introductionbox">
        <textarea
          defaultValue={content}
          onChange={onChangeContent}
          spellCheck="false"
          name=""
          id=""
        ></textarea>
        <UploadBox>
          <label htmlFor="chooseFile">
            {previewMainImage()}
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
          {file?.type.slice(0, 5)} */}
        </UploadBox>
      </div>
      <button className="submitbutton" onClick={onClickUpdate}>수정하기</button>
      <div>
        <AddressModal
          visible={isOpen}
          onClose={handleModalClose}
          onCompletePost={onCompletePost}
        ></AddressModal>
      </div>
    </Wrapper>
  );
}

export default UpdateIntroduction;
