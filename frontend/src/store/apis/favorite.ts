import { apiClient, fileApiClient } from "./apiClient"

// 내가 좋아요한 네일아트 리스트
export const getLikeNailarts = async (userSeq:number, page:number, size:number) => {
  const response = await apiClient.get<any>(
    `/favorite/nailart/${userSeq}`,
    { params: { userSeq, page, size } }
  );
  return response
}

