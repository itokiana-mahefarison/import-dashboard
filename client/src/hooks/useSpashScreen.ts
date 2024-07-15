import { useQuery } from "react-query"
import { useFirstRender } from "./useFirstRender"

export const useSplashScreen = (enabled?: boolean, key?: string) => {
    const [, setFirstRender] = useFirstRender()
    return useQuery(
        ["splash-screen", key],
        async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setFirstRender(true)
        },
        {
            enabled,
            suspense: true
        }
    )
}