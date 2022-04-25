
import styled from 'styled-components'
// import './CardStyle.css'

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
    background-color: #F1F2F3;
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
    max-width: 200px;
    height : 300px;
    /* background-color: #FFF; */
    border-radius: 5px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    margin: 10px auto;
    cursor: pointer;
    height:264px;
}

.profile-card-6 img {
    transition: all 0.15s linear;
    width:100%;
    height:100%;
    object-fit: cover;
}

.profile-card-6 .profile-name {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
    padding: 5px 20px 25px 20px;
    background: linear-gradient(140deg, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 0, 0) 50%);
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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 50%, rgba(255, 255, 0, 0));
    color: #FFF;
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
    background-color: #F1F2F3;
  } 

  .container-fluid,
  .container {
    max-width: 1200px;
}
`





export interface hotDesignersProps {
  designer_seq : number;
  user_nickname : string;
  user_profile_img : string;
  designer_shop_name : string;
  follow_follower_length : number;
  designs : number; 
}
export interface Props {
  items : hotDesignersProps[];
  
}

export interface Prop {
  info : hotDesignersProps;
}


const Cards = ({info}: Prop) => {

  return (
    <>
      <Wrapper>
        <div className="col-md-12">
          <div className="profile-card-6"><img src={info.user_profile_img} className="img img-responsive" />
            <div className="profile-name">{info.user_nickname}</div>
              <div className="profile-position" style={{color:"#c5c4c4"}}>{info.designer_shop_name}</div>
              <div className="profile-overview">
                <div className="profile-overview">
                  <div className="row text-center">
                    <div className="col">
                    </div>
                    <div className="col">
                      <h3>{info.follow_follower_length}</h3>
                      <p>Followers</p>
                    </div>
                    <div className="col">
                      <h3>{info.designs}</h3>
                      <p>Designs</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </Wrapper>
      
    </>
  )
}


export default Cards