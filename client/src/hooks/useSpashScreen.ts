import { useQuery } from "react-query"
import { useFirstRender } from "./useFirstRender"

export const useSplashScreen = (enabled?: boolean) => {
    const [, setFirstRender] = useFirstRender()
    return useQuery(
        "splash-screen",
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