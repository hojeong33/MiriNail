
import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { Paginations2 } from '../Paginations'
import OneOneOneWrite from './OneOnOneWrite'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteInquiry, delInquiryAnswer, inquiryList, postInquiryAnswer, revInquiryAnswer } from '../../../store/api'
import { useRecoilState, useRecoilValue } from 'recoil'
import { designerId, page2 } from '../../../store/atoms'
import LockIcon from '@mui/icons-material/Lock';
import OneOneOneRevise from './OneOnOneRevise'

const Wrapper = styled.div`
  margin-top : 100px;
  

  .table {
    margin-top : 60px;
    clear: both;
    width: 100%;
    text-align: center;
    background: #fff;
    border: 2px solid #ddd;
    border-collapse: collapse;
    .tableElement {
      display : table-column-group;
    }
    tbody {
      height :50px;
    }
    td {
      border-bottom: 1px solid #ddd;
    }

    th {
      height :60px;

      border-bottom: 2px solid #ddd;
      background-color :#dbd9d9;
    }
  }
  .box {
    display: flex;
    justify-content : space-between;
    margin : 0px 5px;
    .boxLeft .btn {
      background-color :rgb(61, 60, 58);
      color:white;
      
    }
  }

  .test {
    color:red;
    cursor: pointer;

  }

  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .reply {

    text-align:left;
  }

  .questionName {
    padding : 10px 0px;
    margin-left:15px;
    font-size:16px;
    font-weight:bold;
    width:80%;
  }
  .questionRev {
    width:20%;
    text-align:right;
    // line-height:40px;
    padding-top:5px;
    margin-right:10px;
    span {
      background-color:rgb(51, 51, 51);
      color:white;
      padding: 5px 10px 5px 10px;
      margin : 10px 5px 10px 10px;
      border-radius :5px;
      text-align:end;
      cursor:pointer;
    }
  }

  .questionContent {
    padding : 7px 0px;
    margin-left:15px;
    margin-right:15px;
    
  }

  .replyInfo {
    border-top: 1px solid #e1e1e1;
    background-color: #f3f3f3;
    display:flex;
    padding-left:15px;
    padding-right:15px;
    min-height:160px;
    

    .replyCharger {
      width:8%;
      line-height:160px;
      font-weight: bold;
    }
    .replyContent {
      width:72%;
      margin-top:15px;
      margin-bottom:15px;
      // border-left: 1px solid red;
    }
    .replyDate {
      width:20%;
      line-height:160px;
      text-align:right;
      padding-right:2%;
    }
  }

  hr {
    width:100%;
  }

  

  @media screen and (max-width: 1023px) {
    .table {
      
      .tableElement {
        display : table-column-group;
      }
      tbody {
        height :50px;
        font-size :13px;
      }
      td {
        border-bottom: 1px solid #ddd;
      }
  
      th {
        height :60px;
  
        border-bottom: 2px solid #ddd;
        background-color :#dbd9d9;
      }

      .column {
        // font-size:13px;
      }

      tr {
        // line-height:35px;
      }
    }
  
  
    .content {
      padding: 0 18px;
      display: none;
      overflow: hidden;
      background-color: #f1f1f1;
    }
  
  }

  @media screen and (max-width: 767px) {
    .column {
      th {
        font-size:12px;
      }
    }
  }
`

export interface IQnaInquiry {
  qnaAnswer: any
  qnaDesc: string
  qnaDesignerSeq: number
  qnaImgUrl: string
  qnaIsAnswered: boolean
  qnaIsPrivated: boolean
  qnaNailartSeq: number
  qnaRegedAt: string
  qnaSeq: number
  qnaTitle: string
  qnaType: any
  userNickname: string
  userSeq: number
}

