import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import './CardStyle.css'
import {
  IHighRateDesigner,
  IHotDesigner,
  ILatestDesigner,
} from "../Designer/PageContentThema";

const Wrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  input,
  p,
  a {
    font-family: "Open Sans";
    margin: 0px;
  }

  a,
  a:hover,
  a:focus {
    color: inherit;
  }

  body {
    background-color: #f1f2f3;
  }

  .container-fluid,
  .container {
    max-width: 1200px;
  }

  .card-container {
    padding: 100px 0px;
    -webkit-perspective: 1000;
    perspective: 1000;
  }

  .profile-card-6 {
    max-width: 220px;
    height: 300px;
    /* background-color: #FFF; */
    border-radius: 5px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    margin: 10px auto;
    cursor: pointer;
    height: 264px;
  }

  .profile-card-6 img {
    transition: all 0.15s linear;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-card-6 .profile-name {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    height:60px;  
    padding: 5px 20px 25px 20px;
    background: linear-gradient(
      140deg,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(255, 255, 0, 0) 50%
    );
    transition: all 0.15s linear;
  }

  .profile-card-6 .profile-position {
    position: absolute;
    color: rgba(255, 255, 255, 0.295);
    left: 30px;
    top: 45px;
    transition: all 0.15s linear;
  }

  .profile-card-6 .profile-overview {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(255, 255, 0, 0)
    );
    color: #fff;
    padding: 50px 0px 20px 0px;
    transition: all 0.15s linear;
  }

  .profile-card-6 .profile-overview h3 {
    font-weight: bold;
  }

  .profile-card-6 .profile-overview p {
    color: rgba(255, 255, 255, 0.7);
  }

  .profile-card-6:hover img {
    filter: brightness(80%);
  }

  .profile-card-6:hover .profile-name {
    padding-left: 25px;
    padding-top: 10px;
  }

  .profile-card-6:hover .profile-position {
    left: 40px;
  }

  .profile-card-6:hover .profile-overview {
    padding-bottom: 25px;
  }

  a a:hover a:focus {
    color: inherit;
  }
  body {
    background-color: #f1f2f3;
  }

  .container-fluid,
  .container {
    max-width: 1200px;
  }
`;

interface IHotDesignerProp {
  info: IHotDesigner;
  url?: string;
}

interface ILatestDesignerProp {
  info: ILatestDesigner;
  url?: string;
}

interface IHighRateDesignerProp {
  info: IHighRateDesigner;
  url?: string;
}

const Cards = ({
  info,
  url,
}: IHotDesignerProp | ILatestDesignerProp | IHighRateDesignerProp) => {
  const navigate = useNavigate();
  // console.log(info)
  return (
    <>
      <Wrapper>
        <div
          className="col-md-12"
          onClick={() => navigate(`/${url}/${info.designerSeq}/new`)}
        >
          <div className="profile-card-6">
            <img src={info.designerImgUrl ? info.designerImgUrl : 'https://source.unsplash.com/75S9fpDJVdo/300x510'} className="img img-responsive" />
            <div className="profile-name">{info.designerShopName}</div>
            <div className="profile-position" style={{ color: "#c5c4c4" }}>
              {info.designerNickName}
            </div>
            <div className="profile-overview">
              <div className="profile-overview">
                <div className="row text-center">
                  <div className="col"></div>
                  <div className="col">
                    <h3>{info.followerNum}</h3>
                    <p>팔로워</p>
                  </div>
                  <div className="col">
                    <h3>{info.nailartCount}</h3>
                    <p>작품</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Cards;
