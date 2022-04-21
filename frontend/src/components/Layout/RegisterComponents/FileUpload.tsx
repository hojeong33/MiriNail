import {useState,useRef,useEffect,} from 'react'
import ImagePreview from './ImagePreview';
import './File.scss';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ImageUploadBox = (props:any) => {
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState([]);
  const uploadBoxRef = useRef<any>();
  const inputRef = useRef<any>();

  useEffect(() => {
    console.log(uploadedImages)
    props.setImageProcess(uploadedImages)
    // props.setImageProcess(uploadedImages.length)
  }, [uploadedImages])

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;
    
    const handleFiles = (files:any) => {
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        const reader = new FileReader();
        reader.onloadend = (e:any) => {
          const result:any = e.target.result ;
          if (result) {
            setUploadedImages((state:any) => [...state, result].slice(0, 2));
            
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    const changeHandler = (event:any) => {
      const files = event.target.files;
      handleFiles(files);
    };
    
    const dropHandler = (event:any) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };
    
    const dragOverHandler = (event:any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    
    uploadBox.addEventListener("drop", dropHandler);
    uploadBox.addEventListener("dragover", dragOverHandler);
    input.addEventListener("change", changeHandler);
    
    return () => {
      uploadBox.removeEventListener("drop", dropHandler);
      uploadBox.removeEventListener("dragover", dragOverHandler);
      input.removeEventListener("change", changeHandler);
    };
  }, []);
  
  useEffect(() => {
    const imageJSXs:any = uploadedImages.map((image, index) => {
      const isDeleteImage = (element:any) => {
        return element === image;
      };
      const deleteFunc = () => {
        uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
        setUploadedImages([...uploadedImages]);
      };
      return <ImagePreview image={image} deleteFunc={deleteFunc} test={index} key={index} />;
    });
    setPreviewImages(imageJSXs);
  }, [uploadedImages]);

  return (
    <div className="ImageUploadBox">
      <div>
        <label className="drag_or_click" htmlFor="1" ref={uploadBoxRef}>
          <div className="text_box">
            <h3>드래그 또는 클릭하여 업로드</h3>
            <span>권장사항: oooMB 이하 고화질</span>
          </div>
          <div className="icon_box">
            <FileUploadIcon fontSize="large"/>
          </div>
        </label>
        <div className="guideBox">
          <div className="leftBox">
            <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
          </div>
          <div className="rightBox">
            <div>가상 네일 피팅 서비스를 위해 가이드 이미지를 준수해주세요.</div>
            <div>*권장 이미지 비율 640px X 320px</div>
            {/* <div>*첫 번째 사진이 AR인식용, 두 번째 사진이 썸네일용</div> */}
          </div>
        </div>
      </div>
      <input type="file" multiple accept="image/*" id="1" ref={inputRef} />
      <div className="preview_wrapper">
        {/* <div className="previewBoxLeft">
          <div>
            asfdsa
          </div>
          <div>
            asfdsa
          </div>
        </div> */}
        <div className="preview_container">
          {previewImages}
        </div>
      </div>
    </div>
  );
}

export default ImageUploadBox