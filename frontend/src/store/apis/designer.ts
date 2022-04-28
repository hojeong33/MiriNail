import { apiClient, fileApiClient } from "./apiClient"

// 새소식 작성
export const postNewFeed = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/designer/news",
    formdata
  )
  return response.data
}

// 새소식 목록 가져오기 
export const getNewFeed = async ({designerSeq, page, size}:any) => {
  const response = await apiClient.get<any>(
    "/designer/news",
    {"params" :{designerSeq, page, size}}
  )
  return response.data
}

