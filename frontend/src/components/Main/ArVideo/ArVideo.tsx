import ReactPlayer from "react-player/lazy";
import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [playIndex, setPlayIndex] = useState(0);
  const playList = [
    {
      index: 1,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      index: 2,
      url: "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
    },
    {
      index: 3,
      url: "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
    },
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
      <ReactPlayer
        url={playList[playIndex].url}
        playing
        controls
        muted
        progressInterval={1000}
        pip={true}
        onEnded={() => {
          handleNextVideo(playList, playIndex);
        }}
        width={"100%"}
        height={"5%"}
      />
    </>
  );
};

export default VideoPlayer;
