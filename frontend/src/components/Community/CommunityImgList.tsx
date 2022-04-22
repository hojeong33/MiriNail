import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import image66 from "../../assets/img/sample/image66.png";
import image67 from "../../assets/img/sample/image67.png";
import image68 from "../../assets/img/sample/image68.png";
import image69 from "../../assets/img/sample/image69.png";
import image70 from "../../assets/img/sample/image70.png";
import image71 from "../../assets/img/sample/image71.png";
import styled from 'styled-components'
import {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height: "90%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CommunityImgList() {
  const [modalStatus,setModalStatus] = useState(false)
  const handleOpen = () => setModalStatus(true);
  const handleClose = () => setModalStatus(false);
  useEffect(() => {
    console.log(modalStatus )
  },[modalStatus])

  return (
    <ImageList
      //   sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={5}
      //   rowHeight={500}
    >
      
      {itemData.map((item) => (
        
          <ImageListItem
            key={item.id}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
              onClick={() => setModalStatus((prev:any) => !prev)}
            />
            <Modal
        open={modalStatus}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>sadfasdf</div>

            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
          
             wfwe
          </Typography>
        </Box>
      </Modal>
          </ImageListItem>
          
        
      ))}
      
      
    </ImageList>

    
  );
}

const itemData = [
  {
    img: image66,
    title: "sample",
    rows: 2,
    cols: 2,
    id : 1,
  },
  {
    img: image67,
    title: "sample",
    id : 2
  },
  {
    img: image68,
    title: "sample",
    cols: 2,
    id : 3
  },
  {
    img: image69,
    title: "sample",
    cols: 3,
    id : 4,
  },
  {
    img: image70,
    title: "sample",
    cols: 3,
    id : 5,
  },
  {
    img: image71,
    title: "sample",
    id : 6,
  },
  {
    img: image67,
    title: "sample",
    id : 7,
  },
];
