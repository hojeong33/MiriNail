import { apiClient, fileApiClient } from "./apiClient"

// 내가 쓴 글 조회
export const getUserCommunity = async (page:number, size:number) => {
  const response = await apiClient.get<any>(
    `/community/user`,
    { params: { page, size }}
  )
  return response.data
}

// 커뮤니티 게시글 목록 조회
export const getCommunityList = async (page: number, size: number) => {
  const response = await apiClient.get<any>(`/community`, {
    params: { page, size },
  });
  return response.data;
};

// 게시글 댓글 목록 조회
export const getCommentList = async (
  page: number,
  size: number,
  communitySeq: number
) => {
  const response = await apiClient.get<any>(
    `/community/comment/${communitySeq}`,
    {
      params: { page, size, communitySeq },
    }
  );
  return response.data;
};

//대댓글 목록 조회
export const getReplyCommentList = async (
  page: number,
  size: number,
  communityCommentSeq: number
) => {
  const response = await apiClient.get<any>(
    `/community/comment/${communityCommentSeq}`,
    {
      params: { page, size, communityCommentSeq },
    }
  );
  return response.data;
};

// 게시글 상세 정보 받아오기
export const getCommunityDetail = async (communitySeq: number) => {
  const response = await apiClient.get<any>(`community/${communitySeq}`, {
    params: { communitySeq },
  });
  return response.data;
};

// 게시글 삭제
export const deleteCommunity = async (communitySeq: number) => {
  const response = await apiClient.delete<any>(`/community/${communitySeq}`, {
    params: { communitySeq },
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (communityCommentSeq: number) => {
  const response = await apiClient.delete<any>(
    `/community/comment/${communityCommentSeq}`,
    {
      params: { communityCommentSeq },
    }
  );
  return response.data;
};

// 게시글 수정
export const putAsk = async (
  qnaDesc: string,
  qnaSeq: number,
  qnaTitle: string
) => {
  const response = await apiClient.put<any>(`/qna`, {
    qnaDesc,
    qnaSeq,
    qnaTitle,
  });
  return response.data;
};
