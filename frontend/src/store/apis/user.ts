import { apiClient, fileApiClient } from "./apiClient"


// 유저 피팅 이미지 정보 조회
export const getFittingImg = async (userSeq:number) => {
  const response = await apiClient.get<any>(
    `/users/fitting/${userSeq}`,
    { params: { userSeq } }
  )
  return response.data
}
