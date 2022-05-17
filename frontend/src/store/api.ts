import axios from "axios";
import { useRecoilState } from "recoil";
import { page, pagenationInquiry } from "./atoms";
const ACCESS_TOKEN = localStorage.getItem("token");
const base_url = "http://localhost:8080/api/";


// 디자인 관련

// 디자인 조회
export const fetchDesigns = async ({ queryKey }: any) => {
  const data = queryKey[1];
  console.log(data);
  const response = await axios.get(base_url + "nailart/list", { params: data });
  console.log(response);
  return response.data;
};

// 디자인 등록
export const registDesign = async (files: any) => {
  for (let key of files.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of files.values()) {
    console.log(value);
  }
  const response = axios.post(base_url + "nailart", files, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response
    
  // console.log(response)
};

// ipfs 주소 등록
export const pushIpfs = async(data:any) => {
  const response = axios.put(base_url + 'nailart/nft',data)
  
  return response
}

// 디자인 삭제
export const deleteDesign = async (param: any) => {
  console.log(param)
  const response = await axios.put(base_url + `nailart/${Number(param)}`);
};

// 디자인 상세정보
export const designDetail = async (param: any) => {
  const response = await axios.get(base_url + `nailart/detail/${param}`);
  console.log(response.data);
  return response.data;
};

// 다른 디자이너 작품 조회
export const otherDesign = async (param: any, nailSeq:any) => {
  const response = await axios.get(base_url + `nailart/designer/${param}/${nailSeq}`);
  console.log(response);
  return response.data;
};

// 디자인 수정
export const reviseDesign = async (param: any) => {
  for (let key of param.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of param.values()) {
    console.log(value);
  }
  const response = await axios.put(base_url + `nailart`, param, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response);
  return response.data;
};

// 디자인 좋아요
export const nailLike = async (param: any) => {
  console.log(param);
  const response = await axios.post(
    base_url + `favorite/${Number(param)}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
};

// 디자인 싫어요
export const nailDislike = async (param: any) => {
  const response = await axios.delete(base_url + `favorite/${Number(param)}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};

//디자인 갯수확인
export const nailCount = async (param: any) => {
  const response = await axios.get(
    base_url + `favorite/${Number(param)}/count`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  console.log(response);

  return response.data;
};

// 디자인 여부 확인
export const isLike = async (param: any) => {
  const response = await axios.get(base_url + `favorite/${Number(param)}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  console.log(response.data);
  return response.data;
};

//작품 1대1 문의

// 문의 조회
export const inquiryList = async ({ queryKey }: any) => {
  console.log(queryKey);
  const response = await axios.get(base_url + `qna/nailart/${queryKey[1]}`, {
    params: { page: queryKey[2], size: 10 },
  });
  console.log(response);
  
  return response;
};

// 문의 작성
export const postInquiry = async (data: any) => {
  for (let key of data.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of data.values()) {
    console.log(value);
  }
  const response = await axios.post(base_url + `qna/nailart`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 문의 수정
export const reviseInquiry = async (data: any) => {
  const response = await axios.put(base_url + "qna", data);
  console.log(response);
};

// 문의 삭제
export const deleteInquiry = async (param: any) => {
  const response = await axios.delete(base_url + `qna/${param}`);
};

// 문의 답변 작성
export const postInquiryAnswer = async (data: any) => {
  console.log(data);
  const response = await axios.post(base_url + `qna/answer`, data);
  console.log(response);
};

// 문의 답변 수정
export const revInquiryAnswer = async (data: any) => {
  console.log(data);
  const response = await axios.put(base_url + `qna/answer`, data);
};
// 문의 답변 삭제
export const delInquiryAnswer = async (param: any) => {
  const response = await axios.delete(base_url + `qna/answer/${param}`);
};

// 디자이너 목록

// 핫한 디자이너
export const getHotDesigner = async () => {
  const response = await axios.get(base_url + "designer/list/countFollower");
  console.log(response);
  return response.data;
};

// 신규 디자이너
export const getRecentDesigner = async () => {
  const response = await axios.get(base_url + "designer/list/latest");
  console.log(response);
  return response.data;
};

//평점순 디자이너
export const getHighRateDesigner = async () => {
  const response = await axios.get(base_url + "designer/list/rating");
  console.log(response);
  return response.data;
};

// 모든 디자이너
export const getAllDesigner = async (pages: number, sizes: number) => {
  console.log(`실행됨 : ${pages}`);
  const response = await axios.get(base_url + "designer/list/all", {
    params: { page: pages, size: sizes },
  });
  console.log(response);
  return response.data;
};

// 디자인 리뷰

// 리뷰 작성
export const postReview = async (data: any) => {
  console.log(data);
  const response = await axios.post(base_url + "review", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }}
    )
  console.log(response)
}

// 리뷰 조회
export const getReview = async ({ queryKey }: any) => {
  // console.log(queryKey[0])
  const data = queryKey;
  console.log(data);
  const response = await axios.get(
    base_url + `review/nailart/${data[1]}/${data[2]}`,
    {
      params: {
        size: 1000,
      },
    }
  );
  console.log(response);
  return response.data;
};

// 리뷰 조회순 조회

// 조회수 증가
export const countView = async(data:any) => {
  console.log(data)
  console.log(base_url +`review/cnt/${data}`)
  const response = await axios.post(base_url +`review/cnt/${data}`,)
}

// 리뷰 삭제
export const delReview = async (param: any) => {
  const response = await axios.delete(base_url + `review/${param}`);
};

// 리뷰 댓글 작성
export const postReviewComment = async(data:any) => {
  console.log(data)
  const response = await axios.post(base_url +`review/comment`,data,{
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  })
}

// 리뷰 댓글 수정
export const revReviewComment = async(data:any) => {
  console.log(data)
  const response = await axios.put(base_url +`review/comment`,data,{
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  })
}

// 리뷰 댓글 삭제
export const delReviewComment = async(param:any) => {
  console.log(param)
  const response = await axios.patch(base_url + `review/review/${param}`)
}

