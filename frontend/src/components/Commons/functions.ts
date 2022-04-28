export const convertQnatypeToText = (type:number|undefined) => {
  switch (type) {
    case 0:
      return "예약"
    case 1:
      return "디자인"
    case 2:
      return "기타"
    default:
      return "???"
  }
}