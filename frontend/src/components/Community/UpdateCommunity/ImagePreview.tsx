<<<<<<< HEAD
const ImagePreview = ({ image, deleteFunc, test, pImage }: any) => {
=======


const ImagePreview = ({ image, deleteFunc, test,pImage }: any) => {
  
>>>>>>> c16400cf5de50b5beb218d94379e73f5b1c7ca94
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
