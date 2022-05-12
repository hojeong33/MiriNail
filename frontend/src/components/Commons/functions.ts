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

export function leadingZeros(n:string, digits:number) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (var i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

export const convertDate = (dateArray:string[]) => {
  const year = String(dateArray[0]);
  const month = String(dateArray[1]);
  const day = String(dateArray[2]);
  const hour = String(dateArray[3])
  const minute = String(dateArray[4])
  const second = String(dateArray[5] ? dateArray[5] : "00")
  return year + "-" + leadingZeros(month, 2) + "-" + leadingZeros(day, 2) + " " + leadingZeros(hour, 2) + ":" + leadingZeros(minute, 2)+ ":" + leadingZeros(second, 2)
}

export const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};

export const convertImgToThumnail = (url: string) => {
  return url.replace("bucket", "bucket-resize")
}