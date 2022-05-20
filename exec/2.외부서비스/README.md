## 블록체인 코드
<hr>

</br>

### 1. 스마트 컨트랙트 배포
</br>

\- 기본적으로 스마트 컨트랙트는 openzeppelin 프레임워크를 사용 

- ERC721 토큰에 tokenURI(*ipfs해쉬 값 저장)를 저장하여 데이터를 블록체인에 기록

</br>

```solidity
function mintNFT(address to, string memory tokenURI)
	public onlyOwner
	returns (uint256)
    {            
    	_tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;        
    }
```

</br></br>

### 2. React, 스마트 컨트랙트 연동

</br>

\- web3로 프론트와 스마트 컨트랙트 간 데이터 전달

</br>

```react
var Web3 = require('web3');

    var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1b71a03449674cfe98b98c4915a7cbc7'));
    // 컨트랙트 abi와 주소를 통해 배포한 컨트랙트를 지정
    let contract = new web3.eth.Contract( contractInfo.abi, contractInfo.address)
```

</br>

\- IPFS해쉬 생성

- tokenuri 에 저장할 값(testbuffer)를 ipfs에 저장하기 위해 ipfs-api 라이브러리 사용.
- ipfs에 데이터를 업로드하고 생성된 ipfs해쉬를 발급할 토큰의 uri에 저장.

</br>

```REACT
const getIPFS = (data:any) => {

      return new Promise(function(resolve,reject){
        ipfs.files.add(data, (err:any,file:any)=>{
          if(err) {
              console.log(err);
          }   
          const temp = file[0].hash
          // setIpfsPath(temp)
          resolve(temp)
        })

      });
      
    }
    
    const returnValue = registDesign(files).then(async(res) => {
      const ipfs = await getIPFS(testBuffer)
      await pushIpfs({nailartSeq : Number(res.data), nailartNft : ipfs}).then(response => {
        console.log(response)
      })

```

</br>

\- NFT 발급

</br>

```react
export default async function publishToken(ipfsHash:any) {

	var Web3 = require('web3');
	var web3 = new Web3(new								Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1b71a03449674cfe98b98c4915a7cbc7'));

const receiveAccount = '0xbDE82EE0713a93dE7e91C0b194382B64C58a9Aad'

var sender = web3.eth.accounts.privateKeyToAccount('0x' + "3f5480375cbab19af805d26913fb9e7ee93ae744434ec20fbffc3c06ba39d18e");

web3.eth.accounts.wallet.add(sender);

let contract = new web3.eth.Contract( contractInfo.abi, contractInfo.address)
const abc = await contract.methods.mintNFT(receiveAccount,ipfsHash).send({from: "0xbDE82EE0713a93dE7e91C0b194382B64C58a9Aad",gas:600000, })

}
```




</br></br>


## AI 코드
<hr>

</br>

#### * 네일영역을 인식하는 학습된 모델(오픈소스)을 사용하였음

(흐름도)

FRONT - BACK - FRONT

위 구조를 취하는 이유는 파이썬에서 클라이언트의 카메라에 접근할 수 가 없었기 때문이다. 먼저 프론트에서 클라이언트 캠에 접근하고, 영상 이미지를 백엔드(FAST-API)로 송신한다. 이 때 백엔드에서, 영상 인식 및 후처리를 진행하고 처리된 이미지를 다시 프론트로 전송하여 유저가 인식된 이미지를 볼 수 있는 구조이다.

(프론트- 백 - 프론트로 데이터를 이동하기 때문에 비효율적이고, 백에서 과부하가 생기지만 개발환경의 제약을 감안함. 

최대한 연산 속도를 높이기 위해 AWS P3서버를 사용.)

</br>



