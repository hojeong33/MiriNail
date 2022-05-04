const ImagePreview = ({ image, deleteFunc, test, defaultImg }: any) => {
  console.log("~~~~~~", defaultImg);
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
      <div className="icon_container" onClick={deleteFunc}></div>
    </div>
  );
};

export default ImagePreview;
