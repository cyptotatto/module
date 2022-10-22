import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const accountAtom = atom({
  key: "account",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
