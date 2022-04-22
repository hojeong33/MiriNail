import axios from 'axios'

const base_url = 'http://localhost:8080/api/'


export const fetchDesigns = async() => {
  
  const response = await axios.get(base_url+'nailart/list',{params : {page:1,size:10}})
  console.log(response.data.content)
  return response.data.content
}

export const registDesign = async(item:any) => {
  const response = await axios.post(base_url+'nailart',item)
  console.log(response)
}