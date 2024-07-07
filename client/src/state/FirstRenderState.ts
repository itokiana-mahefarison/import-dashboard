import { atom } from "recoil";

export const FirstRenderState = atom({
    default: false,
    key: "first-render-state"
})