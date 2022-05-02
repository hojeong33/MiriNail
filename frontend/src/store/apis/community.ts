import { apiClient, fileApiClient } from "./apiClient"

// 내가 쓴 글 조회
export const getUserCommunity = async (page:number, size:number) => {
  const response = await apiClient.get<any>(
    `/community/user`,
    { params: { page, size }}
  )
  return response.data
}
