

const  ImagePreview = ({ image, deleteFunc,test }:any) =>  {
  return (
    <div className="ImagePreview" draggable>
      {test === 0 ? "AR인식용 사진" : "썸네일 사진" }
      <img src={image} alt="preview" />
      <div className="icon_container" onClick={deleteFunc}>
        
      </div>
    </div>
  );
}

export default ImagePreview