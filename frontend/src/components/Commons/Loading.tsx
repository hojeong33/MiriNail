import RotatingLines, { BallTriangle, TailSpin } from "react-loader-spinner"
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loading = () => {
  return (
    <>
    <div style={{position:"fixed",left:"50%",transform:"translate(-50%,0)"}}>
    <BallTriangle color="gray" height={80} width={80} />
    </div>
    </>
  )
}


export const tailLoading = () => {
  return (
    <>
    <div style={{position:"fixed",left:"50%",transform:"translate(-50%,0)"}}>
    <TailSpin color="gray" height={80} width={80} />
    </div>
    </>
  )
}