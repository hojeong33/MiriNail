import styled from 'styled-components'
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 768px;
  .dividertop {
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    input {
      padding: 5px;
    }
  }
  .feedcontent {
    margin: 30px 0;
    textarea {
      width: 650px;
      height: 300px;
      resize: none;
      padding: 10px;
    }
  }
  .createbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 40px;
    border: 1px solid #d2d2d0;
    :hover {
      background-color: #e0e0e0;
    }
    :active {
      background-color: #d2d2d0;
    }
    svg {
      margin-right: 5px;
    }
  }
`;

const Divider = styled.div`
  margin: 5px auto 35px;
  width: 100%;
  border-bottom: 1px solid #222;
  font-weight: 500;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    color: black;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 300px;
    border: 3px dashed lightgray;
    border-radius: 5px;
    cursor: pointer;
    div {
      img {
        max-width: 450px;
        max-height: 300px;
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
    color: #6225E6;
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

const CreateFeed = () => {
  const [title, setTitle] = useState<string>("");
  const [imgurl, setImgurl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<any>();
  const [fileSrc, setFileSrc] = useState<string>("");

  const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeImgurl = (e:React.ChangeEvent<HTMLInputElement>) => {
    setImgurl(e.target.value)
  }

  const onChangeContent = (e:any) => {
    setContent(e.target.value)
  }

  const handleFileOnChange = (e: React.ChangeEvent) => {
    console.log("메인파일변화");
    setFile((e.target as HTMLInputElement).files?.item(0));
    console.log((e.target as HTMLInputElement).files?.item(0));
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
        setFileSrc(reader.result);
      };
    });
  };
  const previewMainImage = () => {
    if (file?.type.slice(0, 5) === "image") {
      return (
        <div className="preview">
          {" "}
          {fileSrc && <img src={fileSrc} alt="preview-img" />}{" "}
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
    <Container>
      <Wrapper>
        <div className="dividertop">
          <div>
            <input
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="새 소식 제목"
              spellCheck="false"
            />
          </div>
        </div>
        <Divider></Divider>
        <UploadBox>
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
          <div className="file-name">
            <p>{file?.name}</p>
          </div>
          
          {/* {file?.type.slice(0, 5)} */}
        </UploadBox>
        <div className="feedcontent">
          <textarea
            onChange={onChangeContent}
            value={content}
            placeholder="내용 입력"
            name=""
            id=""
            spellCheck="false"
          ></textarea>
        </div>
        <button className="createbutton">
          <CheckIcon />새 소식 등록
        </button>
      </Wrapper>
    </Container>
  );
}

export default CreateFeed