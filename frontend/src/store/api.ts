import axios from 'axios'
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
  console.log('ㅇ으으으',param)
  const response = await axios.get(base_url+`favorite/${Number(param)}`,{headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },})
  console.log(response.data)
  return response.data
}
