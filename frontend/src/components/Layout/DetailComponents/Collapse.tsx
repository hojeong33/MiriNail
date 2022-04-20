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

const ReplsyStyle = styled.div`
  width:100%;

  .replyTop {
    display : flex;
    justify-content :flex-start;
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
    border-bottom : 1px solid #e3e3e3;
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

const NestedList = (replyList:any) => {
  const hmm = {
    border : "3px solid #e3e3e3",
    padding : "5px"

  }
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
    if (inputOpen) {
      setInputOpen(false)
    }
    
  };

  const replys = replyList.replyList
  const [inputOpen, setInputOpen] = React.useState(false)

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
                {replys.map((e:any) => {
                  return (
                    <>
                      <div className='replyTop'>
                        <div className='replyTopLeft'>{e.userId}</div>
                        <div className='replyTopRight'>{e.date}</div>
                      </div>
                      <div className='replyBottom'>{e.content}</div>
                    </>
                    
                  )
                })}
                <div className='inputBox'>
                  <input type="text" placeholder='댓글을 작성해주세요' onClick={() => setInputOpen(true)}/>
                  {inputOpen ? 
                    <div className='buttons'>
                      <div className='btn1'>확인</div>
                      <div className='btn2'onClick={() => {setInputOpen(false)}}>취소</div>
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