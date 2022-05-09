import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 인증신청 
export const postApply = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/authentication",
    formdata
  )
  return response.data
}

// 인증신청 전체 조회
export const getAllApply = async (page:number, size:number) => {
  const response = await apiClient.get<any>(
    "/authentication/list",
    { params : { page, size } }
  )
  return response.data
}


// 인증신청 상세 조회
export const getDetailApply = async (designerSeq:number) => {
  const response = await apiClient.get<any>(
    `/authentication/${designerSeq}`,
    { params : { designerSeq } }
  )
  return response
}


// 인증신청 수락/거절
export const patchConfirmApply = async (accepted:boolean, designerSeq:number) => {
  const response = await apiClient.patch<any>(
    "/authentication/confirm",
    { accepted, designerSeq }
  )
  return response.data
}

// 인증파일 다운로드
export const getDownloadApply = async (authUrl:string) => {
  const response = await apiClient.get<any>(
    "/authentication/download/file",
    { params : { authUrl } }
  )
  return response.data
}

// 인등등록 상세정보 조회
export const getApplyDetail = async (designerSeq:number) => {
  const response = await apiClient.get<any>(
    `/authentication/detail/${designerSeq}`,
    { params : { designerSeq } }
  )
  return response
}