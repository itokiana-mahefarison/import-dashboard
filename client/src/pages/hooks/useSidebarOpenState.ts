import { useRecoilState } from "recoil"
import { SidebarOpenState } from "../states/SidebarOpenState"

export const useSidebarOpenState = () => {
    return useRecoilState(SidebarOpenState)
}