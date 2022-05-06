import { apiClient, fileApiClient } from "./apiClient"


// 디자이너에게 작성된 리뷰 조회
export const getDesignerReview = async (page:number, size:number, designerSeq:number) => {
  const response = await apiClient.get<any>(
    `/review/designer/${designerSeq}`,
    { params: { page, size, designerSeq } }
  )
  return response.data
}

// 유저에게 작성된 리뷰 조회
export const getUserReview = async (page:number, size:number, userSeq:number) => {
  const response = await apiClient.get<any>(
    `/review/user/${userSeq}`,
    { params: { page, size, userSeq } }
  )
  return response.data
}