```PYTHON
templates = Jinja2Templates(directory="templates")

@app.get("/nail/client")
async def client(request: Request, item:Item):
    global test 
    test = item.strings
    
    return templates.TemplateResponse("client.html", {"request":request})



# 웹소켓 설정 ws://127.0.0.1:8000/ws 로 접속할 수 있음
@app.websocket("/websocket")
async def websocket_endpoint(websocket: WebSocket):

    # 프론트에 가상 피팅을 적용할 네일 이미지를 요청	
    response = requests.get(f'https://k6e101.p.ssafy.io/api/nailart/detail/{test}')
    nailImage = response.json()['nailartImgUrl']
    
    # client의 websocket접속 허용
    await websocket.accept()
    await websocket.send_text(f"Welcome client : {websocket.client}")
    i = 0

    # 미디어 파이프 라이브러리 적용(1)
    mp_drawing = mp.solutions.drawing_utils
    mp_drawing_styles = mp.solutions.drawing_styles
    mp_hands = mp.solutions.hands
    
    # 텐서 플로우 실행
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

        print(">  ====== NAIL Inference graph loaded.")
    

    with mp_hands.Hands(min_detection_confidence=0.8,min_tracking_confidence=0.5) as hands:
   
        with model.as_default():
            with tf.Session(graph=model) as sess:

                imageTensor = model.get_tensor_by_name("image_tensor:0")
                boxesTensor = model.get_tensor_by_name("detection_boxes:0")
                scoresTensor = model.get_tensor_by_name("detection_scores:0")
                classesTensor = model.get_tensor_by_name("detection_classes:0")
                numDetections = model.get_tensor_by_name("num_detections:0")
                drawboxes = []
                
                # 프론트에서 받은 네일이미지를 디코딩
                image_nparray = np.asarray(bytearray(requests.get(nailImage).content), dtype=np.uint8)
                imageDecode = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)
                print(imageDecode)
                img = imageDecode

                
                while True:
					# 웹소켓 수신 데이터 대기(2)
                    data = await websocket.receive_text()  
                    data = data.split(',')[1]
                    
                    # 수신받은 base64데이터를 BytesIo 객체로 변환
                    imgtest = imread(io.BytesIO(base64.b64decode(data)))
                    frame = cv2.flip(imgtest, 1)
                    (H, W) = frame.shape[:2]
                    output = frame.copy()
                    
                    # 함수 실행(3)
                    img_ff, bin_mask, res = ff.find_hand_old(output)
                    
                    image = cv2.cvtColor(res, cv2.COLOR_BGR2RGB)
                    image_2 = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)
                    results = hands.process(image_2)
                    image = np.expand_dims(image, axis=0)
                    imageHeight, imageWidth, _ = image_2.shape
                    
                    # 미디어파이프 실행
                    if results.multi_hand_landmarks:
                        for num, hand in enumerate(results.multi_hand_landmarks):
                            # 중지의 끝 마디와 아래 마디 좌표를 마크
                            normalizedLandmark = hand.landmark[12]
                            normalizedLandmark_2 = hand.landmark[11]
                            pixelCoordinatesLandmark = mp_drawing._normalized_to_pixel_coordinates(normalizedLandmark.x, normalizedLandmark.y, imageWidth, imageHeight)
                            pixelCoordinatesLandmark_2 = mp_drawing._normalized_to_pixel_coordinates(normalizedLandmark_2.x, normalizedLandmark_2.y, imageWidth, imageHeight)
                            
                            # 회전각 계산
                            try:
                                tanTheta = ((pixelCoordinatesLandmark_2[0]-pixelCoordinatesLandmark[0]))/((pixelCoordinatesLandmark_2[1]-pixelCoordinatesLandmark[1]))
                                theta = np.arctan(tanTheta)
                                
                                angle = theta*180/math.pi
                            except:
                                print('수평')
                            
							# 세션 실행
                            (boxes, scores, labels, N) = sess.run(
                                [boxesTensor, scoresTensor, classesTensor, numDetections],
                                feed_dict={imageTensor: image})
                            boxes = np.squeeze(boxes)
                            scores = np.squeeze(scores)
                            labels = np.squeeze(labels)
                            boxnum = 0
                            box_mid = (0, 0)
                            
                            # 인식률과 인식 좌표 마킹
                            for (box, score, label) in zip(boxes, scores, labels):
                                
                                if score < args["min_confidence"]:
                                    continue
                                
                                boxnum = boxnum + 1
                                (startY, startX, endY, endX) = box
                                startX = int(startX * W)
                                startY = int(startY * H)
                                endX = int(endX * W)
                                endY = int(endY * H)
                                
                                # 네일 중심 좌표
                                X_mid = startX + int(abs(endX - startX) / 2)
                                Y_mid = startY + int(abs(endY - startY) / 2)
                                
                                startX = startX -17
                                startY = startY -17
                                endX = endX +17
                                endY = endY +17
                                wi = int(abs(endY-startY))
                                he = int(abs(endX-startX))
                                
                                # 네일 이미지 크기 재조정 및 회전각에 맞게 회전
                                try: 
                                    cat_sticker = cv2.resize(img,(wi,he))
                                    # print(cat_sticker.shape)

                                    # 회전
                                    img_rotate = ff.rotate_image(cat_sticker,angle)
                                    # print('회전된 이미지 shape : ' ,img_rotate.shape)
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

                                


                    
                    # (4)
                    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
                    buffer = cv2.imencode('.jpg', image_2,encode_param)[1]
                    
                    image_2 = buffer.tobytes()
                    
                    await websocket.send_text(buffer.tobytes())
                   
        

```

