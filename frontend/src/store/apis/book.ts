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

// 유저 예약 조회
export const getUserReservation = async (userSeq :number) => {
  const response = await apiClient.get<any>(
    `/book/user/${userSeq}`,
    { params: { userSeq } }
  )
  return response.data
}

// 디자이너 예약 날짜 조회
export const getReservationDate = async (designerSeq :number) => {
  const response = await apiClient.get<any>(
    `/book/designer/${designerSeq}`,
    { params: { designerSeq } }
  )
  return response.data
}

// 디자이너 해당날짜 예약 목록 조회
export const getReservationListByDate = async (designerSeq :number, bookDate:string) => {
  const response = await apiClient.get<any>(
    `/book/designer/${designerSeq}/${bookDate}`,
    { params: { designerSeq, bookDate } }
  )
  return response.data
}

// 예약 취소
export const deleteCancelReservation = async (bookSeq :number) => {
  const response = await apiClient.delete<any>(
    `/book/${bookSeq}`,
    { params: { bookSeq } }
  )
  return response.data
}