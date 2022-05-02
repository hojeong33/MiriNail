import { apiClient, fileApiClient } from "./apiClient"

// 디자이너의 네일아트 목록 조회
export const getDesignerNailart = async (designerSeq:number, page:number, size:number) => {
  const response = await apiClient.get<any>(
    `/nailart/designer`,
    { params: { designerSeq, page, size } }
  );
  return response.data
}