</br>

(1) - 미디어파이프를 이용하면 손 마디마다 좌표를 얻을 수 있음. 해당 좌표와 네일의 중심점 사이의 탄젠트 값을 얻을 수 있기 때문에 이미지를 손톱 각도에 맞춰 회전할 수 있음 

(2) - client.html의 캠에서 웹소켓을 통해 이미지를 수신받음.



```python
# (3) - 초기 캠 이미지를 이진화
def find_hand_old(frame):
    img = frame.copy()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    YCrCb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)
    YCrCb_frame = cv2.GaussianBlur(YCrCb_frame, (3, 3), 0)
    mask = cv2.inRange(YCrCb_frame, np.array([0, 127, 75]), np.array([255, 177, 130]))
    bin_mask = mask
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    bin_mask = cv2.dilate(bin_mask, kernel, iterations=5)
    res = cv2.bitwise_and(frame, frame, mask=bin_mask)

    return img, bin_mask, res
```

</br>

(4) 후처리된 이미지를 다시 client.html로 보내기 위해 바이너리 데이터로 형변환.  그 뒤 다시 웹소켓을 통해 이미지를 송신한다.



```html

<html>
<head>
	<title>AR 가상 피팅 서비스</title>
  <link href="{{ url_for('static', path='/style.css') }}" rel="stylesheet"> 
</head>
<script async src="https://docs.opencv.org/3.4/opencv.js"></script>
<body>
	<video id="videoInput" style="display:none;"></video>
  <canvas id="videoOutput" style="display:none"></canvas>
  <div class="buttonPlace" id="text">
    <div class="btn" >Virtual Try On</div>
    <div class="on_now_tag" onclick=stream()></div>
  </div>
  <canvas id="testt" width="640" height="480" style=""></canvas>
  <div id="status">
    Connection failed. Somebody may be using the socket.
  </div>
</body>


<script>
  
  var w = 640, h = 480;
    
  // 웹소켓 연결
  var url = "ws://localhost:8000/websocket"
  var ws = new WebSocket(url);
  let testt = document.getElementById("testt");
  testt.width = w;
  testt.height = h;
  ws.addEventListener('open', (e) => {
    document.getElementById("status").innerHTML = "Opened";
  });

  ws.addEventListener('message', (e) => {
    console.log(e.data)
    let ctx = testt.getContext("2d");
    let image = new Image();
    try {
    image.src = URL.createObjectURL(e.data);
    
    }
    catch {
      image.srcObject = e.data
    }
    console.log(image)
    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 0, 0, testt.width, testt.height);
    });
  });


	ws.onopen = function(){
		console.log("Websocket is connected.");
   
	}
  
// 클라이언트 측 캠을 사용
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var constraints = {audio: false, video: true};
  var video = document.getElementById("videoInput");
  video.width = w;
  video.height = h;
  function successCallback(stream){
  	video.srcObject = stream;
  	video.play();
  }
  
  function errorCallback(error){
   	console.log(error);
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
	var canvas = document.getElementById("videoOutput");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  function processImage(){
        ctx.drawImage(video, 0, 0, w, h);
        setTimeout(processImage, 1);
  }
  processImage();

  // 100ms 간격으로 이미지를 송신한다.
  function stream(){
    var x = document.getElementById("text");
    console.log(x)
    x.style.display = 'none'

    setInterval(sendImage, 100);
  }

  function sendImage(){
    var rawData = canvas.toDataURL("image/jpeg", 1.0);
    ws.send(rawData)
  }

</script>
</html>
```

