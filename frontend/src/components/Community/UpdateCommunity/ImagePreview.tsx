

const ImagePreview = ({ image, deleteFunc, test,pImage }: any) => {

  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
      {/* { pImage.map((e:any )=> {
        return (
          <>
            <img src={pImage.communityImgUrl} alt="" />
          </>
        )
      })} */}
      <div className="icon_container" onClick={deleteFunc}></div>
    </div>
  );
};

export default ImagePreview;