const InquiryTable = () => {
  let params = useParams().id
  const queryClient = useQueryClient()
  const [answerFlag,setAnswerFlag] = useState(false)
  const [mypage,setMyPage] = useRecoilState(page2)
  const [answerData,setAnswerData] = useState({
    qnaAnswerDesc : '',
    qnaSeq : null,
  })
  const [answerRevData,setAnswerRevData] = useState({
    qnaAnswerDesc : '',
    qnaAnswerSeq : null,
  })
  
  const writerId = useRecoilValue(designerId)
  console.log(params)
  const {isLoading:isinquiryLoading,data:InquiryData} = useQuery<IQnaInquiry[]>(['inquiry',params,mypage], inquiryList)
  const myId = Number(sessionStorage.getItem('userSeq'))
  useEffect(() => {
    setMyPage(1)
  },[])

 
  
  const testFunc = (id:any,e:any) => {
    
    console.log(e.qnaDesignerSeq,writerId,e.userSeq,Number(myId))
    if (e.qnaIsPrivated) {
      if (Number(myId) === writerId || e.userSeq === Number(myId) ) {
        const mytest:any = document.getElementById(id)
        mytest?.classList.toggle('active')
        console.log(mytest.classList.contains('active'))
        // console.log(mytest.style.display)
        if (mytest?.style.display === "none") {
          mytest.style.display = ''
          console.log('none이엇음')
        } else {
          console.log('none아님')
          mytest.style.display = 'none'
        }
      } else {
        alert('비밀글 입니다')
      }
    }
    else {
      const mytest:any = document.getElementById(id)
      mytest?.classList.toggle('active')
      console.log(mytest.classList.contains('active'))
      // console.log(mytest.style.display)
      if (mytest?.style.display === "none") {
        mytest.style.display = ''
        console.log('none이엇음')
      } else {
        console.log('none아님')
        mytest.style.display = 'none'
      }
    }
  }

  const AnswerFunc = (e:any) => {
    const role = sessionStorage.getItem("userRole")
    console.log(e)
    if (e === true) {
      return "답변 완료"
    } else {
      if (role === 'ROLE_ARTIST') {
        return '작성 대기'
      } else {
        return '답변 대기'
      }
    }
    
  }

  const postInquiryAnswerFunc = useMutation((data:any) => 
    postInquiryAnswer(data)
    ,{
      onSuccess: () => {
        console.log('성공')
        queryClient.invalidateQueries('inquiry')
      }
    }
  ) 

  const revInquiryAnswerFunc = useMutation((data:any) =>
    revInquiryAnswer(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('inquiry')
      }
    }
  )

  const deleteInquiryFunc = useMutation((data:any) => 
    deleteInquiry(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('inquiry')
      }
    }
  )

  const deleteSubmit = async(e:any) => {
    deleteInquiryFunc.mutate(e)
  }

  const answerSubmit = async(e:any) => {
    const submitData = answerData
    submitData.qnaSeq = e.qnaSeq
    // console.log(submitData)
    postInquiryAnswerFunc.mutate(submitData)
  }

  const revSubmit = async(e:any) => {
    const submitData = answerRevData
    submitData.qnaAnswerSeq = e.qnaAnswer.qnaAnswerSeq
    revInquiryAnswerFunc.mutate(submitData)
    setAnswerFlag(false)
    
  }
  
  const onChangeInput = (e: any) => {
    setAnswerData({
      ...answerData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAnswerInput = (e: any) => {
    setAnswerRevData({
      ...answerRevData,
      [e.target.name]: e.target.value,
    });
  };

  const AnswerFrame = (e:any) => {
    console.log(e)
    const role = sessionStorage.getItem("userRole")
    if (e.qnaIsAnswered === true) {
      if (answerFlag === true) {
        return (
          <div className='replyInfo'>
            <div className='replyCharger'>담당자</div>
            <div className='replyContent' style={{width:"90%",marginLeft:"5%"}}>
              <textarea name="qnaAnswerDesc" id="" style={{width:"100%", height:"100%",resize:"none"}} onChange={onChangeAnswerInput}></textarea>
            </div>
            <div className='replyDate' style={{paddingRight:"45px"}}> 
              <span style={{
                backgroundColor:"rgb(51, 51, 51)",
                color:"white",
                padding: "10px 15px 10px 15px",
                margin : "10px 5px 10px 10px",
                borderRadius :"5px",
                fontSize:"20px"
                }}
                onClick={() => revSubmit(e)}>등록
              </span>
            </div>
          </div>
        )
      }
      return (
      <>
      {/* <div>sadfasd</div> */}
        <div className='replyInfo'>
          <div className='replyCharger'>담당자</div>
          <div className='replyContent'>{e.qnaAnswer ? e.qnaAnswer.qnaAnswerDesc : null}</div>
          <div className='replyDate'>{e.qnaAnswer ? e.qnaAnswer.qnaAnswerRegedAt.slice(0,10) : null}</div>
        </div>
      </>
    )} else {
      if (writerId === myId) {
        return (
          <div className='replyInfo'>
            <div className='replyCharger'>담당자</div>
            <div className='replyContent' style={{width:"90%",marginLeft:"5%"}}>
              <textarea name="qnaAnswerDesc" id="" style={{width:"100%", height:"100%",resize:"none"}} onChange={onChangeInput}></textarea>
            </div>
            <div className='replyDate' style={{paddingRight:"45px"}}> 
              <span style={{
                backgroundColor:"rgb(51, 51, 51)",
                color:"white",
                padding: "10px 15px 10px 15px",
                margin : "10px 5px 10px 10px",
                borderRadius :"5px",
                fontSize:"20px"
                }}
                onClick={() => answerSubmit(e)}>등록
              </span>
            </div>
          </div>
        )
      }
      else {
        <div></div>
      }
    }
  }

  return (
    <Wrapper>
      <div style={{fontSize:"40px",marginTop:"60px"}}>1대1 문의</div>
      <table className="table">
        <colgroup className="tableElement">
          <col style={{width:"10%"}} />
          <col style={{width:"15%"}} />
          <col style={{width:"auto"}} />
          <col style={{width:"12%"}} />
          <col style={{width:"15%"}} />
        </colgroup>
        <thead>
          <tr className="column">
            <th scope="col">번호</th>
            <th scope="col">답변여부</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일자</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td>1</td><td>답변완료</td><td id='test' onClick={testFunc}>아 진짜 왤케 하기싫지?</td><td>곽동현</td><td>2022-04-15</td>
          </tr>
          <tr>
            <td colSpan={6}>ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</td>
          </tr>
        </tbody> */}
        {InquiryData?.map((e:any) =>
        <tbody key={e.qnaSeq}>
            <tr>
              <td>{e.qnaSeq}</td>
              <td>{AnswerFunc(e.qnaIsAnswered)}</td>
              <td style={{cursor:"pointer"}} onClick={() => { testFunc(e.qnaSeq.toString(),e)}}>
                {e.qnaTitle}
                {e.qnaIsPrivated ? <LockIcon style={{marginLeft:"15px", color:"black"}}/> : null}
              </td>
              <td>{e.userNickname}</td>
              <td>{e.qnaRegedAt.slice(0,10)}</td>
            </tr>
            <tr>
              <td id={e.qnaSeq.toString()} colSpan={6} style={{display:'none', }} className="reply">
                <div style={{display:"flex"}}>
                  <div className="questionName">프렌치 - 딥 다크(해당 상품 이름)</div>
                  { e.userSeq === myId ? <div className="questionRev">
                    <OneOneOneRevise data={e}/><span onClick={() => deleteSubmit(e.qnaSeq)}>삭제</span>
                  </div>
                  : null }
                  { e.qnaDesignerSeq === myId && e.qnaIsAnswered === true ? <div className="questionRev">
                  <span onClick={() => setAnswerFlag(true)}>답변 수정</span><span onClick={() => delInquiryAnswer(e.qnaAnswer.qnaAnswerSeq)}>답변 삭제</span>
                  </div>
                  : null }
                </div>
                <hr />
                <div className='questionContent'>
                  <img src={e.qnaImgUrl} alt="" width="150" height="150"/>
                  <div style={{marginTop:"15px"}}>{e.qnaDesc}</div>
                </div>
                {/* <div className='replyInfo'>
                  <div className='replyCharger'>담당자</div>
                  <div className='replyContent'>안녕하세요. 아니 사실 안녕하지 않아</div>
                  <div className='replyDate'>2022.04.14</div>
                </div> */}
                {AnswerFrame(e)}
              </td>
            </tr>
        </tbody>
        )}
        
      </table>
      <div className="box">
        <div className="boxLeft">
          <div className="btn">
            <OneOneOneWrite />
          </div>
        </div>
        <div className="boxRight">
          <div >
            <Paginations2 />
          </div>
        </div>
      </div>
  

    </Wrapper>
  )
}

export default InquiryTable