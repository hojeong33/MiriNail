import { apiClient, fileApiClient } from "./apiClient"

// 팔로우 신청
export const postFollow = async (followFollowee :number) => {
  const response = await apiClient.post<any>(
    `/follow/${followFollowee}`,
    { params: { followFollowee } }
  );
  return response
}

// 팔로우 취소
export const deleteFollow = async (followFollowee :number) => {
  const response = await apiClient.delete<any>(
    `/follow/${followFollowee}`,
    { params: { followFollowee } }
  );
  return response
}