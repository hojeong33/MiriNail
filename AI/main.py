from cgi import test
from typing import Optional
import base64
import io
from fastapi import FastAPI, WebSocket, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
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
from fastapi.templating import Jinja2Templates
from fastapi.logger import logger
from imageio import imread
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles 

app = FastAPI()
origins = [
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/static", StaticFiles(directory="static"), name="static") 

test = '1'

def video_streaming():
    return testVideo()

@app.get("/nail")
def read_root():
    return {"Hello": "World"}

class Item(BaseModel):
    strings : str

@app.post('/post')
async def first_post(item : Item):
    global test
    test = item.strings
    return item


async def streamer(gen):
    try:
        for i in gen:
            yield i
            await asyncio.sleep(0.25)
    except asyncio.CancelledError:
        cv2.destroyAllWindows()
        cv2.VideoCapture(0, cv2.CAP_DSHOW).release() 
        WebcamVideoStream(src=0).stop()


@app.get("/nail/video")
def main():
    return StreamingResponse(streamer(video_streaming()), media_type="multipart/x-mixed-replace; boundary=frame")

@app.get("/nail/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}



# 웹소켓 연결을 테스트 할 수 있는 웹페이지 (http://127.0.0.1:8000/client)
templates = Jinja2Templates(directory="templates")

@app.get("/nail/client")
async def client(request: Request):
    # /templates/client.html파일을 response함
    print("request : " ,request)
    
    return templates.TemplateResponse("client.html", {"request":request})



# 웹소켓 설정 ws://127.0.0.1:8000/ws 로 접속할 수 있음
@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):
    response = requests.get(f'https://k6e101.p.ssafy.io/api/nailart/detail/{test}')
    print(test)
    nailImage = response.json()['nailartImgUrl']
    print(nailImage)
    await websocket.accept() # client의 websocket접속 허용
    await websocket.send_text(f"Welcome client : {websocket.client}")
    i = 0

    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_hands = mp.solutions.hands
    args = {
        "model": "./model/export_model_008/frozen_inference_graph.pb",
        "labels": "./record/classes.pbtxt",
        "num_classes": 1,
        "min_confidence": 0.6,
        "class_model": "../model/class_model/p_class_model_1552620432_.h5"}
    COLORS = np.random.uniform(0, 255, size=(args["num_classes"], 3))
    print('1 : 모델 생성')
    model = tf.Graph()
    with model.as_default():
        print("> ====== loading NAIL frozen graph into memory")
        graphDef = tf.GraphDef()

        with tf.gfile.GFile(args["model"], "rb") as f:
            serializedGraph = f.read()
            graphDef.ParseFromString(serializedGraph)
            tf.import_graph_def(graphDef, name="")
        # sess = tf.Session(graph=graphDef)
        print(">  ====== NAIL Inference graph loaded.")
        # return graphDef, sess
    

    with mp_hands.Hands(min_detection_confidence=0.8,min_tracking_confidence=0.5) as hands:
   
        with model.as_default():
            with tf.Session(graph=model) as sess:
                print('2 : 텐서플로우 실행')
                imageTensor = model.get_tensor_by_name("image_tensor:0")
                boxesTensor = model.get_tensor_by_name("detection_boxes:0")

                # for each bounding box we would like to know the score
                # (i.e., probability) and class label
                scoresTensor = model.get_tensor_by_name("detection_scores:0")
                classesTensor = model.get_tensor_by_name("detection_classes:0")
                numDetections = model.get_tensor_by_name("num_detections:0")
                drawboxes = []
                # vs = WebcamVideoStream(src=0)
                # vs.start()
            
                image_nparray = np.asarray(bytearray(requests.get(nailImage).content), dtype=np.uint8)
                imageDecode = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)
                print(imageDecode)
                img = imageDecode

                
                while True:
                    print('3 : 캠읽음')
                    data = await websocket.receive_text()  # client 메시지 수신대기
                    
                    data = data.split(',')[1]

                    imgtest = imread(io.BytesIO(base64.b64decode(data)))
                
                    
                    frame = cv2.flip(imgtest, 1)
                    # image = frame
                    (H, W) = frame.shape[:2]
                    # print("H,W:", (H, W))
                   
                    output = frame.copy()
                
                    # output[0:450, 0:450] = img
                    img_ff, bin_mask, res = ff.find_hand_old(output)
                    image = cv2.cvtColor(res, cv2.COLOR_BGR2RGB)
                    image_2 = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)
                    results = hands.process(image_2)
                   
                    image = np.expand_dims(image, axis=0)
                    # image_2 = cv2.cvtColor(image_2, cv2.COLOR_RGB2BGR)
                    imageHeight, imageWidth, _ = image_2.shape
                    # print('여기까진 옴')
                    if results.multi_hand_landmarks:
                        for num, hand in enumerate(results.multi_hand_landmarks):
                            normalizedLandmark = hand.landmark[12]
                            normalizedLandmark_2 = hand.landmark[11]
                            pixelCoordinatesLandmark = mp_drawing._normalized_to_pixel_coordinates(normalizedLandmark.x, normalizedLandmark.y, imageWidth, imageHeight)
                            pixelCoordinatesLandmark_2 = mp_drawing._normalized_to_pixel_coordinates(normalizedLandmark_2.x, normalizedLandmark_2.y, imageWidth, imageHeight)

                            try:
                                tanTheta = ((pixelCoordinatesLandmark_2[0]-pixelCoordinatesLandmark[0]))/((pixelCoordinatesLandmark_2[1]-pixelCoordinatesLandmark[1]))
                                theta = np.arctan(tanTheta)
                                
                                angle = theta*180/math.pi
                            except:
                                print('수평')


                            (boxes, scores, labels, N) = sess.run(
                                [boxesTensor, scoresTensor, classesTensor, numDetections],
                                feed_dict={imageTensor: image})
                            boxes = np.squeeze(boxes)
                            scores = np.squeeze(scores)
                            labels = np.squeeze(labels)
                            boxnum = 0
                            box_mid = (0, 0)

                            for (box, score, label) in zip(boxes, scores, labels):
                                # if int(label) != 1:
                                #     continue
                                if score < args["min_confidence"]:
                                    continue
                                # scale the bounding box from the range [0, 1] to [W, H]
                                boxnum = boxnum + 1
                                (startY, startX, endY, endX) = box
                                startX = int(startX * W)
                                startY = int(startY * H)
                                endX = int(endX * W)
                                endY = int(endY * H)
                                # print(startX,startY,endX,endY)
                                X_mid = startX + int(abs(endX - startX) / 2)
                                Y_mid = startY + int(abs(endY - startY) / 2)
                                # box_mid = (X_mid, Y_mid)
                                # draw the prediction on the output image
                                # label_name = 'nail'
                                # idx = int(label["id"]) - 1
                                # idx = 0
                                # label = "{}: {:.2f}".format(label_name, score)
                                # cv2.rectangle(image_2, (startX, startY), (endX, endY),
                                #             COLORS[idx], 2)
                                # y = startY - 10 if startY - 10 > 10 else startY + 10
                                # cv2.putText(image_2, label, (startX, y),
                                #             cv2.FONT_HERSHEY_SIMPLEX, 0.3, COLORS[idx], 1)

                                # x = X_mid
                                # y = Y_mid
                                
                                

                                # x = 가로 y = 세로 점
                                # print(startX,startY,endX,endY)
                                startX = startX -17
                                startY = startY -17
                                endX = endX +17
                                endY = endY +17
                                wi = int(abs(endY-startY))
                                he = int(abs(endX-startX))
                                try: 
                                    cat_sticker = cv2.resize(img,(wi,he))

                                    # 회전
                                    img_rotate = ff.rotate_image(cat_sticker,angle)
                                except:
                                    print('에러')


                                xx = X_mid -wi // 2
                                yy = Y_mid - he // 2
                                if xx < 0:
                                    cat_sticker = cat_sticker[:,xx:]
                                if yy < 0:
                                    cat_sticker = cat_sticker[-yy:,:]
                                
                                try :
                                    sticker_area = image_2[yy:yy+img_rotate.shape[0],xx:xx+img_rotate.shape[1]]
                                    image_2[yy:yy+img_rotate.shape[0], xx:xx+img_rotate.shape[1]] = np.where(img_rotate==0,sticker_area,img_rotate).astype(np.uint8)
                                except :
                                    print('에러')


                    
                    # i += 1
                    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
                    buffer = cv2.imencode('.jpg', image_2,encode_param)[1]
                    # print(buffer)
                    # frame을 byte로 변경 후 특정 식??으로 변환 후에
                    # yield로 하나씩 넘겨준다.
                    image_2 = buffer.tobytes()

                    # yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                    # bytearray(image_2) + b'\r\n')
                    # senddata =(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                    # bytearray(image_2) + b'\r\n')
                    await websocket.send_text(buffer.tobytes())
                    # return

                    # return StreamingResponse(, media_type="multipart/x-mixed-replace; boundary=frame")
        
