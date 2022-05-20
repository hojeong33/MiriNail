import ReactPlayer from "react-player/lazy";
import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [playIndex, setPlayIndex] = useState(0);
  const playList = [
    {
      index: 1,
      url: "https://www.youtube.com/watch?v=Z9Xi-spO7CA" ,
    },
    // {
    //   index: 2,
    //   url: "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
    // },
    // {
    //   index: 3,
    //   url: "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
    // },
  ];

  const handleNextVideo = (video: string | any[], playIndex: number) => {
    if (playIndex === video.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  const selectVideo = (index: number) => {
    setPlayIndex(index);
  };

  if (playList === null) return <p>Loading...</p>;

  

  return (
    <>
      <div style={{position:'absolute',width:'100vw',backgroundColor:'white',zIndex:'9997',height:'55px'}}> </div>
      <div style={{position:'absolute',width:'130px',backgroundColor:'white',zIndex:'9997',height:'100vh'}}> </div>
      <div style={{position:'absolute',width:'130px',backgroundColor:'white',zIndex:'9997',height:'100vh',right:'0px'}}> </div>
      
      <ReactPlayer
        url={playList[playIndex].url}
        playing
        controls={false}
        muted
        progressInterval={1000}
        pip={true}
        onEnded={() => {
          handleNextVideo(playList, playIndex);
        }}
        width={"100vw"}
        height={"100vh"}
        loop={true}
      />
    </>
  );
};

export default VideoPlayer;
