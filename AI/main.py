from typing import Optional

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
# from flasktest import get_stream_video
from testtemp3guhyun import testVideo
from matplotlib import pyplot as plt
import tensorflow as tf
import numpy as np
import cv2
import mediapipe as mp
from imutils.video import WebcamVideoStream
import find_finger as ff
import math
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import asyncio

app = FastAPI()


def video_streaming():
    return testVideo()

@app.get("/")
def read_root():
    print('음... 이ㅐ건떠야하는데')
    return {"Hello": "World"}


async def streamer(gen):
    try:
        for i in gen:
            yield i
            await asyncio.sleep(0.25)
    except asyncio.CancelledError:
        cv2.destroyAllWindows()
        cv2.VideoCapture(0, cv2.CAP_DSHOW).release() 
        WebcamVideoStream(src=0).stop()
        print('되기는 하는건가?')
        # print(cv2.VideoCapture.isOpend())
        print("caught cancelled error")


@app.get("/video")
def main():
    # StringResponse함수를 return하고,
    # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
    print('video url 접근')
    return StreamingResponse(streamer(video_streaming()), media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}