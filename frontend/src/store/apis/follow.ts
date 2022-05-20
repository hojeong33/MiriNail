import { apiClient, fileApiClient } from "./apiClient";
const userSeq = sessionStorage.getItem("userSeq")

// 팔로우 신청
export const postFollow = async (followFollowee: number) => {
  const response = await apiClient.post<any>(`/follow/${followFollowee}/${userSeq}`, {
    params: { followFollowee },
  });
  return response;
};

// 팔로우 취소
export const deleteFollow = async (followFollowee: number) => {
  const response = await apiClient.delete<any>(`/follow/${followFollowee}/${userSeq}`, {
    params: { followFollowee },
  });
  return response;
};

// 팔로워 조회
export const getFollowers = async (userSeq:number, page:number, size:number) => {
  const response = await apiClient.get<any>(`/follow/followee/${userSeq}`, {
    params: { userSeq, page, size },
  });
  return response.data;
};

// 팔로우 조회
export const getFollowees = async (userSeq:number, page:number, size:number) => {
  const response = await apiClient.get<any>(`/follow/follower/${userSeq}`, {
    params: { userSeq, page, size },
  });
  return response.data;
};
