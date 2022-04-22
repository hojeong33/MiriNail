import styled from 'styled-components'
// import {useState} from 'react'
// import { Paginations } from './Paginations'
import { useQuery } from 'react-query';
import {fetchDesigns} from '../../store/api'
const Wrapper = styled.div`


  .clear {
    zoom : 1;
    li {

      float: left;
      width: 25%;
      text-align: center;
      cursor: pointer;
      margin-bottom: 80px;
      .ItemBox {
        width : 100%;
        display:block;
        .imx {
          margin : 0px 10px;
          img {
            width :100%;
            max-width:100%;
          }
          .itemName {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 500;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .itemPrice {
            color: #3D3C3A;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .hashTag {
            color: #6E6E6E;
            font-size: 14px;
            margin-bottom: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`

const NFTItems = () => {

  const {isLoading:nftLoading, data:nftData} = useQuery("nftItems", fetchDesigns)
  // console.log(nftLoading, nftData)
  return (
    <>
      
      <Wrapper>
      {/* {items.map((item, idx) => {
          return (
            <div key={idx}>
              <Cards info={item}/>
            </div>
          );
        })} */}
      <ul className="clear">
        {nftLoading ? null : nftData.map((e:any, idx:any) => {
          return (
            <div>
              <li className="ItemListType">
               <a href="" className="ItemBox">
                 <div className="imx">
                   <img src="https:image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
                   <div className="itemName">{e.nailartType} - {e.nailartDetailColor}</div>
                   <div className="itemPrice">{e.nailartPrice}</div>
                   <div className="hashTag">#{e.nailartWeather} #{e.designerInfo.user.userNickname}</div>
                 </div>
               </a>
             </li>
            </div>
          )
        })}
          
        
        
        
      </ul>
      <div>
        
      </div>
      </Wrapper>
      
    </>
  )
}

export default NFTItems