import axios from 'axios'

const base_url = 'http://localhost:8080/api/'


export const fetchDesigns = async() => {
  
  const response = await axios.get(base_url+'nailart/list',{params : {page:1,size:10}})
  console.log(response.data.content)
  return response.data.content
}

export const registDesign = async(files:any) => {
  for (let key of files.keys()) {
    console.log(key);
}

/* value 확인하기 */
for (let value of files.values()) {
     console.log(value);
}
  axios.post('http://localhost:8080/api/nailart', files, {
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