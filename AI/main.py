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


app = FastAPI()


def video_streaming():
    print(2)
    return testVideo()

@app.get("/nail")
def read_root():
    print('음... 이ㅐ건떠야하는데')
    return {"Hello": "World"}

@app.get("/nail/video")
def main():
    # StringResponse함수를 return하고,
    # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
    print('video url 접근')
    return StreamingResponse(video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/nail/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}