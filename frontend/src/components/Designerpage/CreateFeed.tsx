import styled from 'styled-components'
import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedCarousels from './FeedCarousels';
import ImageUploadBox from './FileUpload3';
import { useMutation } from 'react-query';
import { postNewFeed } from '../../store/apis/designer';


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
      width: 620px;
      height: 300px;
      resize: none;
      padding: 10px;
    }
  }
  .createbuttonbox {
    display: flex;
    width: 768px;
    justify-content: flex-end;
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


const CreateFeed = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [postImages,setPostImages] = useState<any[]>([])
  const [imageProcess,setImageProcess] = useState([])


  const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }


  const onChangeContent = (e:any) => {
    setContent(e.target.value)
  }

  const createFeed = useMutation<any, Error>(
    "createFeed",
    async () => {
      const files = new FormData()
      const data = {
        designerSeq: 3,
        designerNewsTitle: title,
        designerNewsDesc: content,
      };
      files.append("jsonList",JSON.stringify(data))
      postImages.forEach((e) => {
        files.append("files", e);
      });
      return await postNewFeed(files);
    },
    {
      onSuccess: (res) => console.log(res),
      onError: (err: any) => console.log(err)
    }
  )

  const onClickCreateBtn = () => {
    createFeed.mutate();
  }


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
        <ImageUploadBox
          setImageProcess={setImageProcess}
          setPostImages={setPostImages}
        />
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
        <div className="createbuttonbox">
          <button className="createbutton" onClick={onClickCreateBtn}>
            <CheckIcon />새 소식 등록
          </button>
        </div>
      </Wrapper>
    </Container>
  );
}

export default CreateFeed