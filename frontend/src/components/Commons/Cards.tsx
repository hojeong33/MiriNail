
import styled from 'styled-components'
import './CardStyle.css'

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
   
      
    </>
  )
}


export default Cards