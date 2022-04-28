import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 인증신청 
export const postApply = async ({designerSeq, page, size}:any) => {
  const response = await apiClient.get<any>(
    "/designer/news",
    {"params" :{designerSeq, page, size}}
  )
  return response.data
}