import { apiClient, fileApiClient } from "./apiClient"

// 내가 좋아요한 네일아트 리스트
export const postBook = async (bookComment:string, bookDatetime:string, designerSeq:number, nailartSeq:number, userSeq:number) => {
  const response = await apiClient.post<any>(
    `/book`,
    { bookComment, bookDatetime, designerSeq, nailartSeq, userSeq }
  )
  return response
}

// 달력에서 예약 조회
export const getBookByCalendar = async (bookDate:string, designerSeq:number) => {
  const response = await apiClient.get<any>(
    `/book/calendar`,
    { params: { bookDate, designerSeq } }
  )
  return response
}