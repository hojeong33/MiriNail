import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import styled from 'styled-components'
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { delReviewComment, postReviewComment, revReviewComment } from '../../../store/api';
import { useState } from 'react';

const ReplsyStyle = styled.div`
  width:100%;

  .replyTop {
    display : flex;
    justify-content :flex-start;
    margin-top:5px;
    .replyTopRight {
      color :gray;
      margin-left : 15px;
      font-size :13px;
      padding-top : 2px;
    }
  }
  .inputBox {
    // margin:10px;
    // width:90%;
    padding : 20px 0px 20px 0px;
    margin : 5px;
    border-top : 1px solid #e3e3e3;
    // border-bottom : 1px solid #e3e3e3;
    text-align:center;
    input {
      width: 95%;
      border: 1px solid #e3e3e3;
      height :40px;
      padding-left:10px;
    }

    .buttons {
      display : flex;
      justify-content : flex-end;
      .btn1 {
        background-color:rgb(51, 51, 51);
        color:white;
        padding: 5px 20px 5px 20px;
        margin : 10px 5px 10px 10px;
        border-radius :5px;
      }
      .btn2 {
        border : 1px solid rgb(51, 51, 51);
        color:rgb(51, 51, 51);
        padding: 5px 20px 5px 20px;
        margin : 10px 20px 10px 5px;
        border-radius :5px;
    }

  }
`

const NestedList = ({replyList,reviewSeq}:any) => {
  
  const hmm = {
    // border : "3px solid #e3e3e3",
    padding : "5px"

  }
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false)
  const [inputData,setInputData] = useState('')
  const [revStatus,setRevStatus] = useState(0)
  const [revData,setRevData] = useState('')

  const onChangeInput = (e:any) => {
    setInputData(e.target.value)
  }

  const onChangeRevInput = (e:any) => {
    setRevData(e.target.value)
  }

  const postCommentFunc = useMutation((data:any) => 
    postReviewComment(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('reviews')
      } 
    }
  )

  const revReviewCommentFunc = useMutation((data:any) =>
    revReviewComment(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('reviews')
      }
    }
  )

  const delReviewCommentFunc = useMutation((data:any) =>
    delReviewComment(data)
    ,{
      onSuccess: () => {
        queryClient.invalidateQueries('reviews')
      }
    })


  const delSubmit = async(e:any) => {
    const param = e
    console.log(param)
    delReviewCommentFunc.mutate(param)
  }
  const revSubmit = async(e:any) => {
    const submitData = {
      reviewCommentDesc : revData,
      reviewCommentSeq : e
    }
    await revReviewCommentFunc.mutate(submitData)
    setRevStatus(0)
    setRevData('')
  }

  const commentSubmit = async() => {
    const submitData = {
      reviewCommentDesc : inputData,
      reviewSeq
    }
    // console.log(submitData)
    await postCommentFunc.mutate(submitData)
    setInputData('')
    setInputOpen(false)
  }
  
  const handleClick = () => {
    setOpen(!open);
    if (inputOpen) {
      setInputOpen(false)
    }
    
  };

  const handleRev = (seq:number) => {
    setRevStatus(seq)
  }

  const cancelRev = () => {
    setRevStatus(0)
    setRevData('')
  }
  

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="div"
      style={{position:"relative"}}

    >
      
        <ListItemButton onClick={handleClick} >
        
        <div >댓글</div>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit className="test">
          <div style={hmm}>
            {/* <ListItemButton sx={{ pl: 1 }}>

              <ListItemText primary="Starred" />
            </ListItemButton> */}
            <div>
            
              <ReplsyStyle > 
                {replyList?.map((e:any) => {
                  return (
                    <>
                      <div className='replyTop'>
                        <div className='replyTopLeft'>{e.userNickname}</div>
                        <div className='replyTopRight'>
                          {e.reviewCommentRegedAt[0]}-{e.reviewCommentRegedAt[1]}-{e.reviewCommentRegedAt[2]} 
                          <span style={{marginLeft:"2px"}}  onClick={() => handleRev(e.reviewCommentSeq)}>수정</span>
                          <span style={{marginLeft:"5px"}} onClick={() => delSubmit(e.reviewCommentSeq)}>삭제</span>
                        </div>
                      </div>
                      { revStatus === e.reviewCommentSeq ? 
                      <div style={{width:"100%"}}>
                        <input type="text" style={{width:"80%",height:"30px",fontSize:"14px",marginTop:"5px",paddingLeft:"10px",border:"1px solid #e3e3e3"}} 
                          value={revData} 
                          onChange={onChangeRevInput} 
                          onKeyUp={(e:any) => {if (e.keyCode ===13) {revSubmit(e.reviewCommentSeq)
                        }}}/>
                        <div style={{width:"80%",padding:"5px 10px 0px 5px",fontSize:"14px",color:"gray",textAlign:"right"}}>
                          <span  onClick={() => revSubmit(e.reviewCommentSeq)}>등록</span><span onClick={cancelRev} style={{marginLeft:"10px"}}>취소</span>
                        </div>
                        
                      </div>: 
                      <div className='replyBottom' style={{fontSize:"14px",marginTop:"2px"}}>{e.reviewCommentDesc}</div>}
                    </>
                    
                  )
                })}
                 {/* onKeyUp={(e:any) => {if (e.key === 13) {console.log('???'); commentSubmit()}}} */}
                <div className='inputBox'>
                  <input type="text" placeholder='댓글을 작성해주세요' onClick={() => setInputOpen(true)} onChange={onChangeInput} value={inputData} onKeyUp={(e:any) => {if (e.keyCode ===13) {commentSubmit()}}}/>
                  {inputOpen ? 
                    <div className='buttons'>
                      <div className='btn1'  onClick={commentSubmit}>확인</div>
                      <div className='btn2'onClick={() => {setInputOpen(false); setInputData('')}}>취소</div>
                    </div>
                  : null}
                </div>
              </ReplsyStyle>
            </div>
          </div>
        </Collapse>
    </List>
  );
}

export default NestedList