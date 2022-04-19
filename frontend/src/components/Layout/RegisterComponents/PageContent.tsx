import styled from 'styled-components'
import UnderLineInput from '../../Commons/UnderLineInput'
import FileUpload from './FileUpload'


const Wrapper = styled.div`
  * {
  margin: 0px;
  padding: 0px;
  position: relative;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  
  }

  height : 100vh;

  
`
const MainFrame = styled.div`
  width :1300px;
  height: 100%;
  margin : 0 auto;
  

  .MainPadding {
    height:100%;
    margin : 0px 10px;

    .ItemList {
      padding-left:180px;
      height:100%;

      .LeftBox {
        position: absolute;
        padding-right: 100px;
        left: 0px;
        top: 0px;
        z-index: 10;
        padding-top: 75px;
        
        .TypeFilter {
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
        }
        
        .OrderFilter {
          margin-top:100px;
          a { 
            display:block; 
            color:#3D3C3A; 
            opacity:0.5; 
            transition:all 0.3s; 
            font-size:14px; 
            margin-bottom:20px;
          }
          a.active{ opacity:1;}
          a:hover{ opacity:1;}
          .CheckBox {
            display:block;
            font-size:14px; 
            color:#3D3C3A; 
            label {
              margin-left: 7px;
            }
          }
          
        }

        

      
      }

      .RightBox {
        padding-left :80px;
        height :100%;
        padding-top: 75px;
        width: 100%;
        border-left: 1px solid #d2d2d0;
        padding-bottom: 160px;
        text-align: left;
        .subTitle {
          font-weight : bold;
          font-size : 18px;
          border-bottom :5px solid #e3e3e3;
          margin-right: 100px;
          padding-bottom : 5px;
        }
        .fileBox {
          margin-top :48px;
        }
        .infoBox {
          margin-top : 48px;
        }
       
        textarea {
          
          width :90%;
          display: block ;
          // margin : 0 auto;
          margin-top : 24px;
          height : 250px;
        }

        .buttons {
          margin-top: 48px;
          display : flex;
          justify-content : center;
          width:90%;
          .btn1 {
            background-color:rgb(51, 51, 51);
            color:white;
            padding: 10px 40px 10px 40px;
            margin : 10px 5px 10px 10px;
            border-radius :5px;
          }
          .btn2 {
            border : 1px solid rgb(51, 51, 51);
            color:rgb(51, 51, 51);
            padding: 10px 40px 10px 40px;
            margin : 10px 20px 10px 30px;
            border-radius :5px;
        }
      }
      
    }
  }
`

const PageContent = () => {
  return (
    <>
      <Wrapper>
        <MainFrame>
        <div className="MainPadding">
          <div className="ItemList">
            <div className="LeftBox">
              
              <div className="OrderFilter">
                <a>정렬</a>
                <div className="CheckBox">
                  <input type="checkbox" id="cb1" />
                  <label htmlFor="cb1">이미지 등록 (1/2)</label>
                </div>
                <div className="CheckBox">
                  <input type="checkbox" id="cb2" />
                  <label htmlFor="cb2">네일정보 등록 (1/4)</label>
                </div>
                <div className="CheckBox">
                  <input type="checkbox" id="cb3" />
                  <label htmlFor="cb3">소개글 등록 (0/1)</label>
                </div>
              </div>

           
            </div>
            <div className="RightBox">
              <div className='subTitle' style={{marginTop:"48px"}}>
                이미지 등록
              </div>
              <div className='fileBox'>
                <FileUpload />
              </div>
              <div className='subTitle' style={{marginTop:"120px"}}>
                네일정보 등록
              </div>
              <div className='infoBox'>
                <UnderLineInput />
              </div>
              <div className='subTitle' style={{marginTop:"120px"}}>
                소개글 등록
              </div>
              <textarea name="" id="">asdfsd</textarea>
              <div className="buttons">
                <div className="btn1">
                  등록
                </div>
                <div className="btn2">
                  취소
                </div>
              </div>
     
            </div>
          
          </div>
          
        </div>
        <div>
          
        </div>
        </MainFrame>
        
      </Wrapper>
      
    </>
  )
}

export default PageContent