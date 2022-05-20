import { useQuery } from 'react-query';
import axios from 'axios'
import {useState,useEffect} from 'react'
// Create a client
import { create } from 'ipfs-http-client'
// import { IPFS, create } from 'ipfs-core'
// import type { CID } from 'ipfs-core'
import * as IPFS from 'ipfs-core'
import {fetchCoins} from './api'

const Test = () => {
  // var url = "ws://localhost:3000/ws"
	// var ws = new WebSocket(url);
  // ws.onopen = function(){
	// 	console.log("Websocket is connected.");
   
	// }

  return (
    <>
      <div>
      {/* <video id="videoInput" style={{display:"none"}}></video> */}
        {/* <canvas id="videoOutput"></canvas> */}
        {/* <button onClick={() => stream()}>Send</button> */}
        <div>sdafasdf</div>
        {/* <video id="video" width="0" height="0"></video>
        <canvas id="canvas" width="500" height="500"></canvas> */}
      </div>
    </>
  )
}

export default Test
// render(<App />, document.getElementById('root'))