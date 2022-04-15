import styled from 'styled-components'
import {useState} from 'react'

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
  return (
    <>
      
      <Wrapper>
      <ul className="clear">
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        <li className="ItemListType">
          <a href="" className="ItemBox">
            <div className="imx">
              <img src="https://image.msscdn.net/images/goods_img/20200721/1521989/1521989_1_500.jpg" alt="" />
              <div className="itemName">글레이즈 - 루비 레드</div>
              <div className="itemPrice">50,000원</div>
              <div className="hashTag">#겨울 #Designer1</div>
            </div>
          </a>
        </li>
        
        
        
      </ul>
      </Wrapper>
    </>
  )
}

export default NFTItems