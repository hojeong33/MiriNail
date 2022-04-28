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
