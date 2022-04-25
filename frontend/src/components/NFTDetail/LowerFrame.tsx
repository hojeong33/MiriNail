import styled from 'styled-components'
import DesignReview from '../Layout/DetailComponents/DesignReview'
import Gallery from '../Layout/DetailComponents/Gallery'
import OneOnOneInquiry from '../Layout/DetailComponents/OneOnOneInquiry'
import {useState} from 'react'

const Wrapper = styled.div`

  max-width: 1300px;
  margin : 0 auto;
  margin-top :150px;
  zoom : 1;
  
  .imx {
    margin : 5px;
  }
  .menus {
    display:flex;
    justify-content:center;
    .menu {
      border-right :2px solid rgba(61,60,58,0.2);
      margin-right :15px;
      padding: 10px 30px;
    }
    .rightMenu {
      padding: 10px 30px;
    }
  }

  .contentBox {
    margin-top:100px;
  }

  
`

const LowerFrame = () => {

  const [status,setStatus] = useState(0)

  return (
    <Wrapper>
      <div className='imx'>
        <div className='menus'>
          <div className='menu' style={status === 0 ? {paddingRight:"45px",color:"black",} : {paddingRight:"45px",color:"gray"}} onClick={() => setStatus(0)}>갤러리</div>
          <div className='menu' style={status === 1 ? {paddingRight:"38px",color:"black",} : {paddingRight:"38px",color:"gray"}} onClick={() => setStatus(1)}>디자인 리뷰</div>
          <div className='rightMenu' style={status ===2 ? {color:"black",} : {color:"gray"}} onClick={() => setStatus(2)}>1대1 문의</div>
        </div>
        <div className='contentBox'>
          {
            status === 0 ? <Gallery /> : null
          }
          {
            status === 1 ? <DesignReview /> : null
          }
          {
            status === 2 ? <OneOnOneInquiry /> : null
          }
          {/* <Gallery /> */}
          {/* <DesignReview /> */}
          {/* <OneOnOneInquiry /> */}
        </div>
      </div>
    </Wrapper>
  )
}

export default LowerFrame