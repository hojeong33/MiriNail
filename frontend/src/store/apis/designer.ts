import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 정보 조회
export const getDesignerinfo = async (designerSeq:number) => {
  const response = await apiClient.get<any>(
    `/designer/profile/${designerSeq}`,
    { params: { designerSeq } }
  );
  return response.data
}

// 새소식 작성
export const postNewFeed = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/designer/news",
    formdata
  )
  return response.data
}

// 새소식 목록 가져오기 
export const getNewFeed = async ({designerSeq, page, size}:any) => {
  const response = await apiClient.get<any>(
    "/designer/news",
    {"params" :{designerSeq, page, size}}
  )
  return response.data
}

// 새소식 삭제
export const deleteFeed = async (designerNewsSeq:number) => {
  const response = await apiClient.delete<any>(
    `/designer/news/${designerNewsSeq}`,
    { params: { designerNewsSeq } }
  );
  return response.data
}

// 디자이너 프로필 사진 변경
export const putProfileImgUpdate = async (formdata:any, designerSeq:number) => {
  const response = await fileApiClient.put<any>(
    `/designer/profileupdate/${designerSeq}`,
    formdata
  );
  return response.data
}

// 디자이너 정보 수정
export const putUpdateIntroduction = async (formdata:any) => {
  const response = await fileApiClient.put<any>(
    `/designer/introduce/`,
    formdata
  );
  return response.data
}

// 디자이너 검색 조회
export const getSearchDesigner = async (name:string, page:number, size:number) => {
  const response = await apiClient.get<any>(
    `/designer/search/${name}`,
    { params: { name, page, size } }
  );
  return response.data
}