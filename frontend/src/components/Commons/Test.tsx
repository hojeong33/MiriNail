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
  const {isLoading, data} = useQuery<any>("allCoins", fetchCoins)
  
  
  
  // 메타마스크 테스트
  const { ethereum } = window;
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  const test = async() => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });  
    console.log(accounts)
  }


  // ipfs 테스트
  const test2 = async() => {
    const ipfs = await IPFS.create()
    ipfs.add('Hellodworld').then(res => console.log(res)).catch(err =>console.log(err))
  }
  // useEffect(() => {
  // const abc:any = 'http://127.0.0.1:5002'
  // const client = create(abc)
  // console.log('엥')
  // // client.add('오 되는거냐진짜로다가?').then(console.log)
  // axios.post('http://127.0.0.1:5002/api/v0/cat?arg=QmaLoLmqJ88EoXN5a68A7bjweyvoJCRu2xyLb1s223NQPn').then(console.log).catch(console.log)
  // },[])
  return (
    <>
      <button style={{marginTop:"400px",backgroundColor:"red"}} onClick={test2}>좀 되주면 안되겠니 부탁이다</button>
      <div>{isLoading ? <div>loading...</div> : <div>{data?.slice(0,100).map((e:any)=>{
        return <div>{e.id}</div>
      })}</div>}</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
      <div>safadsfds</div>
    </>
  )
}

export default Test
// render(<App />, document.getElementById('root'))