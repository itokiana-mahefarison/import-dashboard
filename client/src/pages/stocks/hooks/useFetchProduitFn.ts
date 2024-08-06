import { useCallback } from "react"
import qs from "qs"
import { TProduitResult } from "@/types/TProduit"

export const useFetchProduitFn = () => {

    return useCallback(async (suggest?: string): Promise<TProduitResult> => {
        const queryString = qs.stringify({
            filter: {
               label_like : suggest
            }
        })

        const result = await fetch(`${import.meta.env.VITE_API_URL}/produit/getAll?${queryString}`, {
            method: "GET",
        })

        return result.json()
    }, [])
}