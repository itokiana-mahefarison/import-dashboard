import { useCallback } from "react"
import qs from "qs"
import { TSiteResult } from "@/types/TSite"

export const useFetchSiteFn = () => {

    return useCallback(async (suggest?: string): Promise<TSiteResult> => {
        const queryString = qs.stringify({
            filter: {
                name_like: suggest
            }
        })

        const result = await fetch(`${import.meta.env.VITE_API_URL}/site/getAll?${queryString}`, {
            method: "GET",
        })

        return result.json()
    }, [])
}