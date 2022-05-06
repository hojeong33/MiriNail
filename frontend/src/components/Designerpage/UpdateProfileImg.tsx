import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Mutation, useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDesignerinfo, putProfileImgUpdate } from "../../store/apis/designer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  width: 768px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #d1d1d1;
`;

const DoUploadText = styled.div`
  width: 768px;
  p {
    display: flex;
    justify-content: flex-start;
    font-size: 22px;
    margin: 20px;
    font-weight: 600;
  }
`;

const UploadBox = styled.div`
  display: flex;
  width: 768px;
  justify-content: center;
  margin-top: 50px;
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    color: black;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    width: 300px;
    height: 300px;
    border: 3px dashed lightgray;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    div {
      img {
        object-fit: cover;
        width: 300px;
        height: 300px;
        border-radius: 50%;
      }
    }
    audio {
      width: 420px;
    }
    svg {
      width: 50px;
      height: 50px;
    }
  }
  .file {
    display: none;
  }
  .file-name {
    position: absolute;
    margin-left: 15px;
    font-weight: bold;
    font-size: 18px;
  }
`;

const Change = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  padding: 5px 0;
  margin-top: 15px;
`;

const FormBox = styled.form``;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin-top: 20px;
    width: 768px;
    background-color: rgb(51, 51, 51);
    padding: 20px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    :hover {
      background-color: #1d1d1d;
    }
  }
`;

const UpdateImg = () => {
  const [file, setFile] = useState<any>();
  const [fileSrc, setFileSrc] = useState<string>("");
  const { userSeq } = useParams();
  const navigate = useNavigate();

  const encodeMainFileToBasek64 = (fileBlob: any) => {
    const reader: any = new FileReader();
    if (fileBlob) {
      reader.readAsDataURL(fileBlob);
    }
    return new Promise(() => {
      reader.onload = () => {
        setFileSrc(reader.result);
      };
    });
  };

  const handleFileOnChange = (e: React.ChangeEvent) => {
    console.log("메인파일변화");
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
    if ((e.target as HTMLInputElement).files) {
      encodeMainFileToBasek64((e.target as HTMLInputElement).files?.item(0));
    }
  };

  const previewMainImage = () => {
    if (file?.type.slice(0, 5) === "image") {
      return (
        <div className="preview">
          {" "}
          {fileSrc && <img src={fileSrc} alt="preview-img" />}{" "}
        </div>
      );
    } else if (file) {
      alert("부적절한 파일입니다.");
      return (
        <div>
          <AddIcon />
        </div>
      );
    } else {
      return (
        <div>
          <AddIcon />
        </div>
      );
    }
  };

  const getDesigner = useMutation<any, Error>(
    ["getDesigner"],
    async () => {
      return await getDesignerinfo(Number(userSeq));
    },
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err: any) => console.log(err),
    }
  );

  const onClickPut = async () => {
    try {
      const formData = new FormData()
      formData.append("designerSeq ", String(userSeq));
      formData.append("file", file);
      const res = await putProfileImgUpdate(formData, Number(userSeq))
      console.log(res)
      alert("디자이너 사진이 변경되었습니다")
      getDesigner.mutate();
      navigate(`/designerpage/${userSeq}/new`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <DoUploadText>
        <p>사진을 업로드 해주세요</p>
      </DoUploadText>
      <Box>
        <FormBox>
          <UploadBox>
            <p className="file-name">{file?.name}</p>
            <label className={file?.type.slice(0, 5)} htmlFor="chooseFile">
              {previewMainImage()}
            </label>
            <input
              className="file"
              id="chooseFile"
              type="file"
              accept="image/*"
              onChange={handleFileOnChange}
            ></input>
          </UploadBox>
          <label htmlFor="chooseFile">
            {file && <Change>사진변경</Change>}
          </label>
        </FormBox>
      </Box>
      <ButtonBox>
        <button onClick={onClickPut}>적용하기</button>
      </ButtonBox>
    </Wrapper>
  );
};

export default UpdateImg;
