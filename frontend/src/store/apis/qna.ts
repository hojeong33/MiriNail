import { apiClient, fileApiClient } from "./apiClient"

// to디자이너 1대1 문의 작성
export const postAsk = async (qnaDesc:string, qnaDesignerSeq:number, qnaTitle:string, qnaType:number, userSeq:number) => {
  const response = await apiClient.post<any>(
    "/qna/designer",
    {
      "qnaDesc": qnaDesc,
      "qnaDesignerSeq": qnaDesignerSeq,
      "qnaTitle": qnaTitle,
      "qnaType": qnaType,
      "userSeq": userSeq
    }
  )
  return response.data
}

// 디자이너에게 작성된 1:1 문의 조회
export const getDesignerAsk = async (page:number, size:number, designerSeq:number, qnaType:number) => {
  const response = await apiClient.get<any>(
    `/qna/designer/${designerSeq}/${qnaType}`,
    { params: { page, size, designerSeq, qnaType } }
  )
  return response.data
}

// 유저가 작성한 1:1 문의 조회
export const getMyDesignerAsk = async (page:number, size:number, userSeq:number, qnaType:number) => {
  const response = await apiClient.get<any>(
    `/qna/user/${userSeq}/${qnaType}`,
    { params: { page, size, userSeq, qnaType } }
  )
  return response.data
}

// 1:1 문의 상세조회
export const getAskDetail = async (qnaSeq:number) => {
  const response = await apiClient.get<any>(
    `/qna/${qnaSeq}`,
    { params: { qnaSeq } }
  )
  return response.data
}

// 1:1 문의 삭제
export const postDeleteAsk = async (qnaSeq:number) => {
  const response = await apiClient.delete<any>(
    `/qna/${qnaSeq}`,
    { params: { qnaSeq } }
  )
  return response.data
}

// 1:1 문의 수정
export const putAsk = async (qnaDesc:string, qnaSeq:number, qnaTitle:string) => {
  const response = await apiClient.put<any>(
    `/qna`,
    { qnaDesc, qnaSeq, qnaTitle }
  )
  return response.data
}

// 문의 답변 작성
export const postAnswer = async (qnaSeq:number, qnaAnswerDesc:string) => {
  const response = await apiClient.post<any>(
    `/qna/answer`,
    { qnaSeq, qnaAnswerDesc }
  )
  return response.data
}