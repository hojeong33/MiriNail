import ClearIcon from "@mui/icons-material/Clear";
const ImagePreview = ({ image, deleteFunc, test }: any) => {
  return (
    <div className="ImagePreview" draggable>
      <img src={image} alt="preview" />
      <div
        className="icon_container"
        style={{ cursor: "pointer" }}
        onClick={deleteFunc}
      >
        <ClearIcon
          style={{ padding: "2px", marginBottom: "3px", marginLeft: "0.5px" }}
        ></ClearIcon>
      </div>
    </div>
  );
};

export default ImagePreview;
