import {atom, selector} from "recoil"
import { recoilPersist } from 'recoil-persist'
import { fetchDesigns } from "./api"


const { persistAtom } = recoilPersist()

export const isDarkAtom = atom({
  key:"isDark", // 이름 유니크해야함
  default : false, // default value (초기값)
  effects_UNSTABLE: [persistAtom],    // 요것만 추가
})

export const openModal = atom({
  key: "openModal",
  default : false,
  effects_UNSTABLE: [persistAtom],
})

export const nftItems = atom({
  key: "nftItems",
  default : [],
  effects_UNSTABLE : [persistAtom],
})

export const page = atom({
  key : "page",
  default : 1,
  effects_UNSTABLE : [persistAtom],
})

export const page2 = atom({
  key: "page2",
  default : 1,
  effects_UNSTABLE : [persistAtom]
})

export const getNftItems = selector({
  key: "get/nftItems",
  get: async() => {
    const data = await fetchDesigns(1)
    return data
  },
})

export const designerId = atom({
  key : "designerId",
  default : '',
  effects_UNSTABLE : [persistAtom]
})

export const designerAtom = atom({
  key : "designeratom",
  default : {},
  effects_UNSTABLE : [persistAtom],
})

export const refetchDesigner = atom({
  key : "refetchDesigner",
  default : () => {},
  effects_UNSTABLE : [persistAtom],
})

export const nftFilter = atom({
  key : "nftFilter",
  default : {
    category : "type",
    color : "",
    type : "",
    sort : "",
    page : 1,
    size : 12,
  },

})

export const bestFilter = atom({
  key : "bestFilter",
  default : {
    category : "type",
    color : "",
    type : "",
    sort : "like",
    page : 1,
    size : 4,
  },

})

export const imgProp = atom({
  key : "imgProp",
  default : {},
  effects_UNSTABLE : [persistAtom],
  }
)

export const bestNailart = atom({
  key : "bestNailart",
  default : {
    category : "type",
    color : "",
    type : "",
    sort : "like",
    page : 1,
    size : 4,
  },

})

export const pagenation = atom({
  key : "pagenation",
  default : 0,
  // effects_UNSTABLE : [persistAtom],
})

export const pagenationInquiry = atom({
  key : "pagenationInquiry",
  default : 0,
  // effects_UNSTABLE : [persistAtom],
})