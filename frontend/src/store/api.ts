import axios from 'axios'
import { page } from './atoms'
const ACCESS_TOKEN = localStorage.getItem('token')
const base_url = 'http://localhost:8080/api/'


// 디자인 관련
export const fetchDesigns = async({queryKey}:any) => {
  console.log(queryKey)
 
  const response = await axios.get(base_url+'nailart/list',{params : {page: queryKey[1],size:10}})
  console.log(response)
  return response.data
}

export const registDesign = async(files:any) => {
  for (let key of files.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of files.values()) {
      console.log(value);
  }
    axios.post(base_url + 'nailart', files, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    })
    .then((response) => {
      // 응답 처리
      console.log(response)
    })
    .catch((error) => {
      // 예외 처리
      console.log(error)
    })
      
    // console.log(response)
}

export const designDetail = async(param:any) => {
  const response = await axios.get(base_url+`nailart/detail/${param}`)
  // console.log(response.data)
  return response.data
  
}


export const otherDesign = async(param:any) => {
  const response = await axios.get(base_url+`nailart/designer/${param}`)
  console.log(response)
  return response.data
}




// 좋아요

export const nailLike = async(param:any) => {
  console.log(param)
  const response = await axios.post(base_url+`favorite/${Number(param)}`,{},{headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },})
  
}

export const nailDislike = async(param:any) => {

  const response = await axios.delete(base_url+`favorite/${Number(param)}`,{headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },})
}

export const nailCount = async(param:any) => {
  
  const response = await axios.get(base_url+`favorite/${Number(param)}/count`,{headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },})
  console.log(response)

  return response.data
}

export const isLike = async(param:any) => {

  const response = await axios.get(base_url+`favorite/${Number(param)}`,{headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },})
  console.log(response.data)
  return response.data
}


//작품 1대1 문의


export const inquiryList = async({queryKey}:any) => {
  console.log(queryKey)
  const response = await axios.get(base_url+`qna/nailart/${queryKey[1]}`,{params : {page: queryKey[2],size:10}})
  console.log(response.data.content)
  return response.data.content
}


export const postInquiry = async(data:any) => {
  for (let key of data.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of data.values()) {
      console.log(value);
  }
  const response = await axios.post(base_url+`qna/nailart`,data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }})
}

export const reviseInquiry = async(data:any) => {
  const response = await axios.put(base_url +'qna',data)
  console.log(response)
}

export const deleteInquiry = async(param:any) => {
  const response = await axios.delete(base_url+`qna/${param}`)
}

export const postInquiryAnswer = async(data:any) => {
  console.log(data)
  const response = await axios.post(base_url+`qna/answer`,data)
  console.log(response)
}

//디자이너

export const getHotDesigner = async() => {
  const response = await axios.get(base_url+'designer/list/countFollower')
  console.log(response)
  return response.data
}

export const getRecentDesigner = async() => {
  const response = await axios.get(base_url+'designer/list/latest')
  console.log(response)
  return response.data
}

export const getAllDesigner = async(page:any) => {
  const response = await axios.get(base_url+'designer/list/all',{
    params : {page: page, size : 5}
  })
  console.log(response)
  return response.data
}