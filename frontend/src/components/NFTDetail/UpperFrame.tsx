import styled from 'styled-components'
import ShareIcon from '@mui/icons-material/Share';

const Wrapper = styled.div`
  padding-top : 140px;
  overflow:hidden;
  height:605px;
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
            }
            .tags {
              margin-bottom: 25px;
              font-size: 12px;
            }
            .info {
              position : relative;
              // padding: 20px 0px 20px;
              margin-bottom: 30px;
              // border-top: 1px solid rgba(61,60,58,0.2);
              // border-bottom: 1px solid rgba(61,60,58,0.2);
              height:60px;
              


              div {
                
                padding-left: 120px;
                padding-top : 5px;
                padding-bottom : 5px;
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
              display:flex;
        
              .designerImg {
                img {
                  width :70px;
                  height :70px;
                  border-radius :100%;
                  margin-left : 10px;
                }
              }
              .designerName {
                margin-top : 10px;
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
                width: 30%;
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

  return (
    <>
      <Wrapper>
        <div className="row">
          <div className="imHarf">

            <div className="leftBox">
              <div className="imHarf">
                <div className="mainImg">
                  <img style={{width:"100%", height:"500px"}} src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
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
                    프렌치네일
                  </div>
                  <div className='name'>
                    프렌치 - 딥다크
                  </div>
                  <div className="price">
                    50,000 원
                  </div>
                  <div className="tags">
                    #봄 #태그123 #태그 456
                  </div>
                  <div className="info">
                    <div>
                      <p>제품소개</p>
                      <span>모든 피부타입dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</span>
                    </div>
                  </div>
                  <div className='designerInfo'>
                    
                    <div className="designerImg">
                      <img src="http://spnimage.edaily.co.kr/images/photo/files/NP/S/2022/02/PS22020200015.jpg" alt="" />
                    </div> 
                    <div className='designerName'>
                      <div style={{fontSize:"1.2em"}}>
                        Designer1
                      </div>
                      <div style={{color:'gray'}}>
                        Nailshop1
                      </div>
                    </div>
                  </div>
                  <div className='btns'>
                    <a >AR 피팅하기</a>
                    <a >예약하기</a>
                    <a  style={{backgroundColor:"#3D3C3A",color:"#fff",border:"1px #3D3C3A solid"}}>115556</a>

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