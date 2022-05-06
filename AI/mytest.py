# -*- coding: utf-8 -*-

# import the necessary packages
# from object_detection.utils import label_map_util
import tensorflow as tf
import numpy as np
import cv2
import mediapipe as mp
from imutils.video import WebcamVideoStream
import find_finger as ff
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hands = mp.solutions.hands

args = {
    "model": "./model/export_model_008/frozen_inference_graph.pb",
    # "model":"/media/todd/38714CA0C89E958E/147/yl_tmp/readingbook/model/export_model_015/frozen_inference_graph.pb",
    "labels": "./record/classes.pbtxt",
    # "labels":"record/classes.pbtxt" ,
    "num_classes": 1,
    "min_confidence": 0.6,
    "class_model": "../model/class_model/p_class_model_1552620432_.h5"}

COLORS = np.random.uniform(0, 255, size=(args["num_classes"], 3))

if __name__ == '__main__':
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

    status = 0
    with model.as_default():
        with tf.Session(graph=model) as sess:
            imageTensor = model.get_tensor_by_name("image_tensor:0")
            boxesTensor = model.get_tensor_by_name("detection_boxes:0")

            # for each bounding box we would like to know the score
            # (i.e., probability) and class label
            scoresTensor = model.get_tensor_by_name("detection_scores:0")
            classesTensor = model.get_tensor_by_name("detection_classes:0")
            numDetections = model.get_tensor_by_name("num_detections:0")
            drawboxes = []
            # cap = cv2.VideoCapture(url)
            vs = WebcamVideoStream(src=0)
            vs.start()
            while True:
                frame = vs.read()
                img = cv2.imread("sss.png")
                
                
               

                if frame is None:
                    continue
                frame = cv2.flip(frame, 1)
                image = frame
                (H, W) = image.shape[:2]
                print("H,W:", (H, W))
                
                output = image.copy()
             
                # output[0:450, 0:450] = img
                img_ff, bin_mask, res = ff.find_hand_old(image.copy())
                image = cv2.cvtColor(res, cv2.COLOR_BGR2RGB)
                image = np.expand_dims(image, axis=0)
                
                (boxes, scores, labels, N) = sess.run(
                    [boxesTensor, scoresTensor, classesTensor, numDetections],
                    feed_dict={imageTensor: image})
                boxes = np.squeeze(boxes)
                scores = np.squeeze(scores)
                labels = np.squeeze(labels)
                boxnum = 0
                box_mid = (0, 0)
                # print("scores_shape:", scores.shape)
                # frame[ 200:200+img_height , 200:200+img_width ] = img
                for (box, score, label) in zip(boxes, scores, labels):
                    # print(int(label))
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
                    box_mid = (X_mid, Y_mid)
                    # draw the prediction on the output image
                    label_name = 'nail'
                    # idx = int(label["id"]) - 1
                    idx = 0
                    label = "{}: {:.2f}".format(label_name, score)
                    cv2.rectangle(output, (startX, startY), (endX, endY),
                                  COLORS[idx], 2)
                    y = startY - 10 if startY - 10 > 10 else startY + 10
                    cv2.putText(output, label, (startX, y),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.3, COLORS[idx], 1)

                    # x = X_mid
                    # y = Y_mid
                    
                    # x = 가로 y = 세로 점
                    print(startX,startY,endX,endY)
                    startX = startX -20
                    startY = startY -20
                    endX = endX +20
                    endY = endY +20
                    wi = int(abs(endY-startY))
                    he = int(abs(endX-startX))
                    cat_sticker = cv2.resize(img,(wi,he))
                    print(cat_sticker.shape)
                    xx = X_mid -wi // 2
                    yy = Y_mid - he // 2
                    if xx < 0:
                        cat_sticer = cat_sticker[:,xx:]
                    if yy < 0:
                        cat_sticker = cat_sticker[-yy:,:]
                    
                    try :
                        sticker_area= output[yy:yy+cat_sticker.shape[0],xx:xx+cat_sticker.shape[1]]
                        output[yy:yy+cat_sticker.shape[0], xx:xx+cat_sticker.shape[1]] = np.where(cat_sticker==0,sticker_area,cat_sticker).astype(np.uint8)
                    except :
                        print('에러')

                    #  print(startX,startY,endX,endY)
                    # wi = int(abs(endY-startY))
                    # he = int(abs(endX-startX))
                    # cat_sticker = cv2.resize(img,(wi,he))
                    # print(cat_sticker.shape)
                    # xx = X_mid -wi // 2
                    # yy = Y_mid - he // 2
                    # if xx < 0:
                    #     cat_sticer = cat_sticker[:,xx:]
                    # if yy < 0:
                    #     cat_sticker = cat_sticker[-yy:,:]
                    
                    # try :
                    #     sticker_area= output[yy:yy+cat_sticker.shape[0],xx:xx+cat_sticker.shape[1]]
                    #     output[yy:yy+cat_sticker.shape[0], xx:xx+cat_sticker.shape[1]] = np.where(cat_sticker==0,sticker_area,cat_sticker).astype(np.uint8)
                    # except :
                    #     pass

                    # if int(abs(endY-startY+30)) <= 480 and int(abs(endX-startX+30)) <= 480:
                    # try:
                    #     img = cv2.resize(img, (int(abs(endY-startY)), int(abs(endX-startX))),)
                    #     # img = cv2.resize(img, dsize=(35,35), interpolaqtion=cv2.INTER_CUBIC)
                    #     sticker_area = output[startY:startY+int(abs(endX-startX)), startX:startX+(int(abs(endY-startY)))]
                    #     output[startY:startY+int(abs(endX-startX)), startX:startX+(int(abs(endY-startY)))] = np.where(img==0,sticker_area,img).astype(np.uint8)
                    # except:
                    #     print(2)
    
                    # output[startY:startY+int(abs(endX-startX)), startX:startX+(int(abs(endY-startY)))] = np.where(img==0,sticker_area,img).astype(np.uint8)
                   
                    # img = cv2.resize(img, dsize=(35,35), interpolaqtion=cv2.INTER_CUBIC)
                    # img_height, img_width, _ = img.shape
                    # print(output[ y:y+img_height, x:x+img_width ])
                    # print(img_height,img_width)
                    # output[ startX:startX+img_width, startY:startY+img_height ] = img
                    # # # #img가 [] 보다 작아야함
                    # output[ startY:endY , startX:endX ] = img
                    # print(y,x,y+img_height,x+img_width)
                    # output[ startY:startY+img_height , startX:startX+img_width] = img
                
                        
                    
                # show the output image
                # print(boxnum)
                if box_mid == (0, 0):
                    drawboxes.clear()
                    cv2.putText(output, 'Nothing', (20, 50),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (77, 255, 9), 2)
                elif boxnum == 1:
                    drawboxes.append(box_mid)
                    if len(drawboxes) == 1:
                        pp = drawboxes[0]
                        cv2.circle(output, pp, 0, (0, 0, 0), thickness=3)
                        # cv2.line(output, pt1, pt2, (0, 0, 0), 2, 2)
                    if len(drawboxes) > 1:
                        num_p = len(drawboxes)
                        for i in range(1, num_p):
                            pt1 = drawboxes[i - 1]
                            pt2 = drawboxes[i]
                            # cv2.circle(output, pp, 0, (0, 0, 0), thickness=3)
                            cv2.line(output, pt1, pt2, (0, 0, 0), 2, 2)
                            
                    cv2.putText(output, 'Point', (20, 50),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (77, 255, 9), 2)
                else:
                    drawboxes.clear()
                    cv2.putText(output, 'Nothing', (20, 50),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (77, 255, 9), 2)
                cv2.imshow("Output", output)
             
                # src = cv2.imread("sss.png")
                # cv2.imshow("sss", src)

                if cv2.waitKey(1) & 0xFF == ord("q"):
                    cv2.destroyAllWindows()
                    break

                    # vs.stop()









# # load the overlay image. size should be smaller than video frame size
# img = cv2.imread("sss.png")

# # Get Image dimensions
# img_height, img_width, _ = img.shape

# # Start Captured
# cap = cv2.VideoCapture(0)

# # Get frame dimensions
# frame_width  = cap.get(cv2.CAP_PROP_FRAME_WIDTH )
# frame_height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT )

# # Print dimensions
# print('image dimensions (HxW):',img_height,"x",img_width)
# print('frame dimensions (HxW):',int(frame_height),"x",int(frame_width))

# # Decide X,Y location of overlay image inside video frame. 
# # following should be valid:
# #   * image dimensions must be smaller than frame dimensions
# #   * x+img_width <= frame_width
# #   * y+img_height <= frame_height
# # otherwise you can resize image as part of your code if required

# x = 50
# y = 50

# while(True):
#     # Capture frame-by-frame
#     ret, frame = cap.read()

#     # add image to frame
#     frame[ y:y+img_height , x:x+img_width ] = img

#     # Display the resulting frame
#     cv2.imshow('frame',frame)

#     # Exit if ESC key is pressed
#     if cv2.waitKey(20) & 0xFF == 27:
#         break

# # When everything done, release the capture
# cap.release()
# cv2.destroyAllWindows()