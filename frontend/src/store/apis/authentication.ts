import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 인증신청 
export const postApply = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/authentication",
    formdata
  )
  return response.data
}