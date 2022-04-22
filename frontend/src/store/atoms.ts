import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const isDarkAtom = atom({
  key:"isDark", // 이름 유니크해야함
  default : false, // default value (초기값)
  effects_UNSTABLE: [persistAtom],    // 요것만 추가
})

