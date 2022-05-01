import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 인증신청 
export const postApply = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/authentication",
    formdata
  )
  return response.data
}

// 인증신청 전체 조회
export const getAllApply = async (page:number, size:number) => {
  const response = await fileApiClient.get<any>(
    "/authentication/list",
    { params : { page, size } }
  )
  return response.data
}