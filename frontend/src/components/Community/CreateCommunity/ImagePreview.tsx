const ImagePreview = ({ image, deleteFunc, test }: any) => {
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
      <div className="icon_container" onClick={deleteFunc}></div>
    </div>
  );
};

export default ImagePreview;
