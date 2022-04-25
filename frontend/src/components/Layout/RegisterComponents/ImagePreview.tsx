import CloseIcon from '@mui/icons-material/Close';

const  ImagePreview = ({ image, deleteFunc,test }:any) =>  {
  return (
    <div className="ImagePreview" draggable>
      {test === 0 ? "썸네일 사진" : "AR인식용 사진" }
      <img src={image} alt="preview" />
      <div className="icon_container" onClick={deleteFunc}>
        <CloseIcon style={{cursor:"pointer"}}/>
      </div>
    </div>
  );
}

export default ImagePreview