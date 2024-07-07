import { FirstRenderState } from "@/state/FirstRenderState"
import { useRecoilState } from "recoil"

export const useFirstRender = () => {
    return useRecoilState(FirstRenderState)
}