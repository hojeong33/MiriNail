import styled from 'styled-components'
import ShareIcon from '@mui/icons-material/Share';
import {useState} from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useQuery } from 'react-query';
import { designDetail, nailLike } from '../../store/api';
import { useParams } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';


const Wrapper = styled.div`
  padding-top : 140px;
  overflow:hidden;
  height:705px;
  .row {
  
    max-width: 1300px;
    margin : 0 auto;
    zoom : 1;
    .imHarf {
      margin: 5px;
      .leftBox {
        width : 50%;
        float: left;
        height : 500px;
      }
      
      .rightBox {
        height: 500px;
        position:relative;
        width : 50%;
        float: left;
        .imHarf {
          height :100%;
          .primary {
            height : 100%;
            .share {
              cursor:pointer;
              position :absolute;
              right : 0px;
              top : 0px;
              font-size: 1.8em;
            }
            .boxs {
              margin-bottom: 20px;
              padding: 5px 20px;
              background: #3D3C3A;
              color: #fff;
              display: inline-block;
            }
            .name {
              font-size: 2em;
              font-weight: 500;
              margin-bottom : 15px;
            }
            .price {
              margin-bottom : 15px;
              font-size: 1.5em;
            }
            .tags {
              margin-bottom: 25px;
              font-size: 14px;
              color : gray;
            }
            .info {
              position : relative;
              margin-bottom: 30px;
              height:60px;
              


              div {
                
                padding-left: 120px;
                padding-top : 15px;
                padding-bottom : 25px;
                font-size: 14px;
                margin-bottom: 10px;
                border-top: 1px solid rgba(61,60,58,0.2);
                border-bottom: 1px solid rgba(61,60,58,0.2);
                p {
                  position: absolute;
                  left: 0px;
                  top: 6px;
                  font-weight: 500;
                }
                span {
                  display :block;
                  // margin-top:0px;
                  // word-break:break-all;
                  display: -webkit-box; -webkit-box-orient: vertical; word-wrap: break-word; text-overflow: ellipsis; overflow: hidden; line-height:20px; /* ★★ 설정이 필요한 영역 ★★ */ /* ★★ 3줄 이상은 말줄임 처리 ★★ */ -webkit-line-clamp: 3; /* ★★ line-height:20px일때 ★★ */ height: 60px;

              
                }
              }
            }
            .designerInfo {
              margin-top: 60px;
              display:flex;
        
              .designerImg {
                img {
                  margin-top:5px;
                  width :70px;
                  height :70px;
                  border-radius :100%;
                  margin-left : 10px;
                }
              }
              .designerName {
                margin-top : 12px;
                margin-left : 38px;
        
              }
            }
            .btns {
              margin-top : 40px;
              position : relative;
              zoom : 1;
              width:100%;
          
              a {
                float:left;
                font-size: 16px;
                padding: 2% 1.2%;
                text-align: center;
                width: 33%;
                border-left: 1px solid rgba(61,60,58,0.4);
                border-top: 1px solid rgba(61,60,58,0.4);
                border-bottom: 1px solid rgba(61,60,58,0.4);
                border-right: 1px solid rgba(61,60,58,0.4);
                cursor: pointer;
                border-right: 0px;
                background-color: #F7F7F5;
                color: #3D3C3A;
              }
            }
          }
        }
      }
    }
  }
`

const UpperFrame = () => {
  let params = useParams()
  console.log(params)
  const [detailInfo,setDetailInfo] = useState (
    {
      type : '프렌치네일',
      price : '50,000원',
      tags : '#봄 #태그123 #태그 456',
      info : '모든 피부타입dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      name : 'Designer1',
      shop : 'Nailshop1',
      color : '딥 다크',
      title : '프렌치 - 딥다크'
    }
  )

  

  const {isLoading:nailLoading, data:nailData } = useQuery("detail", () => designDetail(params.id?.slice(1,params.id.length)))
  

  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="imHarf">

            <div className="leftBox">
              <div className="imHarf">
                <div className="mainImg">
                  <img style={{width:"95%", height:"500px"}} src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
                </div>
              </div>

            </div>
            <div className="rightBox">
              <div className="imHarf">
                <div className="primary">
                  <div className="share">
                    <ShareIcon />
                  </div>
                  <div className="boxs">
                    {nailData?.nailartType}
                  </div>
                  <div className='name'>
                    {detailInfo.title}
                  </div>
                  <div className="price">
                    {nailData?.nailartPrice}
                  </div>
                  <div className="tags">
                    #{nailData?.nailartWeather} #{nailData?.designerNickname}
                  </div>
                  <div className="info">
                    <div>
                      <p>제품소개</p>
                      <span>{nailData?.nailartDesc}</span>
                    </div>
                  </div>
                  <div className='designerInfo'>
                    
                    <div className="designerImg">
                      <img src="http://spnimage.edaily.co.kr/images/photo/files/NP/S/2022/02/PS22020200015.jpg" alt="" />
                    </div> 
                    <div className='designerName'>
                      <div style={{fontSize:"1.2em"}}>
                        {nailData?.designerNickname}
                      </div>
                      <div style={{color:'gray'}}>
                        Nailshop1
                      </div>
                    </div>
                  </div>
                  <div className='btns'>
                    <a style={{backgroundColor:"red",color:"white",}}><CalendarMonthIcon style={{visibility:"hidden",width:"0px"}}></CalendarMonthIcon>AR 피팅하기</a>
                    <a style={{backgroundColor:'white'}}><CalendarMonthIcon />예약하기</a>
                    <a  style={{backgroundColor:"white",borderRight:"1px solid rgba(61,60,58,0.4)"}} onClick={() => nailLike(params.id?.slice(1,params.id.length))}><FavoriteBorderIcon />115556</a>

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

export default UpperFrame